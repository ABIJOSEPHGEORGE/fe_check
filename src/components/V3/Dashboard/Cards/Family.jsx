import React from 'react';

const Family = () => {
    return (
        <div className="w-full bg-white shadow-lg shadow-gray-300 p-8 rounded-2xl h-full lg:max-h-40 flex flex-col gap-3">
            <h3 className='font-semibold text-lg'>Freely about your family</h3>
            <p className='text-md leading-snug'>about family description</p>
            <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center w-full lg:justify-between">
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Father Name</h4>
                    <p>George</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Mother Name</h4>
                    <p>Valsa</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Father Occupation</h4>
                    <p>Business</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Mother Occupation</h4>
                    <p>House Wife</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Location</h4>
                    <p>Wayanad</p>
                </div>
            </div>
        </div>
    )
};

export default Family;