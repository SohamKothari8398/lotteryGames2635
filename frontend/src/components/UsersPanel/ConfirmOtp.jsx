import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { useNavigate } from 'react-router';

function ConfirmOtp() {
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState(0);

    const navigate = useNavigate();

    const navigateToLandingPage = () => {
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = () => {
        navigate('/rolesRoute');
    }

    return (
        <div className=' w-full h-full flex flex-col justify-items-center align-items-center items-center text-slate-800'>
            <div className='fixed grid grid-cols-3 w-full h-auto p-2 items-center bg-black px-8 text-white'>
                <div onClick={navigateBack} className='flex w-1/2 h-auto p-2 cursor-pointer'>
                    <FaArrowLeft size={25} className='w-auto h-auto text-slate-900 bg-white rounded-full p-2' />
                </div>
                <div className='text-3xl md:text-5xl flex justify-start font-serif items-center cursor-pointer'>
                    UP365
                </div>
            </div>
            <div className='w-full h-full flex flex-col mt-28 mb-10 justify-items-center align-items-center items-center'>
                <div className="shadow-lg shadow-black font-bold rounded-lg p-4 flex flex-col justify-items-center align-items-center items-center">
                    <div className='flex rounded-full w-auto h-auto p-2 font-bold text-2xl md:text-4xl lg:text-6xl'>
                        Verify Your Account
                    </div>
                    <div className='flex rounded-full w-auto h-auto p-2 font-normal text-md md:text-lg lg:text-xl '>
                        Enter the 4-Digit Pin sent on your phone ****<span className='underline underline-offset-2 cursor-pointer'>2427</span>
                    </div>
                    <div className='flex rounded-full w-full h-auto p-2 font-normal text-md md:text-lg lg:text-xl'>
                        <form action="" className='mx-auto'>
                            <div className="grid grid-cols-4 gap-4">
                                <input type="number" min={0} max={9} maxLength={1}
                                    value={digit1} onChange={(e) => setDigit1(e.target.value)}
                                    name="digit1" id="digit1" className='border-2 border-slate-700 rounded-lg px-4' />
                                <input type="number" min={0} max={9} maxLength={1}
                                    value={digit2} onChange={(e) => setDigit2(e.target.value)}
                                    name="digit2" id="digit2" className='border-2 border-slate-700 rounded-lg px-4' />
                                <input type="number" min={0} max={9} maxLength={1}
                                    value={digit3} onChange={(e) => setDigit3(e.target.value)}
                                    name="digit3" id="digit3" className='border-2 border-slate-700 rounded-lg px-4' />
                                <input type="number" min={0} max={9} maxLength={1}
                                    value={digit4} onChange={(e) => setDigit4(e.target.value)}
                                    name="digit4" id="digit4" className='border-2 border-slate-700 rounded-lg px-4' />
                            </div>
                            <div className='bg-slate-800 hover:bg-green-800 hover:scale-125 text-white font-normal p-2 rounded-lg mt-20'>
                                <button onClick={handleSubmit}>Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div onClick={navigateToLandingPage} className='p-2 underline underline-offset-4 my-10 text-center cursor-pointer hover:scale-150'>
                        Request New Code
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOtp;


