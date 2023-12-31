import React,{ useState, useEffect, useCallback, useContext } from 'react';
import { FaPlus } from "react-icons/fa";
import { deleteMultiImage, fetchImages, uploadMultiImage } from '../../../../apis/users';
import { useDropzone } from 'react-dropzone';
import {
    Dialog,
    DialogBody
  } from "@material-tailwind/react";
import ImageCropper from '../../../../components/V3/ImageCropping/ImageCropper';
import { toast } from 'react-toastify';
import UserStore from '../../../../contexts/UserStore';

const MultiImages = () => {
    const { setErrors } = useContext(UserStore);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [changeProfile, setChangeProfile] = useState(false)

    const getImages = async () => {
        const res = await fetchImages();
        setImages(res);
    }

    useEffect(() => {
        getImages();
    },[]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if(rejectedFiles.length > 0){
          setErrors({file: 'Please select a valid image file'});
          return;
        }
        const file = acceptedFiles[0];
        setSelectedImage(URL.createObjectURL(file));
        setOpen(true);
        setChangeProfile(false);
      },[]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
          'image/jpeg': [],
          'image/png': [],
          'image/jpg': [],
        },
        onDrop,
      });

      const onCropComplete = async (croppedFile) => {
        const formData = new FormData();
        formData.append('file', croppedFile);
        const res = await uploadMultiImage(formData);
        if(res){
            toast.success('uploaded successfully');
            setImages(res);
        }
    }

    const handleOpen = () => {
        setOpen(!open)
    }

   const ratio = {
        unit: 'px',
        x: 10,
        y: 10,
        width: 176,
        height: 240
   }

   const handleDeleteImage = async(imageId) => {
    const res = await deleteMultiImage({imageId});
    if(res){
        setImages(res);
        toast.success('Deleted successfully');
    }
   }

    return (
        <div className="flex justify-center xl:justify-start w-full items-center gap-5 flex-wrap xl:flex-nowrap">
                {
                    images?.map((img, indx) => (
                        <div key={indx} className="bg-gray-300 w-44 rounded-2xl h-60 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                            <img src={img?.url} alt={'user image'} className='w-full h-full object-fill'/>
                            <button className='absolute bottom-1 right-1 bg-gray-300 text-sm w-fit px-2 p-1 rounded-full' onClick={()=>handleDeleteImage(img?.imageId)}>Delete</button>
                        </div>
                    ))  
                } 
                {
                    images?.length < 4 &&
                    <div className="bg-gray-300 w-44 rounded-2xl h-60 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                        <div {...getRootProps()} className='flex flex-col justify-center items-center'>
                        <FaPlus size={25} className='text-gray-500'/>
                            <p className='text-gray-500 text-sm'>Upload new image</p>
                            <input name='file' accept='image/png, image/gif, image/jpeg' {...getInputProps()} />
                        </div>
                    </div>
                }
                <Dialog size='xs' open={open} handler={handleOpen}>
                    <DialogBody>
                        <ImageCropper imageFile={selectedImage} setPopup={handleOpen} onCropComplete={onCropComplete} ratio={ratio} locked={true}/>
                    </DialogBody>
                </Dialog>
            </div>
    )
}

export default MultiImages;