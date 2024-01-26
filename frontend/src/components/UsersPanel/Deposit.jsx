import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaWindowClose, FaWallet } from 'react-icons/fa';
import upiMiniLogo from '../../assets/upi-logo-mini.png';
import netBankMiniLogo from '../../assets/netBanking_Logo_mini.png';
import phonePeMiniLogo from '../../assets/phonePe_logo_mini.png';
import paytmLogoMini from '../../assets/paytm_Logo_mini.png';
import upilogo from '../../assets/upi-logo.jpg';
import gpayLogo from '../../assets/g-pay_logo.jpg';
import paytmLogo from '../../assets/paytm_logo.jpg';
import whatsappPay from '../../assets/whatsappPay_logo.png';
import amazonPay_logo from '../../assets/amazonPay_logo.jpg';
import netBanking_Logo from '../../assets/netBanking_Logo.png';
import card_payments from '../../assets/Visa_Inc._logo.png';
import card_payments2 from '../../assets/MasterCard_Logo.png';
import phonepe from '../../assets/phonePe-logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from "axios";
import GetWalletBalance from '../UsersPanel/WalletBalance';

function Deposit() {
    const { user } = useAuthContext();
    const [amount, setAmount] = useState(0);
    const [otp, setOtp] = useState(0);
    const [activeButton, setActiveButton] = useState(null);
    const navigate = useNavigate();

    const handleAmountClick = (selectedAmount) => {
        // console.log(selectedAmount);
        setAmount(selectedAmount);
        setActiveButton(selectedAmount);
    };

    const navigateToUserHome = () => {
        navigate(-1);
    };
    const handleChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!user || !amount) {
                alert("All fields are required");
                return;
            }

            const response = await axios.post("/deposit", {
                userID: user.userID,
                mobileNumber: user.mobileNumber,
                otp,
                amount,
            });

            if (response.status === 200) {
                alert(`Depositing amount: ${amount}`);
                setAmount(0);
                setOtp(0);
            } else {
                alert('Failed to Deposit. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-auto bg-black/40 flex justify-center items-center z-20">
            <div className="bg-slate-600 absolute w-full h-auto mx-auto py-10 rounded-lg top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                <div className="flex flex-col items-center w-[90%] lg:w-4/5 h-auto bg-white shadow-lg  shadow-slate-900  rounded-lg border-4 border-slate-900">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-slate-900 font-bold text-3xl md:text-4xl lg:text-5xl ">
                            Add Funds
                        </div>
                        <a href="#" className="text-blue-500 mt-8 text-sm ml-2 underline">
                            LEARN HOW
                        </a>
                    </div>
                    <h1 className="text-xl font-bold flex text-black mb-4">Wallet Balance =  <GetWalletBalance /> </h1>
                    <form onSubmit={handleSubmit} className='w-full'>
                        <div className="grid text-white h-auto w-[90%] md:w-3/4 lg:w-1/2 mx-auto rounded-lg border-4 border-black p-2">
                            <div className="flex mt-2 items-center mb-4 text-black">
                                <span className="text-gray-900 pr-3 font-bold text-sm">Amount (in INR) ₹.</span>
                                <input
                                    type="number"
                                    className="w-1/2 mr-4 text-white bg-black rounded-md p-2"
                                    value={amount}
                                    onChange={handleChange}
                                    placeholder="Enter Amount"
                                />
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 items-center mb-4">
                                <button type="button" onClick={() => handleAmountClick(100)}
                                    className={`text-sm text-white m-2 px-2 py-2 rounded-md bg-slate-700 ${activeButton === 100 ? 'bg-teal-500' : ''}`}>+₹100 </button>
                                <button type="button" onClick={() => handleAmountClick(500)}
                                    className={`text-sm text-white m-2 px-2 py-2 rounded-md bg-slate-700 ${activeButton === 500 ? 'bg-green-400' : ''}`}>+₹500 </button>
                                <button type="button" onClick={() => handleAmountClick(1000)}
                                    className={`text-sm text-white m-2 px-2 py-2 rounded-md bg-slate-700 ${activeButton === 1000 ? 'bg-emerald-500' : ''}`}>+₹1000 </button>
                                <button type="button" onClick={() => handleAmountClick(10000)}
                                    className={`text-sm text-white m-2 px-2 py-2 rounded-md bg-slate-700 ${activeButton === 10000 ? 'bg-yellow-600' : ''}`}>+₹10000</button>
                            </div>
                        </div>
                        {/* <div className="grid text-white h-auto w-[90%] md:w-3/4 lg:w-1/2 mx-auto rounded-lg border-4 border-black p-2">
                            <div className="flex mt-2 items-center mb-4 text-black">
                                <span className="font-bold text-sm">OTP</span>
                                <input type="number" name="userotp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className='m-auto mt-2 rounded-lg h-8 text-center text-white w-[70%] bg-black p-4 border-2' id="userotp"
                                    maxLength={8}
                                    placeholder='12345678, 10000000, ...' />
                            </div>
                        </div> */}
                        <div className='flex m-4 justify-center'>
                            <button onClick={handleSubmit} className="hover:bg-green-500 bg-slate-900 shadow-lg shadow-blue-900 text-white m-2 px-4 py-2 rounded-md">
                                Deposit Funds
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col w-[90%] md:w-3/4 lg:w-1/2 mx-auto justify-between items-center mb-4">
                        <div className="text-gray-900 font-bold mt-2 mr-2">Payment Methods </div>
                        <div className="grid grid-cols-5 text-white h-[18vh] w-[90%] mx-auto overflow-x-auto rounded-lg border-4 border-black m-4 p-4">
                            {/* <FcGoogle size={30} className='mr-2' /> */}
                            {/* <img src={upiMiniLogo} className='w-10 h-8 bg-white mr-2' alt="Upi Logo" />
                                <img src={phonePeMiniLogo} className='w-20 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" />
                                <img src={paytmLogoMini} className='w-20 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" />
                                <img src={netBankMiniLogo} className='w-10 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" /> */}
                            <img src={upilogo} alt='Upi Payments' className='mr-2  mb-2 border-2 rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            <img src={gpayLogo} alt='Upi Payments' className='mr-2 mb-2 bg-white border-2 rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            <img src={phonepe} alt='Upi Payments' className='mr-2 mb-2  border-2 rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            <img src={paytmLogo} alt='Upi Payments' className='mr-2 bg-white border-2 rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            <img src={amazonPay_logo} alt='Upi Payments' className='mr-2 border-2 rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            <img src={whatsappPay} alt='Upi Payments' className='mr-2 border-2 rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            <img src={netBanking_Logo} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            <img src={card_payments} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            <img src={card_payments2} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg' style={{ width: '7rem', height: '3rem' }} />
                            {/* <img src={card_payments3} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg' style={{ width: '7rem', height: '3rem' }} /> */}
                            {/* <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md">
                                    <FcGoogle size={30} className='mr-2' /> 1234567890@oksbi
                                </button>
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md">
                                    <img src={upiMiniLogo} className='w-10 h-8 bg-white mr-2' alt="Upi Logo" />1234567890@upi
                                </button>
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md">
                                    <img src={phonePeMiniLogo} className='w-10 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" />1234567890@phonepe
                                </button>
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md">
                                    <img src={paytmLogoMini} className='w-10 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" />1234567890@paytm
                                </button>
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md ">
                                    <img src={netBankMiniLogo} className='w-10 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" /> Bank
                                </button> */}
                        </div>
                    </div>
                    <button onClick={navigateToUserHome} className="absolute rounded-lg top-4 right-5 z-10">
                        <FaWindowClose size={30} className='text-red-600 shadow-md shadow-slate-900 bg-white rounded-lg' />
                    </button>
                </div>
            </div >
        </div >
    );
};

export default Deposit;