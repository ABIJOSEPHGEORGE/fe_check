import React, { useContext, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import placeholder from '../../../../assets/images/Signup/profile_placeholder.jpg';
import { useFormContext } from 'react-hook-form';
import UserStore from "../../../../contexts/UserStore";
import ImageCropper from '../../ImageCropping/ImageCropper';
import { IoIosClose } from "react-icons/io";

const ProfilePicUpload = () => {
    const { setValue } = useFormContext();
    const { profilePicture, errors, setProfilePicture, setErrors } = useContext(UserStore);
    const [crop, setCrop] = useState(null);
    const [popup, setPopup] = useState(false);

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
      setProfilePicture(URL.createObjectURL(image));
      setValue('file',image);
    };

    const handleRemoveImage = () => {
      setProfilePicture(null);
      setValue('file', null);
    }

    if(crop && popup){
      return (
        
          <ImageCropper imageFile={crop} onCropComplete={handleCroppedImage} setPopup={setPopup} circularCrop={true}/>
      )
    }
  
  
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="relative">
          <div
            className=" w-36 h-36 rounded-full border-4 border-gray-300 overflow-hidden cursor-pointer "
            {...getRootProps()}
          >
            <input name='file' accept='image/png, image/gif, image/jpeg' {...getInputProps()} />
            <img
                src={profilePicture ?? placeholder} 
                alt="placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
         
          {
            !profilePicture ?
              <p className='text-md font-medium'>Set your Profile Image</p>
            : <span className='w-full text-md text-gray-600 flex gap-2 justify-center items-center cursor-pointer' onClick={handleRemoveImage}>Remove <IoIosClose size={20}/></span>
          }
          {errors?.file && <span className='text-red-400'>{errors?.file}</span>}
        </div>
            );
        };
  
  export default ProfilePicUpload;
  