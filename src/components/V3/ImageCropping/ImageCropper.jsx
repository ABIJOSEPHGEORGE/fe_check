import React, {useState} from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import popup_close from '../../../assets/icons/popup_close.svg';

const ImageCropper = ({ imageFile,onCropComplete, setPopup, circularCrop, ratio, locked=false }) => {
    const [crop, setCrop] = useState( ratio || {
        unit: 'px',
        x: 10,
        y: 10,
        width: 160,
        height: 160
      });
    const [image, setImage] = useState();

    const handleCrop = (c) => {
        setCrop(c);
    }

    const getCroppedImage = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height     
          );

        
        canvas.toBlob((blob) => {
            const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
            onCropComplete(croppedFile);
            setPopup(false);
        },'image/png');

    }

    return (
        <div className="w-full flex justify-center items-center ">
            <div className='w-full flex gap-2 items-center justify-center'>
                <div className={` p-3 w-full flex gap-3`}>
                        {
                            imageFile &&
                        <>
                            <ReactCrop crop={crop} onChange={(c)=>handleCrop(c)} circularCrop={circularCrop} locked={locked}  className=' max-w-2xl max-h-96'>
                                <img src={imageFile} className="object-cover w-full h-full" onLoad={(e) => setImage(e.target)}/>
                            </ReactCrop>
                           
                        </>
                        }
                </div>
                <div className="flex flex-col gap-2 justify-start items-center">
                    <div className="w-32 h-32 absolute top-1 -right-20 cursor-pointer" onClick={()=>setPopup(false)}>
                        <img src={popup_close} alt="close" />
                    </div>
                    <div className="bg-white min-h-max h-32 w-fit flex flex-col justify-center gap-3 px-2 shadow-2xl drop-shadow-2xl shadow-gray-300 py-3 rounded-full">
                        <button className=' w-full text-md text-brandRed font-semibold' type='button' onClick={getCroppedImage}>Save</button>
                        <button className='text-gray-700 w-full text-md' type='button' onClick={()=>setPopup(false)}>Cancel</button>
                    </div>
                    
                </div>
            </div> 
        </div>
    )
};

export default ImageCropper;