import React from 'react';

const Bio = () => {
    return (
        <div className="w-full bg-white shadow-lg shadow-gray-300 p-8 rounded-2xl h-full flex flex-col gap-3">
            <h3 className='font-semibold text-lg'>Bio</h3>
            <div className="w-full flex items-center gap-2 flex-wrap">
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Age: 22</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Weight: 64kg</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Height: 172cm</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>City: Wayanad</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>State: Kerala</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Country: India</p>
           </div>
        </div>
    )
};

export default Bio;