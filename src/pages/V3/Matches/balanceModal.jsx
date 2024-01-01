import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import popup_close from '../../../assets/icons/popup_close.svg';
import insufficient_coins from '../../../assets/icons/insufficient_coins.svg';

function BalanceModal({ open, setOpen}) {


  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      
      <Dialog open={open} handler={handleOpen} size="xs" className=" bg-white rounded-3xl drop-shadow-2xl shadow-2xl shadow-gray-600 flex flex-col items-center p-2">
        <div className="w-full flex justify-end">
            <img src={popup_close} alt="close" className=" cursor-pointer" onClick={handleOpen}/>
        </div>
        <div className="w-full flex justify-center">
            <div className="w-24 h-24">
                <img src={insufficient_coins} alt="verification status"  className="w-full h-full"/>
            </div>
        </div>
        <DialogHeader className="uppercase text-lg text-brandRed">INSUFFICIENT COINS</DialogHeader>
        <DialogBody className="flex flex-col items-center justify-center gap-3">
            <p className="text-gray-500 text-sm text-center w-3/4">Buy more coins to access this feature today itself</p>
            <div className="flex justify-center">
                <button className='bg-brandRed uppercase text-white text-lg px-8 py-4 rounded-full font-semibold shadow-2xl drop-shadow-2xl shadow-gray-400'>Upgrade Now</button>
            </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default BalanceModal;