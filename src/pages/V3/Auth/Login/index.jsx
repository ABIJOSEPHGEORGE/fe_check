
import React, {useState, useEffect, useCallback, useContext} from 'react';
import leftSideImage from '../../../../assets/images/Signup/left_image.png';
import coupleSquadLogo from '../../../../assets/couple-squad-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { login, sendEmailOtp, status } from '../../../../apis/auth';
import { Link, useNavigate } from 'react-router-dom';
import UserStore from "../../../../contexts/UserStore";
import { Spinner } from "@material-tailwind/react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [errors, setErrors] = useState({email:"", otp:""});
    const [loading, setLoading] = useState(false);
    const { user, session, setSession, setUser } =  useContext(UserStore);
  
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
                setUser(res)
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }
        }
    }, [user, session]);

    useEffect(() => {
        userInfo();
    }, [userInfo]);

   const sendOtp = async () => {
        try{
            setIsSent(false);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(email.trim());
            if(!isValid) {
                throw Error('Please enter a valid email address');
            }
            setErrors({email:"",otp:""});
            setLoading(true);
            const res = await sendEmailOtp({email,type:'login'});
            if (res?.message) {
                setIsSent(true);
                setLoading(false);
                toast.success(res?.message);
            }
            if(!res){
                setLoading(false);
            }
        }catch(err){
            setLoading(false);
            setErrors({email:err.message || 'Something went wrong'});
        }
   }

   const validateAndLogin = async () => {
        try{
            if(isNaN(otp) || otp.length !== 6){
                throw Error('Please enter a valid otp');
            };
            setErrors({email:"",otp:""});
            setLoading(true);
            const token = await login({email, otp});
            if(token) {
                localStorage.setItem("session", token);
                setSession(token)
                const user_res = await status();
                setUser(user_res)
                navigate("/dashboard", { replace: true });
                setLoading(false);
            }
            setLoading(false);
            
        }catch(err){
            setLoading(false);
            setErrors((prev) => ({...prev,otp:err.message || 'Something went wrong'}));
        }
   }

   const onSubmit = async () => {
        if(!isSent) {
            await sendOtp();
            return;
        }

        await validateAndLogin();
   }
  return (
    <>
            <ToastContainer position='top-right'/>
            <div className="w-full min-h-screen max-h-screen flex">
            <div className="flex-1 hidden lg:flex">
                <img src={leftSideImage} alt="couple squad" className='w-full h-full'/>
            </div>
            <div className="bg-white flex flex-col flex-1 p-8 gap-5 md:gap-3 lg:gap-2">
            <div className={`w-full h-16 flex items-center p-3 lg:p-2 justify-center`}>
                <img src={coupleSquadLogo} alt="couple squad" className='w-2/5 p-3 md:w-2/6 lg:w-1/5' />
            </div>
            
            <div className="space-y-4 lg:space-y-2 p-3">
                <h2 className='text-center font-semibold text-3xl md:text-4xl lg:text-5xl'>Log In</h2>
                <p className='text-center text-md leading-snug'>Enter your Email and verify to login.</p>
            </div>
            <div className='w-full flex flex-col items-center gap-5 md:gap-3'>
                <div className="w-full lg:w-2/4 space-y-3">
                    <div className="w-full flex flex-col gap-3">
                        <label htmlFor="email" className='text-lg font-medium'>Email</label>
                        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  name='email' className='w-full px-6 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
                        {errors?.email && <span className='text-red-400'>{errors?.email}</span> }
                    </div>
                    {
                        isSent &&
                        <>
                        <div className="w-full flex flex-col gap-3">
                            <label htmlFor="otp" className='text-lg font-medium'>Verification Code</label>
                            <input type='number' value={otp} onChange={(e)=>setOtp(e.target.value)}  name='otp' className='w-full px-6 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'/>
                            {errors?.otp && <span className='text-red-400'>{errors?.otp}</span>}
                            <span className='text-red-500 font-semibold text-end cursor-pointer' onClick={sendOtp}>resend otp</span>
                        </div>
                        
                        </>
                    }
                    
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                {
                    loading ?
                    <button className={`w-fit text-white font-medium text-center bg-brandRed px-3 py-3 rounded-3xl text-xl`} disabled={loading} onClick={onSubmit}>
                        <Spinner color="white" className="w-6 h-6"/>
                    </button>
                    :
                    <button className={`w-2/4 md:w-1/4 lg:w-1/4 text-white font-medium text-center bg-brandRed px-3 py-3 rounded-3xl text-xl`} disabled={loading} onClick={onSubmit}>
                    { isSent ? 'Submit' : 'Continue'}
                    </button>
                }
            </div>
            <p className='font-medium w-full text-center'>Don`t have an account with us ? <Link to={'/signup'} className='text-blue-400 cursor-pointer'>Sign up</Link></p>
            </div>
            </div>
    </>
  )
}

export default Login