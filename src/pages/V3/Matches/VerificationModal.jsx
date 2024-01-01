import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import verification_pending from '../../../assets/icons/verification_pending.svg';
import popup_close from '../../../assets/icons/popup_close.svg';
import verification_rejected from '../../../assets/icons/verification_rejected.svg';
import { requestVerification, requestVerificationStatus } from "../../../apis/users";
import UserStore from "../../../contexts/UserStore";
import { IoReloadOutline } from "react-icons/io5";

 
function VerificationModal({ open, setOpen, verificationStatus, verificationNote }) {

    const { setUser } = useContext(UserStore);
    const [loading, setLoading] = useState(false);

    const handleRequestVerification = async () => {
        setLoading(true);
        const res = await requestVerification();
        setUser(res);
        setLoading(false)
    };

    const handleRequestVerificationStatus = async () => {
        setLoading(true);
        const res = await requestVerificationStatus();
        setUser(res);
        setLoading(false);
    }
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      
      <Dialog open={open} handler={handleOpen} size="xs" className=" bg-white rounded-3xl drop-shadow-2xl shadow-2xl shadow-gray-600 flex flex-col items-center p-2">
        <div className="w-full flex justify-end">
            <img src={popup_close} alt="close" className=" cursor-pointer" onClick={handleOpen}/>
        </div>
        <div className="w-full flex justify-center">
            <div className="w-24 h-24">
                <img src={verificationStatus === 'requested' ? verification_pending : verificationStatus === 'rejected' ? verification_rejected : verification_pending} alt="verification status"  className="w-full h-full"/>
            </div>
        </div>
        {
            verificationStatus === 'requested' ?
            <DialogHeader className="uppercase text-lg text-brandRed">Verification Pending</DialogHeader>
            : verificationStatus === 'rejected' ?
            <DialogHeader className="uppercase text-lg text-brandRed">Verification rejected</DialogHeader>
            :
            <DialogHeader className="uppercase text-lg text-brandRed">Verification Pending</DialogHeader>
        }
        
        {
            verificationStatus === 'requested' ?
            <DialogBody className="text-center text-gray-700">
                Our team is initiating verification , it will be completed within 24 hours
            </DialogBody>
            : verificationStatus === 'rejected' ?
            <DialogBody className="text-center text-gray-700">
                Reason: 
                {verificationNote}
            </DialogBody>
            :
            <DialogBody className="text-center text-gray-700">
                Our team is initiating verification , it will be completed within 24 hours
            </DialogBody>
        }
        
        {
            loading && verificationStatus === 'rejected' ?
            <button className={`w-fit text-white font-medium text-center bg-brandRed px-3 py-3 rounded-3xl text-xl`} disabled={loading} type="button">
                <Spinner color="white" className="w-6 h-6"/>
            </button>
            : !loading && verificationStatus === 'rejected' ?
            <div className="flex justify-center">
                <button onClick={handleRequestVerification} type="button" className='bg-brandRed uppercase text-white text-md px-6 py-4 rounded-full font-semibold shadow-2xl drop-shadow-2xl shadow-gray-400'>Request for verification</button>
            </div>
            : !loading  && verificationStatus === 'requested' ?
            <div className="flex flex-col gap-1 justify-center items-center w-full">
                <button onClick={handleRequestVerificationStatus} className={`w-fit text-white font-medium text-center bg-brandRed px-3 py-3 rounded-3xl text-xl`} disabled={loading} type="button">
                    <IoReloadOutline color="white" size={20}/>
                </button>
                <p className="text-gray-500 text-sm">Reload</p>
            </div>
            : loading && verificationStatus === 'requested' ?
            <button className={`w-fit text-white font-medium text-center bg-brandRed px-3 py-3 rounded-3xl text-xl`} disabled={loading} type="button">
                <Spinner color="white" className="w-6 h-6"/>
            </button>
            : null
        }
      </Dialog>
    </>
  );
}

export default VerificationModal;