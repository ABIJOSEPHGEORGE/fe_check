import React from 'react';
import no_matches from '../../../assets/icons/no_matches.svg'

const NoMatches = () => {
    return(
        <div className="flex flex-col items-center justify-center gap-3">
            <div className=" w-52 h-52">
                <img src={no_matches} alt="No Matches"  className='w-full h-full'/>
            </div>
            <h3 className='text-lg font-bold text-brandRed'>Oopsie!</h3>
            <p className='text-gray-700 text-sm'>You don`t have any matches right now. Don`t Panic. Our matchmaking team is working on it.</p>
            <div className="flex justify-center">
                <button className='bg-brandRed uppercase text-white text-lg px-8 py-4 rounded-full font-semibold shadow-2xl drop-shadow-2xl shadow-gray-400'>Upgrade Now</button>
            </div>
        </div>
    )
};

export default NoMatches;