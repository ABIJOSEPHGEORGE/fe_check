import React from 'react';

const LifeStyle = () => {
    return (
        <div className="w-full bg-white shadow-lg shadow-gray-300 p-8 rounded-2xl h-full lg:max-h-40 flex flex-col gap-3">
            <h3 className='font-semibold text-lg'>My Lifestyle</h3>
            <div className="w-full flex items-center gap-2 flex-wrap">
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Non Vegeterian</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Teetotaler</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Non Smoker</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Excercise: Regular</p>
           </div>
        </div>
    )
};

export default LifeStyle;