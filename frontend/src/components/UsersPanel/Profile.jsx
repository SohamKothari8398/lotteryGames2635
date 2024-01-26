import React, { useState } from "react";
import { FaPowerOff, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

// The ProfileComponent that has three sections: User History, Change Password and Logout
const Profile = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    // States
    const [showForm, setShowForm] = useState(false);
    const [showBankForm, setShowBankForm] = useState(false);
    const [showMobileForm, setShowMobileForm] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [newUpiID, setNewUpiID] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [newMobileNumber, setnewMobileNumber] = useState("");
    const [recaptcha, setRecaptcha] = useState(false);
    const [recaptcha2, setRecaptcha2] = useState(false);
    const [recaptcha3, setRecaptcha3] = useState(false);
    const navigate = useNavigate();

    const navigateToUserHomePage = () => {
        navigate(-1);
    }

    // The handler for the mobile number input change
    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };

    // The handler for the OTP input change
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setnewPassword(e.target.value);
    };

    const handleNewNumberChange = (e) => {
        setnewMobileNumber(e.target.value);
    };

    const handleConfirmNewNumber = (e) => {
        if (e.target.value === newMobileNumber)
            return true;
        else return 'Numbers does not match!!';
    }

    // The handler for the Google reCAPTCHA checkbox change
    const handleRecaptchaChange = (e) => {
        setRecaptcha(e.target.checked);
    };
    const handleRecaptcha2Change = (e) => {
        setRecaptcha2(e.target.checked);
    };
    const handleRecaptcha3Change = (e) => {
        setRecaptcha3(e.target.checked);
    };

    // The handler for the submit button click
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            if (newPassword.length < 8) {
                throw new Error('Frontend Error: Password should be a minimum of 8 characters long.');
            }
            const response = await axios.put('/login', {
                mobileNumber: mobile,
                otp: otp,
                newPassword: newPassword,
            });
            if (response.data.status === 'Password updated successfully') {
                alert('Password Changed successfully');
            } else {
                throw new Error(response.data.error || 'Failed to update password. Please check your inputs.');
            }
        } catch (error) {
            console.error('Password change failed:', error);
            alert(error.message || 'Failed to update password. Please try again.');
        }
    };

    const handleMobileNumberChange = () => {
        alert("Mobile Number changed successfully!");
    };

    const handleUpiChange = async (e) => {
        e.preventDefault();
        try {
            if (newUpiID.length < 13) {
                throw new Error('Frontend Error: UPI-ID should be a minimum of 14 characters long.');
            }
            const response = await axios.put('/user/profile', {
                mobileNumber: mobile,
                otp: otp,
                newUpiID: newUpiID,
            });
            if (response.data.status === "UPI Details Updated") {
                alert("Bank Details changed successfully!");
            } else {
                throw new Error(response.data.error || 'Failed to update UPI details. Please try again.');
            }
        } catch (error) {
            console.error('UPI-ID change failed:', error);
            console.log('Axios Response:', error.response);
            alert(error.response?.data?.error || error.message || 'Failed to update UPI details. Please try again.');
        }
    };

    // The handler for the logout button click
    const handleLogoutClick = () => {
        logout();
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };
    const handleToggleBankForm = () => {
        setShowBankForm(!showBankForm);
    };
    const handleToggleMobileForm = () => {
        setShowMobileForm(!showMobileForm);
    };

    const handleToggleTable = () => {
        setShowTable(!showTable);
    };


    return (
        <div className="mx-auto px-4 py-8 bg-slate-900">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center text-white underline underline-offset-8 italic">My Profile</h1>
            <div className="mt-8 w-[90%] md:w-[80%] m-auto">
                <div className="text-xl md:text-2xl flex justify-center lg:text-4xl font-semibold w-full mt-16 text-white">
                    My Status
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 text-center text-white font-bold mt-8">
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                        <div>Wallet Balance(in INR)</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2">{user.walletBalance}</div>
                    </div>
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                        <div>Total Games Played</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4 ">{user.gamesPlayed}</div>
                    </div>
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                        <div>Games Won</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">{user.gamesWon}</div>
                    </div>
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                        <div>Active Games</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">{user.gamesActive}</div>
                    </div>
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:bg-green-700 hover:border-4">
                        <div>Games Lost</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">{user.gamesLoss}</div>
                    </div>
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:bg-green-700 hover:border-4">
                        <div>Personal Best</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">500000</div>
                    </div>
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:bg-green-700 hover:border-4">
                        <div>Jackpot</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">100000000</div>
                    </div>
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:bg-green-700 hover:border-4">
                        <div>Highest Bet</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">50000</div>
                    </div>
                    <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:bg-green-700 hover:border-4">
                        <div>Referal Earned</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">1000000</div>
                    </div>
                    <div className="bg-black hover:border-4 hover:scale-125 hover:bg-green-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                        <div>Feature</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2">Value</div>
                    </div>
                    <div className="bg-black hover:border-4 hover:scale-125 hover:bg-green-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                        <div>Option</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2">Value</div>
                    </div>
                    <div className="bg-black hover:border-4 hover:scale-125 hover:bg-green-700 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
                        <div>Attribute</div>
                        <div className="bg-white rounded-lg text-black p-4 m-2">Value</div>
                    </div>
                </div>
            </div>
            {/* <div className="mt-8 flex flex-col w-[90%] md:w-[80%] lg:w-[60%]  mx-auto">
                <div className="w-full">
                    <button onClick={handleToggleMobileForm} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        Change Mobile Number
                        <MdOutlineArrowDropDownCircle size={35} className="ml-10" />
                    </button>
                </div>
                <div>
                    {showMobileForm ? (<form className="mt-8 border-4 p-4 text-white font-bold">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="userID" className="mb-2 font-bold text-lg text-center">Confirm User-ID</label>
                            <input type="text" id="userID" name="userID" value={userID} onChange={handleUserIDChange} placeholder="It will be fetched automatically"
                                className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="mobile" className="mb-2 font-bold text-lg text-center">Mobile Number</label>
                            <input type="tel" id="mobile" name="mobile" value={mobile} maxLength={10}
                                onChange={handleMobileChange}
                                placeholder="Enter your mobile number"
                                className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center"
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="otp" className="mb-2 font-bold text-lg text-center">OTP</label>
                            <input type="number" id="otp" name="otp" value={otp}
                                onChange={handleOtpChange}
                                placeholder="Enter the OTP received on your mobile number" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="new_number" className="mb-2 font-bold text-lg text-center">New Number</label>
                            <input type="password" id="new_number" maxLength={10} name="new_number" value={newMobileNumber}
                                onChange={handleNewNumberChange}
                                placeholder="Enter new mobile number" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="confirm_new_number" className="mb-2 font-bold text-lg text-center">Confirm New Number</label>
                            <input type="tel" id="confirm_new_nuber" maxLength={10} name="confirm_new_number" value={newMobileNumber}
                                onChange={handleNewNumberChange && handleConfirmNewNumber}
                                placeholder="Confirm your mobile number" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                        </div>
                        <div className="flex items-center mb-4  justify-center">
                            <input
                                type="checkbox"
                                id="recaptcha"
                                name="recaptcha"
                                checked={recaptcha}
                                onChange={handleRecaptchaChange}
                                className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <label htmlFor="recaptcha" className="font-medium text-blue-500 underline underline-offset-2">I'm not a robot</label>
                        </div>
                        <div className="flex justify-center">
                            <button type="button" onClick={handleMobileNumberChange} disabled={!userID || !mobile || !otp || !newMobileNumber}
                                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded ${!userID || !mobile || !otp || !newMobileNumber || !recaptcha ? "opacity-50 cursor-not-allowed" : ""}`}>
                                Submit
                            </button>
                        </div>
                    </form>) : (<></>)}
                </div>
            </div> */}
            <div className="mt-8 flex flex-col w-[90%] md:w-[80%] lg:w-[60%]  mx-auto">
                <div className="w-full">
                    <button onClick={handleToggleBankForm} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        Change UPI Details
                        <MdOutlineArrowDropDownCircle size={35} className="ml-10" />
                    </button>
                </div>
                {showBankForm ? (<form className="mt-8 border-4 p-4 text-white">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="mobile" className="mb-2 font-bold text-lg text-center">Mobile Number</label>
                        <input type="tel" id="mobile" name="mobile" value={mobile}
                            onChange={handleMobileChange}
                            placeholder="Enter your mobile number"
                            className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="otp2" className="mb-2 font-bold text-lg text-center">OTP</label>
                        <input type="number" id="otp2" name="otp2" value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter the OTP received on your mobile number" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="new_UPI_ID" className="mb-2 font-bold text-lg text-center">New UPI Details</label>
                        <input type="text" id="new_UPI_ID" value={newUpiID} onChange={(e) => setNewUpiID(e.target.value)} name="new_UPI_ID"
                            placeholder="Enter new bank details" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="confirm_new_UPI_ID" className="mb-2 font-bold text-lg text-center">Confirm New UPI Details</label>
                        <input type="text" id="confirm_new_UPI_ID" value={newUpiID} onChange={(e) => setNewUpiID(e.target.value)} name="confirm_new_UPI_ID" placeholder="Confirm your new bank details" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                    </div>
                    <div className="flex items-center mb-4  justify-center">
                        <input
                            type="checkbox"
                            id="recaptcha2"
                            name="recaptcha2"
                            checked={recaptcha2}
                            onChange={handleRecaptcha2Change}
                            className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <label htmlFor="recaptcha2" className="font-medium text-blue-500 underline underline-offset-2">I'm not a robot</label>
                    </div>
                    <div className="flex justify-center">
                        <button type="button" onClick={handleUpiChange} disabled={!mobile || !otp || !recaptcha2}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded ${!mobile || !otp || !recaptcha2 ? "opacity-50 cursor-not-allowed" : ""}`}>
                            Submit
                        </button>
                    </div>
                </form>) : (<></>)}
            </div>
            <div className="mt-8 text-white w-[90%] md:w-[80%] lg:w-[60%] flex flex-col  mx-auto">
                <div className="w-full">
                    <button onClick={handleToggleForm} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        Change Password
                        <MdOutlineArrowDropDownCircle size={35} className="ml-10" />
                    </button>
                </div>
                {showForm ? (<form className="mt-8 border-4 p-4">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="mobile" className="mb-2 font-bold text-lg text-center">Mobile Number</label>
                        <input type="tel" id="mobile" name="mobile" value={mobile}
                            onChange={handleMobileChange}
                            placeholder="Enter registered mobile number"
                            className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="otp3" className="mb-2 font-bold text-lg text-center">OTP</label>
                        <input type="number" id="otp3" name="otp3" value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter the OTP received on your mobile number" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="new_password" className="mb-2 font-bold text-lg text-center">New Password</label>
                        <input type="password" id="new_password" name="new_password" value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder="Enter new password" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="confirm_new_password" className="mb-2 font-bold text-lg text-center">Confirm New Password</label>
                        <input type="text" id="confirm_new_password" name="confirm_new_password" value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder="Confirm new password" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
                    </div>
                    <div className="flex items-center mb-4  justify-center">
                        <input
                            type="checkbox"
                            id="recaptcha3"
                            name="recaptcha3"
                            checked={recaptcha3}
                            onChange={handleRecaptcha3Change}
                            className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <label htmlFor="recaptcha3" className="font-medium text-blue-500 underline underline-offset-2">I'm not a robot</label>
                    </div>
                    <div className="flex justify-center">
                        <button type="button" onClick={handlePasswordChange} disabled={!mobile || !otp || !newPassword}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded ${!mobile || !otp || !newPassword ? "opacity-50 cursor-not-allowed" : ""}`}>
                            Submit
                        </button>
                    </div>
                </form>) : (<></>)}
            </div>
            <div className="mt-8 flex justify-center">
                <button type="button" onClick={handleLogoutClick} className="bg-red-600 w-auto hover:bg-red-700 hover:border-4 text-white font-bold p-4 m-4 rounded-xl flex items-center">
                    <FaPowerOff className="mr-2" /> Logout
                </button>
            </div>
            <div className="fixed top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToUserHomePage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div >
    );
};

export default Profile;