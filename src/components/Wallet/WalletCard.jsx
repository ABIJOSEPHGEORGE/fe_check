import React, { useContext } from 'react';
import UserStore from '../../contexts/UserStore';
import { Avatar } from "@material-tailwind/react";

const WalletCard = () => {
    const { user } = useContext(UserStore);

        function addSpacesToNumber(number) {
            let numberString = number.toString()
            let formattedNumber = numberString.replace(/(\d{4})/g, '$1 ');
            formattedNumber = formattedNumber.trim();

            return formattedNumber;
        }
            return (
        <div className=" w-96 h-64 overflow-hidden rounded-2xl  bg-wallet_balance_card  bg-center flex justify-center relative">
             <Avatar
                    size="xxl"
                    alt="avatar"
                    src={user?.photo}
                    className="border absolute -top-6 -right-6 w-44 h-44 border-walletBorder shadow-xl shadow-green-900/20 ring-4 ring-walletBorder"
                />
            <div className="w-4/5 h-full flex flex-col gap-3 py-4">
                <div className="flex flex-col gap-1 justify-center items-start">
                    <h4 className='text-white font-semibold uppercase text-sm'>Name :</h4>
                    <p className='text-white text-lg uppercase'>{user?.name}</p>
                </div>
                <div className="flex flex-col gap-1 justify-center items-start">
                    <h4 className='text-white font-semibold uppercase text-sm'>Current plan :</h4> 
                    <p className='text-white text-lg uppercase'>{user?.currentPlan}</p>
                </div>
                <div className="flex flex-col gap-1 justify-center items-start">
                    <h4 className='text-white font-semibold uppercase text-sm'>Card number:</h4>
                    <p className='text-white text-2xl uppercase'>{addSpacesToNumber(user?.wallet?.wallet_id)}</p>
                </div>
            </div>
        </div>
    )
};

export default WalletCard;