import React from 'react';
import recharge_icon from '../../assets/icons/recharge_icon.svg';


const TransactionCard = ({ title, points}) => {
    return(
        <div className="h-44 w-72 overflow-hidden rounded-2xl bg-wallet_spent_card bg-black bg-center flex justify-center relative">
            <div className="w-full px-2 flex flex-col gap-3 justify-between">
                <div className="w-full flex flex-col px-1 py-4 gap-3">
                    <h3 className='text-white font-bold text-xl'>{title}</h3>
                    <p className='text-white text-lg'>{points} points</p>
                </div>
                <div className="flex justify-end p-3">
                    <button className='w-fit text-white bg-gray-200 bg-opacity-20 py-1 px-2 rounded-full text-sm font-semibold flex items-center gap-1' >
                        <span>
                            <img src={recharge_icon} alt="recharge" className='w-6 h-6'/>
                        </span>
                        Recharge Now
                    </button>
                </div>
            </div>
        </div>

    )
};

export default TransactionCard;