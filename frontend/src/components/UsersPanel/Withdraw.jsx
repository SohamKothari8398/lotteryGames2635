import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import upilogo from '../../assets/upiLogo.jpg';
import gpayLogo from '../../assets/gpayLogo.png';
import paytmLogo from '../../assets/paytm_logo.png';
import whatsappPay from '../../assets/whatsappPay_logo.png';
import amazonPay_logo from '../../assets/amazonPay_logo.jpg';
import netBanking_Logo from '../../assets/netBanking_Logo.png';
import card_payments from '../../assets/Visa_Inc._logo.png';
import card_payments2 from '../../assets/MasterCard_Logo.png';
import phonepe from '../../assets/phonePe-logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import GetWalletBalance from '../UsersPanel/WalletBalance';
import { useService } from '../../hooks/useService';

function Withdraw() {
    const { user } = useAuthContext();
    const service = useService();
    const [amount, setAmount] = useState(0);
    const [otp, setOtp] = useState(0);
    const navigate = useNavigate();
    const navigateToUserHome = () => {
        navigate(-1);
    };
    const handleWithdrawClick = async (e) => {
        e.preventDefault();
        try {
            if (!user || !amount) {
                alert("All fields are required");
                return;
            }
            if (amount > user.walletBalance) alert("Invalid Request!!\nInsufficient Account Balance!!");
            const response = await service.post("/withdraw", {
                userID: user.userID,
                mobileNumber: user.mobileNumber,
                otp,
                amount,
            });
            if (response.status === 200) {
                alert(`Withdrawing amount: ${amount}`);
                setAmount(0);
                setOtp(0);
            } else {
                alert('Failed to Withdraw. Please try again.');
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
        <div className="fixed top-0 left-0 right-0 bottom-0  w-full h-full bg-black/50 flex justify-center items-center z-20">
            <div className="bg-slate-600 absolute w-full m-auto rounded-lg top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                <div className="flex flex-col items-center p-4 bg-white shadow-lg border-4 border-black w-[80%] h-auto shadow-slate-900  rounded-lg">
                    <h1 className="text-slate-900 font-bold text-3xl md:text-4xl lg:text-5xl">Withdraw</h1>
                    <h1 className="text-xl font-bold flex text-black mt-4 mb-4">Wallet Balance = <GetWalletBalance /> </h1>
                    <form className='w-full'>
                        <div className="flex items-center text-white h-auto w-[90%] md:w-3/4 lg:w-1/2 mx-auto rounded-lg border-4 border-black p-2">
                            <label htmlFor='withdrawAmount' className="text-gray-900  w-auto pr-3 font-bold text-xl">₹.</label>
                            <input
                                type="number"
                                id='withdrawAmount'
                                name='withdrawAmount'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className=" mr-4 text-white w-full bg-black rounded-md p-2"
                                placeholder="Enter Amount"
                            />
                        </div>
                        <div className="grid text-white h-auto w-[90%] md:w-3/4 lg:w-1/2 mx-auto rounded-lg border-4 border-black p-2">
                            <div className="flex mt-2 items-center mb-4 text-black">
                                <span className="font-bold text-sm">OTP</span>
                                <input type="number" name="userotp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className='m-auto mt-2 rounded-lg h-8 text-center text-white w-[70%] bg-black p-4 border-2' id="userotp"
                                    maxLength={8}
                                    placeholder='12345678, 10000000, ...' />
                            </div>
                        </div>
                        <div className='text-xs text-center font-medium'>
                            <a href="/user/home" className="text-blue-500 underline">
                                Read the policy before withdrawing
                            </a>
                        </div>
                        {/* <div className="flex flex-col text-black m-2 items-center text-center font-bold h-auto w-full md:w-3/4 lg:w-1/2 mx-auto rounded-lg p-2">
                            Confirm Bank Details
                            <div className="grid text-white h-[18vh] w-[94%] mx-auto rounded-lg overflow-x-auto border-4 border-black m-4 p-4">
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md border-4 border-black">
                                    <FcGoogle size={30} className='mr-2' /> 1234567890@GPay
                                </button>
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md border-4 border-black">
                                    <img src={phonePeMiniLogo} className='w-10 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" />1234567890@PhonePe
                                </button>
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md border-4 border-black">
                                    <img src={paytmLogoMini} className='w-10 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" />1234567890@Paytm
                                </button>
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md border-4 border-black">
                                    <img src={upiMiniLogo} className='w-10 h-8 bg-white mr-2' alt="Upi Logo" />1234567890@UPI
                                </button>
                                <button type="button" className="bg-slate-900 w-auto text-sm md:text-lg items-center hover:bg-green-500 flex m-2 px-4 py-2 rounded-md border-4 border-black">
                                    <img src={netBankMiniLogo} className='w-10 h-10 bg-white mr-2 rounded-md' alt="Upi Logo" /> Bank
                                </button>
                            </div>
                        </div> */}
                        <p className="text-red-300 mb-4 text-xs text-center underline">
                            It takes 1-2 days to transfer your funds
                        </p>
                        <div onClick={handleWithdrawClick} className="flex justify-center">
                            <button type="submit" className="hover:bg-green-500 bg-slate-900 shadow-lg shadow-blue-900 text-white m-2 px-4 py-2 rounded-md">
                                Withdraw
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
                </div>
                <button onClick={navigateToUserHome} className="absolute rounded-lg top-4 right-5 z-10">
                    <FaWindowClose size={30} className='text-red-600 shadow-md shadow-slate-900 bg-white rounded-lg' />
                </button>
            </div>
        </div>
    );
};

export default Withdraw;