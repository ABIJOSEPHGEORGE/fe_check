import React from 'react';

const Interests = () => {
    return (
        <div className="w-full bg-white shadow-lg shadow-gray-300 p-8 rounded-2xl h-full max-h-40 flex flex-col gap-3">
           <h3 className='font-semibold text-lg'>Interests</h3>
           <div className="w-full flex items-center gap-2 flex-wrap">
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Music</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Cycling</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Sky Diving</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Treking</p>
                <p className='text-black bg-gray-100 rounded-3xl w-fit p-2'>Bungee Jumping</p>
           </div>
        </div>
    )
};

export default Interests;