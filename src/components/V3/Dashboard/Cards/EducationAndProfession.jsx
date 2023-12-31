import React from 'react';

const EducationAndProfession = () => {
    return (
        <div className="w-full bg-white shadow-lg shadow-gray-300 p-8 rounded-2xl h-full lg:max-h-40 flex flex-col gap-3">
            <h3 className='font-semibold text-lg'>Education and Profession</h3>
            <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center lg:w-4/5 lg:justify-between">
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Designation</h4>
                    <p>Full Stack Developer</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Company</h4>
                    <p>Couple Squad</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>Highest Qualification</h4>
                    <p>Graduate</p>
                </div>
                <div className="flex flex-col w-fit gap-2 ">
                    <h4 className='text-gray-600 text-md font-semibold'>University / Institute</h4>
                    <p>Bangalore University</p>
                </div>
                
            </div>
        </div>
    )
};

export default EducationAndProfession;