import { ChevronLeft } from 'lucide-react';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider} from "react-hook-form";
import {ToastContainer} from 'react-toastify';
import coupleSquadLogo from '../../../../assets/couple-squad-logo.png';
import leftSideImage from '../../../../assets/images/Signup/left_image.png';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
import { firstStepValidation, secondStepValidation, thirdStepValidation } from '../../../../utils/validations/signup';
import {  register, status } from '../../../../apis/auth';
import { useNavigate, Link } from 'react-router-dom';
import UserStore from '../../../../contexts/UserStore';
import { Spinner } from "@material-tailwind/react";


const Signup = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [gender, setGender] = useState('male');
    const [isLoading, setIsLoading] = useState(false);
    const [signupData, setSignupData] = useState({
        "full_name": "",
        "gender": gender,
        "dob":"",
        "file":"",
        "relationship_status":"",
        "phone":"",
        "email":"",
        "otp":""
    });

    const { user, session, setUser, setSession, setErrors, setProfilePicture } = useContext(UserStore);

    const navigate = useNavigate();

    const userInfo = useCallback(async () => {
        if (user || session || localStorage?.getItem("session")) {
            if (!user) {
                const res = await status();
                if (!res) {
                    localStorage?.removeItem("session");
                    setSession(null);
                    navigate("/login", { replace: true });
                    return;
                }
                setUser(res);
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }
        }
    }, [user, session]);

    useEffect(() => {
        userInfo();
        return () => {
            setProfilePicture(null);
        }
    }, [userInfo]);

    const methods = useForm();

    const handleBackButton = () => {
        setActiveStep(prev => prev -1);
    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age >= 23;
    };
    
    const validateAndProceed = async (data, validationSchema, step) => {
        try {
            await validationSchema.validate(data, { abortEarly: false });
    
            if (step === 1) {
                const adult = calculateAge(data.dob);
                if (!adult) {
                    setErrors({ 'dob': 'Age must be a minimum of 23 years' });
                    return;
                }
            }
    
            setSignupData((prev) => ({ ...prev, ...data }));
            setErrors({});
            if(step === 3){
                data = { ...signupData, ...data };
                submitForm(data);
                return;
            }
            setActiveStep((prev) => prev + 1);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setErrors({ [error.inner[0].path]: error.inner[0].message });
            }
        }
    };
    
    const onSubmit = async (data) => {
        if (activeStep === 1) {
            data.gender = gender;
            validateAndProceed(data, firstStepValidation, 1);
        } else if (activeStep === 2) {
            validateAndProceed(data, secondStepValidation, 2);
        } else if (activeStep === 3) {
            validateAndProceed(data, thirdStepValidation, 3)
        }
    };
    
    const submitForm = async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        setIsLoading(true);
        const token = await register(formData);
        if (token) {
            localStorage.setItem("session", token);
            setSession(token);
            setIsLoading(false);
            const user_res = await status();
            setUser(user_res);

            navigate("/dashboard", { replace: true });
        }
        setIsLoading(false);
    };
    

  return (
    <FormProvider {...methods}>
        <ToastContainer position='top-right'/>
    <form onSubmit={methods.handleSubmit(onSubmit)} encType="multipart/form-data" className="w-full min-h-screen max-h-screen flex">
        <div className="flex-1 hidden lg:flex">
            <img src={leftSideImage} alt="couple squad" className='w-full h-full'/>
        </div>
        <div className="bg-white flex flex-col flex-1 p-8 lg:p-4 gap-5 md:gap-3 lg:gap-1">
            {/* Header */}
            <div className={`w-full h-16 flex items-center p-3 lg:p-2 lg:justify-end  ${activeStep ===1 ? 'justify-end' : 'justify-between'}`}>
                {
                    activeStep >1 && 
                    <>
                        <div className="flex items-center justify-center gap-2 cursor-pointer lg:hidden" onClick={()=>handleBackButton()}>
                            <ChevronLeft size={30}/>
                            <p className='text-lg font-semibold'>Back</p>
                        </div>
                        <div>
                            <button type='button' className='w-fit bg-brandRed text-white px-6 py-2 font-semibold text-center rounded-3xl hidden lg:flex' onClick={()=>handleBackButton()}>
                                Back
                            </button>
                        </div>
                        
                    </>
                }
                <img src={coupleSquadLogo} alt="couple squad" className='w-2/5 p-3 md:w-2/6 lg:hidden' />
            </div>
            <div className="space-y-4 lg:space-y-2 p-3">
                <h2 className='text-center font-semibold text-3xl md:text-4xl lg:text-4xl'>Sign Up</h2>
                <p className='text-center text-md leading-snug'>We need you to help us with some basic information to create your account.</p>
            </div>
            {/* stepper */}
            <div className="w-full p-2 flex justify-center items-center gap-2">
                <div className={`max-w-[32px] max-h-[32px] p-4 font-semibold text-white flex items-center justify-center ${activeStep === 1 || activeStep > 1 ? 'bg-blue-500' : 'bg-gray-300' } rounded-3xl`}>1</div>
                <hr className={`${activeStep >=2 ? 'bg-blue-500' : 'bg-gray-300' } h-1 w-1/4`}/>
                <div className={`max-w-[32px] max-h-[32px] p-4 font-semibold text-white flex items-center justify-center ${activeStep === 2 || activeStep > 2 ? 'bg-blue-500' : 'bg-gray-300'} rounded-3xl`}>2</div>
                <hr className={`${activeStep ===3 ? 'bg-blue-500' : 'bg-gray-300' } h-1 w-1/4`}/>
                <div className={`max-w-[32px] max-h-[32px] p-4 font-semibold text-white flex items-center justify-center ${activeStep === 3 ? 'bg-blue-500' : 'bg-gray-300'} rounded-3xl`}>3</div>
            </div>
            <div className='w-full flex flex-col items-center'>
            {
                activeStep === 1 ? <FirstStep gender={gender} setGender={setGender}/> : activeStep === 2 ? <SecondStep/> : activeStep === 3 ? <ThirdStep/> : null
            }
            </div>
            <div className="w-full flex justify-center items-center">
                {
                    !isLoading ?
                    <button className="w-2/4 md:w-1/4 lg:w-1/4 text-white font-medium text-center bg-brandRed px-3 py-3 rounded-3xl text-xl" type='submit'>
                        { activeStep === 3 ? 'Submit' : 'Next'}
                    </button>
                    :
                    <button className="w-fit text-white font-medium text-center bg-brandRed px-3 py-3 rounded-3xl text-xl " type='button' disabled>
                       <Spinner className='h-6 w-6' color='white'/>
                    </button>
                }
                
            </div>
            <p className='font-medium w-full text-center'>Already a member ? <Link to={'/login'} className='text-blue-400 cursor-pointer'>Login</Link></p>
        </div>
    </form>
    </FormProvider>
  )
}

export default Signup