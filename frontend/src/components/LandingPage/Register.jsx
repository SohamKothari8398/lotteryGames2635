import React, { useState } from 'react';
import { FaWindowClose, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useService } from '../../hooks/useService';
import useScrollToTop from '../../hooks/useScrollToTop';

function Register() {
    useScrollToTop();
    const { message } = useAuthContext();
    const service = useService();
    const [mobileNumber, setMobileNumber] = useState(null);
    const [password, setPassword] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [userId, setUserID] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegisterClick = async (e) => {
        e.preventDefault();
        try {
            if (mobileNumber >= 1000000000 && mobileNumber <= 9999999999) {
                const response = await service.post("/register", {
                    userID: userId,
                    mobileNumber: mobileNumber,
                    password: password,
                    promoCode: promoCode
                });

                if (response.data.status === "Success") {
                    alert("Registration Successful");
                    setUserID("");
                    setMobileNumber(null);
                    setPassword("");
                    setPromoCode("");
                    navigate("/login");
                } else {
                    alert(`Registration failed: ${response.data.error}`);
                }
            } else if (!mobileNumber || !password || !promoCode || !userId) {
                alert(`Fill all fields`);
            } else {
                alert('Invalid Credentials.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(`Registration failed: ${error.response.data.error}`);
            } else {
                console.error('Error:', error);
                alert('An unexpected error occurred.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigateToLandingPage = () => {
        navigate('/');
    }

    const navigateToLoginPage = () => {
        navigate('/login');
    }

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center text-white">
            <div className=" absolute w-[80vw] md:w-[45vw] lg:w-[30vw] h-full m-auto rounded-lg">
                {/* <div className='italic m-auto w-1/2 text-center text-white font-bold text-5xl md:text-7xl rounded-xl my-8 bg-gradient-to-r from-red-700 from-10% via-orange-500 via-30% to-yellow-500 to-90%'>UP365</div> */}
                <div className='italic m-auto text-center text-3xl md:text-5xl font-bold mt-10 mb-8'>Register</div>
                <form className='flex flex-col text-sm font-medium w-full h-auto border-4 rounded-lg py-4'>
                    <div className='flex flex-col w-full text-md md:text-lg lg:text-xl'>
                        <label htmlFor="user_id" className='flex mb-2 flex-col text-center'>User-ID
                            <input type="text" placeholder='John1234, Sam123,...' value={userId} onChange={(e) => setUserID(e.target.value)} className='m-auto mt-2 rounded-lg h-8 text-center w-[70%] bg-black p-4 border-2' name="user_id" id="user_id" maxLength={16} />
                        </label>
                        <label htmlFor="mobile_number" className='flex mb-2 flex-col text-center' >Mobile Number
                            <input type="number" name="mobile_number"
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className='m-auto mt-2 rounded-lg h-8 text-center w-[70%] bg-black p-4 border-2' id="mobile_number"
                                min={1000000000} max={9999999999} maxLength={10}
                                placeholder='1234567890, 1111111111, ...' />
                        </label>
                        <label htmlFor="password" className='  flex mb-2 flex-col text-center'>Password
                            <div className="flex w-[70%] bg-black m-auto items-center  rounded-lg border-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder='Name@123, User!@12,...'
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='m-auto mt-2 rounded-lg h-8 text-center w-[70%] bg-black p-4 border-none outline-none'
                                    name="password"
                                    id="password"
                                    maxLength={16}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="focus:outline-none right-2 mr-2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </label>
                        <label htmlFor="promo_code" className='flex mb-2 flex-col text-center'>Promo Code
                            <input type="text" placeholder='Harry10, AgentX5,...' value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className='m-auto mt-2 rounded-lg h-8 text-center w-[70%] bg-black p-4 border-2' name="promo_code" id="promo_code" maxLength={16} />
                        </label>
                        {message ? (<div className=' text-red-500'>{message}</div>) : (<></>)}
                        <div className='flex justify-center'>
                            <button type='submit' onClick={handleRegisterClick} className='my-4 font-bold hover:bg-green-800 border-4 bg-white text-black rounded-lg h-10 w-[50%]'>
                                Register
                            </button>
                        </div>
                        {/* {error && (
                            <div className="text-red-900 mt-4 bg-red-200 w-full text-center">
                                {error}
                            </div>
                        )} */}
                    </div>
                </form>
                <div className='flex flex-col mt-8 mb-10'>
                    <div className='text-md md:text-xl flex font-bold mx-auto'>
                        <div className='p-2 underline underline-offset-2'>Already registered</div>
                        <div onClick={navigateToLoginPage} className='ml-10 hover:bg-green-800 border-2 bg-white text-black cursor-pointer px-4 py-2 rounded-md '>Login</div>
                    </div>
                </div>
            </div>
            <div onClick={navigateToLandingPage} className="fixed cursor-pointer text-red-500 top-2 right-4 z-10 ">
                <FaWindowClose size={30} className='shadow-lg shadow-red-500 bg-white rounded-lg' />
            </div>
        </div>
    )
}

export default Register;
