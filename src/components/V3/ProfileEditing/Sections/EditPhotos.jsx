import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiOutlinePlus } from 'react-icons/hi2';
import ImageCropper from '../../ImageCropping/ImageCropper';

const EditPhotosCard = () => {

    const [crop, setCrop] = useState('');
    const [popup, setPopup] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    
    
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if(rejectedFiles.length > 0){
          setErrors({file: 'Please select a valid image file'});
          return;
        }
        const file = acceptedFiles[0];
        setCrop(URL.createObjectURL(file));
        setPopup(true);
      },[]);

      const { getRootProps, getInputProps } = useDropzone({
        accept: {
          'image/jpeg': [],
          'image/png': [],
          'image/jpg': [],
        },
        onDrop,
      });

      const handleCroppedImage = (image) => {
        const blobUrl = URL.createObjectURL(image);
        const id = selectedPhotos.length + 1;
        setSelectedPhotos((prev) => [...prev, {id, url: blobUrl}]);
      }

    if(crop && popup){
        return(
            <div className=' w-full h-full absolute top-0 left-0 z-50 flex flex-col justify-center items-center overflow-hidden'>
                <ImageCropper 
                imageFile={crop} 
                onCropComplete={handleCroppedImage} 
                setPopup={setPopup} 
                circularCrop={false} 
                background={'white'}
                locked={true}
                ratio={ {unit: 'px', x: 10, y: 10, width: 150, height: 180 }}/>
            </div>
        )
    }

    
    return (
        <div className="w-full min-h-fit p-4 rounded-2xl h-full  flex flex-col gap-3">
            <div className="w-fit lg:max-h-20 flex flex-wrap items-between gap-5">
                {
                    selectedPhotos.map((photo,index) => (
                        <div key={index}  className="w-24 h-24">
                            <img 
                            src={photo?.url} 
                            alt="photos" 
                            className='max-w-full max-h-full rounded-lg object-cover'/>
                        </div>
                    ))
                }
                {
                        
                        selectedPhotos.length < 4 &&
                        <>
                            <div
                                className=" w-24 h-24 cursor-pointer "
                                {...getRootProps()}
                            >
                            <input name='file' accept='image/png, image/gif, image/jpeg' {...getInputProps()} />
                                <span
                                className="w-24 h-24 bg-gray-100 bg-opacity-80 border-2 border-dotted border-gray-500 rounded-lg flex flex-col justify-center items-center cursor-pointer"
                                >
                                    <HiOutlinePlus size={20}/>
                                </span>
                            </div>
                        </>
                }
            </div>
        </div>
    )
};

export default EditPhotosCard;