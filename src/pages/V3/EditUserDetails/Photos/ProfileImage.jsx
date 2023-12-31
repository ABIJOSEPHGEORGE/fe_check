import React,{ useContext, useCallback, useState} from 'react';
import UserStore from '../../../../contexts/UserStore';
import ImageCropper from '../../../../components/V3/ImageCropping/ImageCropper';
import { useDropzone } from 'react-dropzone';
import {
    Dialog,
    DialogBody
  } from "@material-tailwind/react";
import { uploadProfileImage } from '../../../../apis/users';
import { toast } from 'react-toastify';

const ProfileImage = () => {

    
    const { user, setUser, setErrors } = useContext(UserStore);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if(rejectedFiles.length > 0){
          setErrors({file: 'Please select a valid image file'});
          return;
        }
        const file = acceptedFiles[0];
        setSelectedImage(URL.createObjectURL(file));
        setOpen(true);
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
        setUser(({...user, photo: URL.createObjectURL(croppedFile)}));
        const formData = new FormData();
        formData.append('file', croppedFile);
        const res = await uploadProfileImage(formData);
        if(res){
            setUser(res);
            toast.success('Uploaded successfully');
        }
    }

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className="flex justify-center items-center">
                <div className="bg-gray-300 rounded-full w-40 h-40 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden" >
                    <div className="w-40 h-40">
                        <img src={user?.photo} alt="profile image" className=' object-fill w-full h-full' />
                    </div>
                  
                        <>
                        <button className='absolute left-0 bottom-0 right-0 text-center bg-gray-300 text-sm w-fit px-2 p-1' {...getRootProps()}>
                            Replace
                        </button>
                        <input name='file' accept='image/png, image/gif, image/jpeg' {...getInputProps()} />
                        </>
                
                    
                </div>
                {
                <Dialog size='xs' open={open} handler={handleOpen}>
                    <DialogBody>
                        <ImageCropper imageFile={selectedImage} setPopup={handleOpen} circularCrop={true}  onCropComplete={onCropComplete}/>
                    </DialogBody>
                </Dialog>
                }
            </div>
    )
};

export default ProfileImage;