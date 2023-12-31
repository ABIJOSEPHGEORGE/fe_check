import React from 'react';

const PhotosCard = () => {
    return (
        <div className="w-full bg-white shadow-lg shadow-gray-300 p-8 rounded-2xl h-fit lg:max-h-40 flex flex-col gap-3">
            <div className="flex gap-2 h-full items-center">
                <h3 className='font-semibold text-lg'>My photos</h3>
                <p className='font-medium text-md text-gray-600'>6</p>
            </div>
            <div className="w-fit lg:max-h-20 flex flex-wrap items-center gap-5">
                {
                    [...new Array(6)].map((it,index) => (
                        <div key={index}  className="w-16 h-16">
                            <img 
                            src={'https://couplesquadnew.s3.ap-south-1.amazonaws.com/profile/1b40d56e-1f85-4a5e-837d-0e61b68b5dd9-AbinGeorge.jpg'} 
                            alt="photos" 
                            className='max-w-full max-h-full rounded-lg'/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default PhotosCard;