import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWindowClose, FaEye, FaEyeSlash, FaArrowAltCircleUp, FaArrowCircleDown } from 'react-icons/fa';
import { useLogin } from '../../hooks/useLogin';
import { useService } from '../../hooks/useService';
import useScrollToTop from '../../hooks/useScrollToTop';

function LoginSignin() {
    useScrollToTop();
    const service = useService()
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [userID, setUserID] = useState("");
    // const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumber2, setMobileNumber2] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login, error } = useLogin();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleShowForgotPasswordForm = () => {
        setShowForgotPassword(!showForgotPassword);
    }

    const handleLoginClick = async (e) => {
        e.preventDefault();
        if (!userID && !password) alert("All Fields are required");
        await login(userID, password);
    };

    const handleChangePasswordClick = async (e) => {
        e.preventDefault();
        try {
            if (newPassword.length < 8) {
                throw new Error('Frontend Error: Password should be a minimum of 8 characters long.');
            }
            const response = await service.put('/login', {
                mobileNumber: mobileNumber2,
                otp: otp,
                newPassword: newPassword,
            });
            if (response.data.status === 'Password updated successfully') {
                alert('Password updated successfully');
            } else {
                throw new Error(response.data.error || 'Failed to update password. Please check your inputs.');
            }
        } catch (error) {
            console.error('Password change failed:', error);
            alert(error.message || 'Failed to update password. Please try again.');
        }
    };


    const navigateToLandingPage = () => {
        navigate(-1);
    };

    const navigateToRegisterPage = () => {
        navigate('/register');
    };

    return (
        <div className="top-0 left-0 right-0 bottom-0 bg-black flex my-20">
            <div className=" w-full md:w-1/2 lg:w-1/2 h-[90%] m-auto overflow-auto rounded-lg flex">
                <div className="rounded-lg m-auto w-full h-auto">
                    <div className="italic m-auto text-center text-3xl md:text-5xl lg:text-6xl cursor-pointer font-bold">Login</div>
                    <div onClick={handleShowForgotPasswordForm}
                        className="flex my-8 text-red-900 font-bold text-sm w-full cursor-pointer justify-center h-auto hover:scale-125 underline underline-offset-2" >
                        Forgot Password
                        {showForgotPassword ? (<div>
                            <FaArrowAltCircleUp size={20} className="ml-4" />
                        </div>) : (
                            <div>
                                <FaArrowCircleDown size={20} className="ml-4" />
                            </div>)}
                    </div>
                    {showForgotPassword ? (
                        <form action={`/login?mobileNumber=${mobileNumber2}&otp=${otp}&newPassword=${newPassword}`} className="flex flex-col text-md md:text-lg lg:text-xl font-medium w-full h-auto">
                            <div className="forgotPassword border-2 w-[80%] md:w-[60%] mx-auto mb-4 py-4">
                                <label htmlFor="mobile_number2" className="flex font-bold mb-2 flex-col text-center">
                                    Mobile Number
                                    <input
                                        type="number"
                                        value={mobileNumber2}
                                        placeholder="Enter Mobile Number"
                                        onChange={(e) => setMobileNumber2(e.target.value)}
                                        name="mobile_number2"
                                        className="m-auto mt-2 text-center rounded-lg h-6 w-[80%] text-white bg-black border-2 p-4"
                                        id="mobile_number2"
                                        min={1000000000}
                                        max={9999999999}
                                        maxLength={10}
                                        required
                                    />
                                </label>
                                <label htmlFor="otp" className="flex font-bold mb-2 flex-col text-center">
                                    OTP
                                    <input
                                        type="number"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="m-auto mt-2 h-8  rounded-lg border-2 w-[80%] text-white bg-black text-center"
                                        placeholder="Enter OTP"
                                        name="otp"
                                        id="otp"
                                        maxLength={8}
                                        required
                                    />
                                </label>
                                <label htmlFor="newPassword" className="flex font-bold mb-2 flex-col items-center text-center">
                                    New Password
                                    <div className="flex w-[80%] bg-black m-auto items-center  rounded-lg border-2">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={newPassword}
                                            placeholder="Enter new Password"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="m-auto mt-2 rounded-sm h-8 outline-none w-[80%] text-white bg-black text-center"
                                            name="newPassword"
                                            id="newPassword"
                                            maxLength={16}
                                            required
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
                                <label htmlFor="confirmNewPassword" className="flex font-bold flex-col items-center text-center">
                                    Confirm New Password
                                    <div className="flex w-[80%] bg-black m-auto items-center  rounded-lg border-2">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            placeholder="Confirm New Password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="m-auto mt-2 rounded-sm h-8 outline-none w-[80%] text-white bg-black text-center"
                                            name="confirmNewPassword"
                                            id="confirmNewPassword"
                                            maxLength={16}
                                            required
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
                                {newPassword !== confirmPassword && (
                                    <div className="text-red-500 text-sm text-center mt-1">Passwords do not match</div>
                                )}
                                {newPassword === confirmPassword && (
                                    <div className="text-green-500 text-sm text-center mt-1">Passwords match</div>
                                )}
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleChangePasswordClick}
                                        className=" bg-white text-black hover:bg-green-800 hover:text-white border-2 rounded-xl h-auto w-1/2 mt-4 p-1 font-bold my-1"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form action="/login" className="flex flex-col text-white w-[80%] md:w-[50%] mx-auto h-auto border-4 rounded-lg my-8 py-4">
                            <div className="flex flex-col text-md md:text-lg lg:text-xl font-semibold">
                                <label htmlFor="user_ID" className="flex font-bold mb-2 flex-col text-center">
                                    User-ID
                                    <input
                                        type="text"
                                        value={userID}
                                        placeholder="Enter User-ID"
                                        onChange={(e) => setUserID(e.target.value)}
                                        name="user_ID"
                                        className="m-auto mt-2 text-center rounded-lg h-8 w-[80%] text-white bg-black border-2 p-4"
                                        id="user_ID"
                                        maxLength={16}
                                    />
                                </label>
                                <label htmlFor="password" className="flex font-bold mb-2 flex-col text-center">
                                    Password
                                    <div className="flex w-[80%] bg-black m-auto items-center  rounded-lg border-2">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            placeholder="Enter Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="m-auto mt-2 rounded-lg h-8 text-center w-[70%] bg-black p-4 border-none outline-none"
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
                                {error ? (<div className=" text-red-800 flex text-center w-full rounded-lg shadow-lg shadow-white bg-white">{error}</div>) : (<></>)}
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleLoginClick}
                                        className="shadow-sm shadow-slate-100 mt-4 bg-white text-black hover:bg-green-800 hover:text-white border-2 rounded-md h-[2.5rem] w-1/2 font-bold"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                    <div className="flex flex-col mb-2">
                        <div className="text-md md:text-xl flex font-bold mx-auto">
                            <div className="p-1 underline underline-offset-2">No Account</div>
                            <div onClick={navigateToRegisterPage} className="ml-10  px-4 py-1 rounded-md bg-white text-black hover:bg-green-800 hover:text-white border-2">
                                Register
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={navigateToLandingPage} className="absolute text-red-500 top-2 right-4 z-10">
                    <FaWindowClose size={30} className="shadow-lg shadow-red-500 bg-white rounded-lg" />
                </button>
            </div>
        </div>
    );
}

export default LoginSignin;
