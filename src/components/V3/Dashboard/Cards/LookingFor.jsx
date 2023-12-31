import React from 'react';

const LookingFor = () => {
    return (
        <div className="w-full bg-white shadow-lg shadow-gray-300 p-8 rounded-2xl h-full lg:max-h-40 flex flex-col gap-3">
           <h3 className='font-semibold text-lg'>I`m looking for</h3>
           <div className="w-full flex items-center gap-2 flex-wrap">
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Age: from 18 to 22</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Height: from 155 to 172</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Non vegeterian</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Teetotaler</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Non smoker</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Dating</p>
           </div>
        </div>
    )
};

export default LookingFor;