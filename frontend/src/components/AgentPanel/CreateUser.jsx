import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useService } from '../../hooks/useService';

function AgentsCreateUser() {
    // States
    const service = useService();
    const navigate = useNavigate();
    const [userID, setUserID] = useState();
    const [mobileNumber, setMobileNumber] = useState(0);
    const [userDetails, setUserDetails] = useState({
        userID: '',
        mobileNumber: '',
        password: '',
        promoCode: '',
    });
    const handleUserCredentialsSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userDetails.userID || !userDetails.mobileNumber || !userDetails.password) {
                alert('Please fill out all required fields');
                return;
            }
            const response = await service.post('/register', userDetails);
            if (response.status === 200) {
                alert(`User Name: ${userDetails.userID} \nMobile Number: ${userDetails.mobileNumber} \nPromoCode: ${userDetails.promoCode}`);
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
    const navigateToHomePage = () => {
        navigate(-1);
    }
    return (
        <div className="bg-slate-600 flex w-full text-white h-auto">
            <div className="flex flex-col items-center justify-center w-full p-2 mb-40">
                <div className="text-center font-bold text-2xl md:text-4xl lg:text-6xl my-4">User</div>
                <div className="w-4/5 m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-start text-white font-bold mt-8">
                        <div className="bg-slate-900 text-white hover:scale-125 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Total Users</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">10,000,000</div>
                        </div>
                        <div className="bg-slate-900 text-white hover:scale-125 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>My Users</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">2000</div>
                        </div>
                        <div className="bg-slate-900 text-white hover:scale-125 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Referal Earned</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2  ">2,000,000</div>
                        </div>
                        <div className="bg-slate-900 text-white hover:scale-125 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                            <div>Games</div>
                            <div className="bg-black rounded-lg text-white p-4 m-2">4</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-3/5 mx-auto items-center mt-8 border-4 p-4 bg-black">
                    <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 underline underline-offset-4 font-bold">Create User</div>
                    <form className='flex bg-black flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full '>
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
                            maxLength={10} min={1000000000} max={99999999999}
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
                        <button
                            onClick={handleUserCredentialsSubmit}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 hover:border-4 rounded-md hover:bg-blue-500"
                        >
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
                        <button onClick={handleActivateUserSubmit} className=" hover:bg-green-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <div className="fixed top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToHomePage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div>
    );
};

export default AgentsCreateUser;


