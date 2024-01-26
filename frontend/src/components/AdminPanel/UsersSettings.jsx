import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import axios from 'axios';

function UsersSettings() {
    const [userID, setUserID] = useState();
    const [mobileNumber, setMobileNumber] = useState(0);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        userID: '',
        mobileNumber: '',
        password: '',
        promoCode: '',
    });
    const handleBlockUserSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID) {
                alert('All fields required');
                return;
            }
            const response = await axios.patch('/agent/settings/blockUser', { userID });
            if (response.status === 200) {
                alert(`User Blocked!!!!\nUser Name: ${userID}`);
                setUserID('');
                setMobileNumber(0);
            }
            else {
                alert('Failed to block user. Please try again.');
            }
        } catch (error) {
            console.error('Error Block User:', error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
    const handleActivateUserSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await axios.patch('/agent/settings/activateUser', { userID });
            if (response.status === 200) {
                alert(`User Activated!!!!\nUser Name: ${userID}`);
                setUserID('');
                setMobileNumber(0);
            }
            else {
                alert('Failed to block user. Please try again.');
            }
        } catch (error) {
            console.error('Error Block User:', error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
    const handleUserBetsLockSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await axios.patch('/admin/settings/betsLock', { userID });
            if (response.status === 200) {
                alert(`User Bets Locked!!!!\nUser Name: ${userID} `);
                setUserID('');
                setMobileNumber(0);
            }
            else {
                alert('Failed to block user. Please try again.');
            }
        } catch (error) {
            console.error('Error Block User:', error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
    const handleUserBetsActivateSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await axios.patch('/admin/settings/betsActivate', { userID });
            if (response.status === 200) {
                alert(`User Bets Activated!!!!\nUser Name: ${userID}`);
                setUserID('');
                setMobileNumber(0);
            }
            else {
                alert('Failed to block user. Please try again.');
            }
        } catch (error) {
            console.error('Error Block User:', error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
    const handleUserGamesLockSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID || !mobileNumber) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await axios.patch('/admin/settings/gamesLock', { userID });
            if (response.status === 200) {
                alert(`User Games Locked!!!!\nUser Name: ${userID}`);
                setUserID('');
                setMobileNumber(0);
            }
            else {
                alert('Failed to block user. Please try again.');
            }
        } catch (error) {
            console.error('Error User Games Lock:', error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };
    const handleUserCredentialsSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userDetails.userID || !userDetails.mobileNumber || !userDetails.password) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await axios.post('/register', userDetails);
            if (response.status === 200) {
                alert('User created successfully');
                setUserDetails({
                    userID: '',
                    mobileNumber: '',
                    password: '',
                    promoCode: '',
                });
            } else {
                alert('Failed to create agent. Please try again.');
            }
        } catch (error) {
            console.error('Error creating agent:', error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const navigateToAdminPage = () => {
        navigate(-1);
    }

    return (
        <div className="p-4 rounded-lg shadow-lg w-auto lg:w-[90%] m-auto h-auto border-4 pb-20 flex flex-col text-white">
            <div className="flex flex-col items-center justify-center w-full">
                <div className="text-center font-bold text-2xl md:text-4xl lg:text-6xl my-4">Users Settings</div>
                <div className="flex flex-col w-[90%] mx-auto items-center mt-8">
                    <div className='w-full text-center'>
                        {/* <div>1. Games Lock</div>
                            <div>2. Bets Lock</div>
                            <div>3. User-ID Block</div> */}
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 p-4">
                            <div className="text-xl md:text-2xl lg:text-4xl p-4 underline underline-offset-4 font-bold">Create User</div>
                            <form className='flex flex-col mx-auto items-center bg-black text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userID" value={userDetails.userID} onChange={handleUserInputChange}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='mobileNumber'
                                    value={userDetails.mobileNumber}
                                    maxLength={10}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={handleUserInputChange}
                                />
                                <label className="block my-4 text-center font-medium">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    name='password'
                                    value={userDetails.password}
                                    onChange={handleUserInputChange}
                                />
                                <label className="block my-4 text-center font-medium">PromoCode</label>
                                <input
                                    type="text" name='promoCode' value={userDetails.promoCode} onChange={handleUserInputChange}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <button onClick={handleUserCredentialsSubmit} className=" hover:bg-blue-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 p-4">
                            <div className="text-xl md:text-2xl lg:text-4xl p-4 underline underline-offset-4 font-bold">Block User</div>
                            <form className='flex flex-col mx-auto items-center bg-black text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userUserID" value={userID} onChange={(e) => setUserID(e.target.value)}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                {/* <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                /> */}
                                <button onClick={handleBlockUserSubmit} className=" hover:bg-red-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 p-4 ">
                            <div className="text-xl md:text-2xl lg:text-4xl p-4 underline underline-offset-4 font-bold">Activate User</div>
                            <form className='flex flex-col bg-black mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userUserID"
                                    value={userID} onChange={(e) => setUserID(e.target.value)}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                {/* <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                /> */}
                                <button onClick={handleActivateUserSubmit} className=" hover:bg-green-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                        {/* <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 border-4 p-4 bg-black">
                            <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 underline underline-offset-4 font-bold">User Games Lock</div>
                            <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userUserID"
                                    value={userID} onChange={(e) => setUserID(e.target.value)}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                <button onClick={handleUserGamesLockSubmit} className=" hover:bg-red-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div> */}
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 p-4">
                            <div className="text-xl md:text-2xl lg:text-4xl p-4 underline underline-offset-4 font-bold">Lock Bets</div>
                            <form className='flex flex-col mx-auto bg-black items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userUserID"
                                    value={userID} onChange={(e) => setUserID(e.target.value)}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                {/* <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                /> */}
                                <button onClick={handleUserBetsLockSubmit} className=" hover:bg-red-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 p-4">
                            <div className="text-xl md:text-2xl lg:text-4xl p-4 underline underline-offset-4 font-bold">Activate Bets</div>
                            <form className='flex flex-col mx-auto bg-black items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userUserID"
                                    value={userID} onChange={(e) => setUserID(e.target.value)}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                {/* <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                /> */}
                                <button onClick={handleUserBetsActivateSubmit} className=" hover:bg-green-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="fixed top-10 right-2 md:top-10 md:right-24 bg-black hover:bg-green-600 text-white shadow-md shadow-white p-2 m-2 rounded-lg">
                    <button onClick={navigateToAdminPage}>
                        <FaHome size={30} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersSettings;

