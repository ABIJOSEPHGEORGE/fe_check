import React, { useContext } from 'react';
import './loading.css';
import UserStore from '../../../contexts/UserStore';


const LoadingMatches = ({ title }) => {
    const { user } = useContext(UserStore);
    return (
        <div className="h-full flex flex-col justify-center w-full items-center gap-2">
            <div className="rounded-full animation-pulse">
                <img src={user?.photo} alt='profile image' className='w-32 h-32 rounded-full border-2 border-white'/>
            </div>
            <p>{title}</p>
        </div>
    )
};

export default LoadingMatches;