import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { BiSolidOffer } from 'react-icons/bi';
import { FaPowerOff, FaHome, FaUserSecret, FaGamepad, FaUserCircle } from "react-icons/fa";
import { useLogout } from '../../hooks/useLogout';
import { useService } from '../../hooks/useService';

function AdminSettings2() {
    const service = useService();
    const [showUserSettings, setshowUserSettings] = useState('');
    const [showAllGamesSettings, setshowAllGamesSettings] = useState('');
    const [showSubAdminSettings, setshowSubAdminSettings] = useState('');
    const [showOfferSettings, setshowOfferSettings] = useState('');
    const [gameDuration, setgameDuration] = useState(10);
    const [confirmation, setConfirmation] = useState(false);
    const [userID, setUserID] = useState();
    const [mobileNumber, setMobileNumber] = useState(0);
    const { logout } = useLogout();
    // States
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();
    const [deleteSubAdmin, setDeleteSubAdmin] = useState('');
    const [userDetails, setUserDetails] = useState({
        userID: '',
        mobileNumber: '',
        password: '',
        promoCode: '',
    });
    const [agentDetails, setAgentDetails] = useState({
        userID: '',
        mobileNumber: '',
        password: '',
        promoCode: '',
        upiID: '',
        commission: '',
        share: '',
    });

    const handleBlockUserSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID || !mobileNumber) {
                alert('All fields required');
                return;
            }
            const response = await service.patch('/agent/settings/blockUser', { userID, mobileNumber });
            if (response.status === 200) {
                alert(`User Blocked!!!!\nUser Name: ${userID} \nMobile Number: ${mobileNumber}`);
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
            if (!userID || !mobileNumber) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await service.patch('/agent/settings/activateUser', { userID, mobileNumber });
            if (response.status === 200) {
                alert(`User Activated!!!!\nUser Name: ${userID} \nMobile Number: ${mobileNumber}`);
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
            if (!userID || !mobileNumber) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await service.patch('/admin/settings/betsLock', { userID, mobileNumber });
            if (response.status === 200) {
                alert(`User Bets Locked!!!!\nUser Name: ${userID} \nMobile Number: ${mobileNumber}`);
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
            const response = await service.patch('/admin/settings/gamesLock', { userID, mobileNumber });
            if (response.status === 200) {
                alert(`User Games Locked!!!!\nUser Name: ${userID} \nMobile Number: ${mobileNumber}`);
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
            const response = await service.post('/register', userDetails);
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

    const handleAgentCredentialsSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!agentDetails.userID || !agentDetails.mobileNumber || !agentDetails.password) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await service.post('/admin/settings/createAgent', agentDetails);
            if (response.status === 200) {
                alert('Agent created successfully');
                setAgentDetails({
                    userID: '',
                    mobileNumber: '',
                    password: '',
                    promoCode: '',
                    upiID: '',
                    commission: '',
                    share: '',
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

    const handleDeleteAgentSubmit = () => {
        if (window.confirm(`Blocked Sub-Admin: ${deleteSubAdmin}`)) {
        } else {
            alert('Action Cancelled');
        }
    };
    const handleAgentInputChange = (e) => {
        const { name, value } = e.target;
        setAgentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };
    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // The handler for the mobile number input change
    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };

    // The handler for the logout button click
    const handleLogoutClick = () => {
        logout();
    };

    const navigateToAdminPage = () => {
        navigate(-1);
    }

    const handleshowUserSettings = () => {
        setshowUserSettings(!showUserSettings);
    };

    const handleGameDuration = () => {
        setgameDuration(!gameDuration);
    };
    const handleshowOfferSettings = () => {
        setshowOfferSettings(!showOfferSettings);
    };

    const handleshowAllGamesSettings = () => {
        setshowAllGamesSettings(!showAllGamesSettings);
    };

    const handleshowSubAdminSettings = () => {
        setshowSubAdminSettings(!showSubAdminSettings);
    };

    return (
        <div className="p-4 rounded-lg shadow-lg w-auto lg:w-[90%] m-auto h-auto border-4 pb-20 flex flex-col text-white">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className="text-center font-bold text-2xl md:text-4xl lg:text-6xl my-4">Admin Settings</div>
                <div className="w-[80%] m-auto">
                    <div className="text-xl md:text-2xl flex justify-center lg:text-4xl font-semibold w-full mt-4">
                        Stats
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-start text-white font-bold mt-8">
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Account Balance</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">1,000,000,000,000</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Vendors</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">2500</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Users</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">10,000,000,000</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Games</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">6</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Games Lost</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">2500</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Personal Best</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2 ">500000</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Jackpot</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">100000000</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Highest Bet</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">50000</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Referal Earned</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">1000000</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Feature</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2">Value</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Option</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2">Value</div>
                        </div>
                        <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Attribute</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2">Value</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[90%] mx-auto items-center mt-8">
                    <div onClick={handleshowUserSettings} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <FaUserCircle size={35} className='mr-10' />
                        Users Settings
                        <MdOutlineArrowDropDownCircle size={35} className='ml-10' />
                    </div>
                    {showUserSettings ? (<div className='w-full text-center'>
                        <div>1. Games Lock</div>
                        <div>2. Bets Lock</div>
                        <div>3. User-ID Block</div>
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 border-4 p-4 bg-black">
                            <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 underline underline-offset-4 font-bold">Create User</div>
                            <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userID" value={userDetails.userID} onChange={handleUserInputChange}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='mobileNumber'
                                    value={userDetails.mobileNumber}
                                    maxLength={10}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={handleUserInputChange}
                                />
                                <label className="block my-4 text-center font-medium">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    name='password'
                                    value={userDetails.password}
                                    onChange={handleUserInputChange}
                                />
                                <label className="block my-4 text-center font-medium">PromoCode</label>
                                <input
                                    type="text" name='promoCode' value={userDetails.promoCode} onChange={handleUserInputChange}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <button onClick={handleUserCredentialsSubmit} className=" hover:bg-blue-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 border-4 p-4 bg-black">
                            <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 underline underline-offset-4 font-bold">Block User</div>
                            <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userUserID" value={userID} onChange={(e) => setUserID(e.target.value)}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                {/* <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                /> */}
                                <button onClick={handleBlockUserSubmit} className=" hover:bg-red-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 border-4 p-4 bg-black">
                            <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 underline underline-offset-4 font-bold">Activate User</div>
                            <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userUserID"
                                    value={userID} onChange={(e) => setUserID(e.target.value)}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                {/* <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
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
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                <button onClick={handleUserGamesLockSubmit} className=" hover:bg-red-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div> */}
                        <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 border-4 p-4 bg-black">
                            <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 underline underline-offset-4 font-bold">User Bets Lock</div>
                            <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">User-ID</label>
                                <input
                                    type="text" name="userUserID"
                                    value={userID} onChange={(e) => setUserID(e.target.value)}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                {/* <div className='py-4 font-bold text-xl'>OR</div>
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='userMobileNumber'
                                    value={mobileNumber}
                                    maxLength={10} min={1000000000} max={99999999999}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                /> */}
                                <button onClick={handleUserBetsLockSubmit} className=" hover:bg-red-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>) : (<></>)}
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8">
                    <div onClick={handleshowAllGamesSettings} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <FaGamepad size={35} className='mr-10' /> Games Settings <MdOutlineArrowDropDownCircle size={35} className='ml-10' /></div>
                    {showAllGamesSettings ? (<div className='w-full text-center'>
                        <div> 1. Duration,</div>
                        <div> 2. Reward Amount,</div>
                        <div>3. Game Lock,</div>
                        <div> 4. Theme Panel.</div>
                        <div className="mt-8 border-4 bg-black p-4 text-white">
                            <form className="flex flex-col mb-4 text-lg md:text-xl lg:text-2xl font-bold items-center">
                                <div className="my-4 flex flex-col w-full md:w-[70%] lg:w-[60%]">
                                    <label htmlFor="selected_game_name">Select Game</label>
                                    <select name="selected_game_name" className='p-2 m-2 text-center font-bold rounded-lg bg-black shadow-md shadow-white '>
                                        <option value="Select Option">Select Option</option>
                                        <option value="All Games">All Games</option>
                                        <option value="Single Digit Lottery">Single Digit Lottery</option>
                                        <option value="Double Digit Lottery">Double Digit Lottery</option>
                                        <option value="Triple Digit Lottery">Triple Digit Lottery</option>
                                        <option value="ColourBall Number Game">ColourBall Number Game</option>
                                        <option value="ColourBall Colour Game">ColourBall Colour Game</option>
                                        <option value="ColourBall Game">ColourBall Game</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="my-4 flex flex-col w-full md:w-[70%] lg:w-[60%]">
                                    <label htmlFor="game_duration" className="mb-2 text-center">Set Duration <span className='font-medium text-sm'>(minutes)</span></label>
                                    <input type="number" id="game_duration" name="game_duration" value={gameDuration} onChange={handleGameDuration} placeholder="Set your game duration here"
                                        className='p-2 m-2 text-center rounded-lg font-bold bg-black shadow-md shadow-white ' />
                                </div>
                                <div className="my-4 flex flex-col w-full md:w-[70%] lg:w-[60%]">
                                    <label htmlFor="reward_amount" className="mb-2 text-center">Reward Amount</label>
                                    <input type="number" id="reward_amount" name="reward_amount" value={mobile}
                                        onChange={handleMobileChange}
                                        placeholder="Reward Multiplier e.g. 1,2,3,4,5"
                                        className='p-2 m-2 text-center rounded-lg font-bold bg-black shadow-md shadow-white '
                                    />
                                </div>
                                <div className="my-4 flex flex-col w-full md:w-[70%] lg:w-[60%] bg-black font-bold rounded-xl border-4">
                                    <div className='my-4 flex flex-col items-center text-center'>
                                        <div className="flex font-medium my-4">Game Status: </div>
                                        <div className="grid lg:grid-cols-3">
                                            <div className="flex items-center mx-4 justify-center">
                                                <input
                                                    type="checkbox"
                                                    id="gameLocked"
                                                    name="gameLocked"
                                                    className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                                <label htmlFor="gameLocked" className="font-medium">Locked</label>
                                            </div>
                                            <div className="flex items-center mx-4 justify-center">
                                                <input
                                                    type="checkbox"
                                                    id="gameActive"
                                                    name="gameActive"
                                                    className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                                <label htmlFor="gameActive" className="font-medium">Active</label>
                                            </div>
                                            <div className="flex items-center mx-4 justify-center">
                                                <input
                                                    type="checkbox"
                                                    id="gameNA"
                                                    name="gameNA"
                                                    className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                                <label htmlFor="gameNA" className="font-medium">Coming Soon</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button type="button" className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded`}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>) : (<></>)}
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8 text-center">
                    <div onClick={handleshowSubAdminSettings} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <FaUserSecret size={35} className='mr-10' /> Agent Settings <MdOutlineArrowDropDownCircle size={35} className='ml-10' /></div>
                    {showSubAdminSettings ? (<div className='w-full h-auto'>
                        <div> 1. Create Agent Credential, </div>
                        <div> 2. User Settings Access Block, Lock , </div>
                        <div> 3. Mobile, Password, UPI, </div>
                        <div> 4. Delete Sub-Admin, </div>
                        <div> 5. Commission and Share Window. </div>
                        <div className="flex-col md:flex-row w-full md:w-3/5 mx-auto items-center mt-8 border-4 p-4 bg-black">
                            <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 underline underline-offset-4 font-bold">Create Agent</div>
                            <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">Agent-ID</label>
                                <input
                                    type="text" name="userID" value={agentDetails.userID} onChange={handleAgentInputChange}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <label className="block my-4 text-center font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    name='mobileNumber'
                                    value={agentDetails.mobileNumber}
                                    maxLength={10}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    onChange={handleAgentInputChange}
                                />
                                <label className="block my-4 text-center font-medium">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    name='password'
                                    value={agentDetails.password}
                                    onChange={handleAgentInputChange}
                                />
                                <label className="block my-4 text-center font-medium">PromoCode</label>
                                <input
                                    type="text" name='promoCode' value={agentDetails.promoCode} onChange={handleAgentInputChange}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <label className="block my-4 text-center font-medium">UPI-ID</label>
                                <input
                                    type="text" name='upiID' value={agentDetails.upiID} onChange={handleAgentInputChange}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <label className="block my-4 text-center font-medium">Commission (%)</label>
                                <input
                                    type="number"
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    name='commission'
                                    value={agentDetails.commission}
                                    onChange={handleAgentInputChange}
                                />
                                <label className="block my-4 text-center font-medium">Share (%)</label>
                                <input
                                    type="number"
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                    name='share'
                                    value={agentDetails.share}
                                    onChange={handleAgentInputChange}
                                />
                                <button onClick={handleAgentCredentialsSubmit} className=" hover:bg-blue-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="flex-col md:flex-row w-full md:w-3/5 mx-auto items-center mt-8 border-4 p-4 bg-black">
                            <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 underline underline-offset-4 font-bold">Reset Password</div>
                            <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                <label className="block my-4 text-center font-medium">Agent Mobile Number</label>
                                <input
                                    type="number"
                                    maxLength={10}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <label className="block my-4 text-center font-medium">Agent Password</label>
                                <input
                                    type="password"
                                    maxLength={16}
                                    className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                                />
                                <button onClick={handleDeleteAgentSubmit} className=" hover:bg-green-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                                    Reset
                                </button>
                            </form>
                        </div>
                    </div>) : (<></>)}
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8 text-center">
                    <div onClick={handleshowOfferSettings} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <BiSolidOffer size={35} className='mr-10' /> Offers Settings <MdOutlineArrowDropDownCircle size={35} className='ml-10' /></div>
                    {showOfferSettings ? (<div className='w-full md:w-2/3'>
                        <div> 1. Create Offer, </div>
                        <div> 2. Block / Lock Offer </div>
                        <div> 3. Delete Offer, </div>
                        <div> 4. Edit Offer, </div>
                        <div className="mt-8 w-auto border-4 p-4 bg-black">
                            <div className="w-full flex flex-col items-center">
                                <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 font-bold border-2 mt-8 rounded-full my-8">Add Special Offers</div>
                                <div className="w-full flex flex-col items-center">
                                    <form action={`/admin/settings`} className='text-white border-4 rounded-lg p-2 w-full'>
                                        <div className='flex flex-col text-center font-semibold mt-10'>
                                            <label htmlFor="special_Offers_Code">Offer Name</label>
                                            <input type="text" name="special_Offers_Code" placeholder='E.g. Diwali10, NewYear15, etc.' className='mb-4 h-auto text-center md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white bg-black shadow-lg shadow-black' />
                                        </div>
                                        <div className='flex flex-col text-center font-semibold'>
                                            <label htmlFor="bonus_percent">Set Bonus Percent</label>
                                            <input type="number" maxLength={2} min={5} max={50} name="bonus_percent" placeholder='E.g. 5,10,15,20,25 etc.' className='mb-4 h-auto text-center md:h-14 font-semibold rounded-lg border-4 border-white bg-white bg-black shadow-lg shadow-black' />
                                        </div>
                                        <div className='flex flex-col text-center font-semibold'>
                                            <label htmlFor="selected_game_name">Select Game</label>
                                            <select name="selected_game_name" className='mb-4 h-auto text-center md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white bg-black shadow-lg shadow-black'>
                                                <option value="Select Option">Select Option</option>
                                                <option value="All Games">All Games</option>
                                                <option value="Single Digit Lottery">Single Digit Lottery</option>
                                                <option value="Double Digit Lottery">Double Digit Lottery</option>
                                                <option value="Triple Digit Lottery">Triple Digit Lottery</option>
                                                <option value="ColourBall Number Game">ColourBall Number Game</option>
                                                <option value="ColourBall Colour Game">ColourBall Colour Game</option>
                                                <option value="ColourBall Game">ColourBall Game</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className='flex justify-center'>
                                            <button type='submit' className='w-1/4 md:w-1/4 h-auto md:h-12 bg-blue-500 font-bold rounded-lg p-2 m-4 hover:bg-white hover:text-blue-900 shadow-sm shadow-white'>Submit</button>
                                        </div>
                                        <div className='text-center text-xs md:text-sm'>Instructions Text for the user setting discount percent.</div>
                                    </form>
                                </div>
                                <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 font-bold border-2 my-8 rounded-full">Edit Offer</div>
                                <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                    <div className='flex flex-col text-center font-semibold w-full mt-4'>
                                        <label htmlFor="special_Offers_Code" className='my-4'>Offer Name</label>
                                        <input type="text" name="special_Offers_Code" placeholder='E.g. Diwali10, NewYear15, etc.' className='text-center h-auto md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white bg-black shadow-lg shadow-black' />
                                    </div>
                                    <div className='flex flex-col w-full text-center font-semibold'>
                                        <label htmlFor="selected_game_name" className='my-4'>Select Game</label>
                                        <select name="selected_game_name" className='text-center w-full h-auto md:h-14 font-semibold rounded-lg border-4 border-white bg-white bg-black shadow-lg shadow-black'>
                                            <option value="Select Option">Select Option</option>
                                            <option value="All Games">All Games</option>
                                            <option value="Single Digit Lottery">Single Digit Lottery</option>
                                            <option value="Double Digit Lottery">Double Digit Lottery</option>
                                            <option value="Triple Digit Lottery">Triple Digit Lottery</option>
                                            <option value="ColourBall Game">ColourBall Game</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <label className="block my-4 text-center font-medium">Change Bonus Percent</label>
                                    <input type="number"
                                        className='p-2 m-4 text-center h-auto md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white bg-black shadow-lg shadow-black'
                                    />
                                    <button onClick={handleDeleteAgentSubmit} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:border-4 hover:bg-blue-900">
                                        Change
                                    </button>
                                </form>
                                <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 font-bold border-2 my-8 rounded-full">Remove Offer</div>
                                <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                    <div className='flex flex-col text-center w-full font-semibold mt-10'>
                                        <label htmlFor="special_Offers_Code">Offer Name</label>
                                        <input type="text" name="special_Offers_Code" placeholder='E.g. Diwali10, NewYear15, etc.' className='text-center h-auto md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white bg-black shadow-lg shadow-black' />
                                    </div>
                                    <button onClick={handleDeleteAgentSubmit} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:border-4 hover:bg-red-700">
                                        Remove
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>) : (<></>)}
                    <div className="fixed top-10 right-2 md:top-10 md:right-24 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                        <button onClick={navigateToAdminPage}>
                            <FaHome size={30} />
                        </button>
                    </div>
                </div>
                <div className="mt-8 text-white font-bold text-xl flex items-center">
                    <button type="button" onClick={handleLogoutClick} className="bg-red-600 w-auto hover:bg-red-700 hover:border-4 p-4 m-4 rounded-xl flex">
                        <FaPowerOff size={28} className="mr-2" /> Logout
                    </button>
                </div>
            </div>
        </div >
    );
};

export default AdminSettings2;
