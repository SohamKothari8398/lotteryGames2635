import React, { useState } from "react";
import { FaPowerOff, FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { useService } from "../../hooks/useService";

// The ProfileComponent that has three sections: User History, Change Password and Logout
const Profile = () => {
    const service = useService()
    const { user } = useAuthContext();
    const { logout } = useLogout();
    // States
    const [showForm, setShowForm] = useState(false);
    const [showBankForm, setShowBankForm] = useState(false);
    // const [showMobileForm, setShowMobileForm] = useState(false);
    const [mobile, setMobile] = useState(null);
    const [otp, setOtp] = useState(null);
    const [newUpiID, setNewUpiID] = useState("");
    const [confirmUpiID, setConfirmUpiID] = useState("");
    // const [recaptcha, setRecaptcha] = useState(false);
    const [recaptcha2, setRecaptcha2] = useState(false);
    const [recaptcha3, setRecaptcha3] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const navigateToUserHomePage = () => {
        navigate(-1);
    }
    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            if (newPassword.length < 8) {
                throw new Error('Frontend Error: Password should be a minimum of 8 characters long.');
            }
            const response = await service.put('/login', {
                mobileNumber: mobile,
                otp: otp,
                newPassword: newPassword,
            });
            if (response.data.status === 'Password updated successfully') {
                alert('Password Changed successfully');
                setMobile(null);
                setOtp(null);
                setNewPassword("");
                setConfirmPassword("");
            } else {
                throw new Error(response.data.error || 'Failed to update password. Please check your inputs.');
            }
        } catch (error) {
            console.error('Password change failed:', error);
            alert(error.message || 'Failed to update password. Please try again.');
        }
    };
    const profileDetails = [
        { label: "User ID", value: user.userID },
        { label: "Account Status", value: user.accountStatus },
        { label: "Bets Status", value: user.bets },
        { label: "Mobile Number", value: user.mobileNumber },
        { label: "Wallet Balance", value: user.walletBalance },
        { label: "Promo Code", value: user.promoCode },
        { label: "Games Played", value: user.gamesPlayed },
        { label: "Games Won", value: user.gamesWon },
        { label: "Active Games", value: user.gamesActive },
        { label: "Games Lost", value: user.gamesLoss }
    ];

    const handleUpiChange = async (e) => {
        e.preventDefault();
        try {
            if (newUpiID.length < 13) {
                throw new Error('Frontend Error: UPI-ID should be a minimum of 14 characters long.');
            }
            const response = await service.put('/user/profile', {
                mobileNumber: mobile,
                otp: otp,
                newUpiID: newUpiID,
            });
            if (response.data.status === "UPI Details Updated") {
                alert("Bank Details changed successfully!");
                setMobile(null);
                setOtp(null);
                setNewUpiID("");
                setConfirmUpiID("");
            } else {
                throw new Error(response.data.error || 'Failed to update UPI details. Please try again.');
            }
        } catch (error) {
            console.error('UPI-ID change failed:', error);
            console.log('service Response:', error.response);
            alert(error.response?.data?.error || error.message || 'Failed to update UPI details. Please try again.');
        }
    };
    const handleLogoutClick = () => {
        logout();
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };
    const handleToggleBankForm = () => {
        setShowBankForm(!showBankForm);
    };
    // const handleToggleMobileForm = () => {
    //     setShowMobileForm(!showMobileForm);
    // };

    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center text-white underline underline-offset-8 italic">Settings</h1>
            <div className="mt-8 w-[90%] md:w-[80%] m-auto">
                <div className="flex justify-center text-lg md:text-xl lg:text-2xl font-semibold w-full mt-16 text-white">
                    My Profile
                </div>
                <div className="py-4 rounded-xl flex justify-center items-center w-auto mx-auto text-white text-center font-bold mt-8 ">
                    <table className="shadow-white shadow-lg text-2xs md:text-base">
                        <tbody>
                            {profileDetails.map((detail, index) => (
                                <tr key={index}>
                                    <td className="bg-black border-2 border-white py-1 sm:py-2 px-10">{detail.label}</td>
                                    <td className="bg-white text-black font-semibold border-t-2  py-1 sm:py-2 border-black px-10">{detail.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                        <div className="flex flex-col mb-4 mx-auto">
                            <label htmlFor="userID" className="mb-2 font-bold text-center">Confirm User-ID</label>
                            <input type="text" id="userID" name="userID" value={userID} onChange={handleUserIDChange} placeholder="It will be fetched automatically"
                                className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 " />
                        </div>
                        <div className="flex flex-col mb-4 mx-auto">
                            <label htmlFor="mobile" className="mb-2 font-bold text-center">Mobile Number</label>
                            <input type="tel" id="mobile" name="mobile" value={mobile} maxLength={10}
                                onChange={handleMobileChange}
                                placeholder="Enter your mobile number"
                                className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 "
                            />
                        </div>
                        <div className="flex flex-col mb-4 mx-auto">
                            <label htmlFor="otp" className="mb-2 font-bold text-center">OTP</label>
                            <input type="number" id="otp" name="otp" value={otp}
                                onChange={handleOtpChange}
                                placeholder="Enter the OTP received on your mobile number" className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 " />
                        </div>
                        <div className="flex flex-col mb-4 mx-auto">
                            <label htmlFor="new_number" className="mb-2 font-bold text-center">New Number</label>
                            <input type="password" id="new_number" maxLength={10} name="new_number" value={newMobileNumber}
                                onChange={handleNewNumberChange}
                                placeholder="Enter new mobile number" className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 " />
                        </div>
                        <div className="flex flex-col mb-4 mx-auto">
                            <label htmlFor="confirm_new_number" className="mb-2 font-bold text-center">Confirm New Number</label>
                            <input type="tel" id="confirm_new_nuber" maxLength={10} name="confirm_new_number" value={newMobileNumber}
                                onChange={handleNewNumberChange && handleConfirmNewNumber}
                                placeholder="Confirm your mobile number" className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 " />
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
            <div className="mt-8 flex flex-col w-[90%] md:w-[60%] lg:w-[50%] mx-auto">
                <div className="w-full">
                    <button onClick={handleToggleBankForm} className="flex items-center mx-auto border-4 text-lg md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        Change UPI Details
                        <MdOutlineArrowDropDownCircle size={35} className="ml-10" />
                    </button>
                </div>
                {showBankForm ? (<form className="mt-8 border-4 p-4 text-white text-xs md:text-sm lg:text-lg rounded-lg shadow-lg shadow-white">
                    <div className="flex flex-col mb-4 mx-auto">
                        <label htmlFor="mobile" className="mb-2 font-bold text-center">Mobile Number</label>
                        <input type="tel" id="mobile" name="mobile" value={mobile}
                            onChange={handleMobileChange}
                            placeholder="Enter your mobile number"
                            className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 "
                        />
                    </div>
                    <div className="flex flex-col mb-4 mx-auto">
                        <label htmlFor="otp2" className="mb-2 font-bold text-center">OTP</label>
                        <input type="number" id="otp2" name="otp2" value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter the OTP received on your mobile number"
                            className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 " />
                    </div>
                    <div className="flex flex-col mb-4 mx-auto">
                        <label htmlFor="new_UPI_ID" className="mb-2 font-bold text-center">New UPI Details</label>
                        <input type="text" id="new_UPI_ID" value={newUpiID} onChange={(e) => setNewUpiID(e.target.value)} name="new_UPI_ID"
                            placeholder="Enter new bank details"
                            className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 " />
                    </div>
                    <div className="flex flex-col mb-4 mx-auto">
                        <label htmlFor="confirm_new_UPI_ID" className="mb-2 font-bold text-center">Confirm New UPI Details</label>
                        <input type="text" id="confirm_new_UPI_ID" value={newUpiID} onChange={(e) => setNewUpiID(e.target.value)} name="confirm_new_UPI_ID" placeholder="Confirm your new bank details"
                            className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 " />
                    </div>
                    {newUpiID !== confirmUpiID && (
                        <div className="text-red-500 text-center mt-1">UPI-ID Mismatch</div>
                    )}
                    {newUpiID === confirmUpiID && (
                        <div className="text-green-500 text-center mt-1">UPI-ID Match</div>
                    )}
                    <div className="flex items-center mb-4  justify-center">
                        <input
                            type="checkbox"
                            id="recaptcha2"
                            name="recaptcha2"
                            checked={recaptcha2}
                            onChange={(e) => setRecaptcha2(e.target.checked)}
                            className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <label htmlFor="recaptcha2" className="font-medium text-blue-500 underline underline-offset-2">I'm not a robot</label>
                    </div>
                    <div className="flex justify-center text-2xs md:text-sm font-semibold">
                        <button type="button" onClick={handleUpiChange} disabled={!mobile || !otp || !recaptcha2 || !newUpiID || !confirmUpiID}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded ${!mobile || !otp || !recaptcha2 || !newUpiID || !confirmUpiID ? "opacity-50 cursor-not-allowed" : ""}`}>
                            Submit
                        </button>
                    </div>
                </form>) : (<></>)}
            </div>
            <div className="mt-8 text-white w-[90%] md:w-[60%] lg:w-[50%] flex flex-col  mx-auto">
                <div className="w-full">
                    <button onClick={handleToggleForm} className="flex items-center mx-auto border-4 text-lg md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        Password
                        <MdOutlineArrowDropDownCircle size={35} className="ml-10" />
                    </button>
                </div>
                {showForm ? (<form className="mt-8 border-4 p-4 text-xs md:text-sm lg:text-lg rounded-lg shadow-lg shadow-white">
                    <div className="flex flex-col mb-4 mx-auto">
                        <label htmlFor="mobile" className="mb-2 font-bold text-center">Mobile Number</label>
                        <input type="tel" id="mobile" name="mobile" value={mobile}
                            onChange={handleMobileChange}
                            placeholder="Registered mobile number"
                            className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 "
                        />
                    </div>
                    <div className="flex flex-col mb-4 mx-auto">
                        <label htmlFor="otp3" className="mb-2 font-bold text-center">OTP</label>
                        <input type="number" id="otp3" name="otp3" value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter OTP Received"
                            className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 " />
                    </div>
                    <div className="flex flex-col mb-4 mx-auto">
                        <label htmlFor="mobile" className="mb-2 font-bold text-center">New Password</label>
                        <div className=" flex w-full justify-center items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                placeholder="Enter new Password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 "
                                name="newPassword"
                                id="newPassword"
                                maxLength={16}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="ml-2"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4 mx-auto">
                        <label htmlFor="mobile" className="mb-2 font-bold text-center">Confirm New Password</label>
                        <div className=" flex justify-center items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                placeholder="Confirm New Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border border-white bg-black text-white font-semibold mx-auto px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center w-auto md:w-1/2 "
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                maxLength={16}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="ml-2"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    {newPassword !== confirmPassword && (
                        <div className="text-red-500 text-center mt-1">Passwords do not match</div>
                    )}
                    {newPassword === confirmPassword && (
                        <div className="text-green-500 text-center mt-1">Passwords match</div>
                    )}
                    <div className="flex items-center my-4  justify-center">
                        <input
                            type="checkbox"
                            id="recaptcha3"
                            name="recaptcha3"
                            checked={recaptcha3}
                            onChange={(e) => setRecaptcha3(e.target.checked)}
                            className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <label htmlFor="recaptcha3" className="font-medium text-blue-500 underline underline-offset-2">I'm not a robot</label>
                    </div>
                    <div className="flex justify-center text-2xs md:text-sm font-semibold">
                        <button type="button" onClick={handlePasswordChange} disabled={!mobile || !otp || !newPassword || !recaptcha3 || !confirmPassword}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded ${!mobile || !otp || !newPassword || !recaptcha3 || !confirmPassword ? "opacity-50 cursor-not-allowed" : ""}`}>
                            Submit
                        </button>
                    </div>
                </form>) : (<></>)}
            </div>
            <div className="mt-8 flex justify-center text-2xs md:text-sm lg:text-base">
                <button type="button" onClick={handleLogoutClick} className="bg-red-600 w-auto hover:bg-red-700 text-white font-bold p-2 md:p-2 rounded-lg flex items-center">
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