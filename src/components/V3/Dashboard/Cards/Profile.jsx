import React, { useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import UserStore from '../../../../contexts/UserStore';

const Profile = () => {

    const { user } = useContext(UserStore);

    const [age, setAge] = useState('');

    
    const calculateAge = (birthDate) => {
        const currentDate = new Date();
        const birthDateObj = new Date(birthDate);
        
        let age = currentDate.getFullYear() - birthDateObj.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        if (
        currentDate.getMonth() < birthDateObj.getMonth() ||
        (currentDate.getMonth() === birthDateObj.getMonth() &&
            currentDate.getDate() < birthDateObj.getDate())
        ) {
        age--;
        }

        return age;
    };

    useEffect(() => {
        if(user){
            const age = calculateAge(user?.personal?.dob);
            setAge(age);
        }
    },[user])

    return (
    <div className="w-full bg-white  shadow-lg shadow-gray-300 p-4 lg:p-8 rounded-2xl h-full xl:max-h-60 flex flex-col lg:flex-row justify-start">
        <div className=" flex flex-col xl:flex-row flex-1 items-center justify-start gap-5 ">
            <div className="flex flex-row items-center gap-3 w-full">
                <div className=" w-20 lg:w-2/6 xl:w-1/6 h-full rounded-full lg:rounded-xl flex items-center justify-center">
                    {
                        user?.photo ?
                        <img src={user?.photo} className='max-w-full max-h-full rounded-full lg:rounded-full' alt="profile" />
                        :
                        <Skeleton circle={true}/>
                    }
                    
                </div>

                <div className="flex flex-col flex-1 min-w-3/5 space-y-3">
                    <div>
                        <h2 className='text-xl lg:text-2xl font-semibold'>{user?.name || <Skeleton/>}</h2>
                        <p className='text-gray-600 font-medium capitalize'>{age || <Skeleton/>} Yrs, {user?.personal?.sex || <Skeleton/>}</p>
                    </div>
                    <p className='text-md'>Bio Snippet</p>
                    <hr className='w-full h-1 bg-gray-200 hidden lg:block'/>
                    <div className="hidden lg:flex flex-col gap-2 w-4/5">
                        <div className="flex w-fit gap-1 justify-between items-center">
                            <h4 className=' text-md'>Birthday:</h4>
                            <p className='text-gray-600'>10 - Sept - 2001</p>
                        </div>
                        <div className="flex w-fit gap-1 justify-between items-center">
                            <h4 className=' text-md'>Marital Status:</h4>
                            <p className='text-gray-600'>Single</p>
                        </div>
                        <div className="flex w-fit gap-1 justify-between items-center">
                            <h4 className=' text-md'>Location:</h4>
                            <p className='text-gray-600'>Calicut, Kerala</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Version */}
            <div className="w-full lg:hidden">
                <div className="flex w-fit gap-3 justify-between items-center">
                    <h4 className='text-gray-600 text-md'>Birthday</h4>
                    <p>10 - Sept - 2001</p>
                </div>
                <div className="flex w-fit gap-3 justify-between items-center">
                    <h4 className='text-gray-600 text-md'>Marital Status:</h4>
                    <p>Single</p>
                </div>
                <div className="flex w-fit gap-3 justify-between items-center">
                    <h4 className='text-gray-600 text-md'>Location:</h4>
                    <p>Calicut, Kerala</p>
                </div>
            </div>
            <div className="w-full flex lg:flex-1 items-center justify-between lg:justify-center gap-3 ">
                <div className='w-fit flex flex-col items-center justify-center'>
                    <p className='text-center font-medium text-brandBlue text-xl lg:text-2xl'>0</p>
                    <p className='text-md lg:text-lg font-semibold '>Chat</p>
                </div>
                <div className='w-fit flex flex-col items-center justify-center'>
                    <p className='text-center font-medium text-brandBlue text-xl lg:text-2xl'>0</p>
                    <p className='text-md lg:text-lg font-semibold '>Connections</p>
                </div>
                <div className='w-fit flex flex-col items-center justify-center'>
                    <p className='text-center font-medium text-brandBlue text-xl lg:text-2xl'>0</p>
                    <p className='text-md lg:text-lg font-semibold '>Shortlisted</p>
                </div>
            </div>
        </div>
    </div>
    )
};

export default Profile;