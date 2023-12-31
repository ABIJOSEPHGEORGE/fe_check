import React from 'react';

const ReligionAndFaith = () => {
    return (
        <div className="w-full bg-white shadow-lg shadow-gray-300 p-8 rounded-2xl h-full flex flex-col gap-3">
            <h3 className='font-semibold text-lg'>Religion and Faith</h3>
            <div className="flex gap-5 items-start lg:items-center lg:w-4/5 flex-col lg:flex-row lg:justify-between">
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Religion</h4>
                    <p>Christian</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Caste</h4>
                    <p>RC</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>How often do you pray ?</h4>
                    <p>Regular</p>
                </div>
            </div>
        </div>
    )
};

export default ReligionAndFaith;