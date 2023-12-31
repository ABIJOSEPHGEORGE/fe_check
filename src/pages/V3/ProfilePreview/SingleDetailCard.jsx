import React from 'react';

const SingleDetailCard = ({ icon, title, data }) => {
    if(data){
        return (
            <div className="flex items-center justify-start min-w-2/6 w-2/6  flex-wrap mt-5 gap-2">
                <div className=" w-8 h-8">
                    <img src={icon} alt={'date of birth'} className='w-full h-full'/>
                </div>
                <div className="flex flex-col justify-center items-start">
                    <h5 className='text-md text-gray-600'>{title}</h5>
                    <h3 className='text-md font-semibold capitalize'>{data?.toString()?.toLowerCase()}</h3>
                </div>
            </div>
        )
    }
    
};

export default SingleDetailCard;