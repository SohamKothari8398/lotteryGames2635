import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';

function UserOffers() {

    const [showDepositHistory, setshowDepositHistory] = useState('');
    const [showWithdrawHistory, setshowWithdrawHistory] = useState('');
    const navigate = useNavigate();

    const navigateToUserHome = () => {
        navigate(-1);
    }

    return (
        <div className="fixed top-0 left-[-1rem] right-0 bottom-0 flex flex-col bg-slate-900 items-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center mt-12 text-white italic">Offers</h1>
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-center mt-12 text-white">Recent Offer : CountDown Timer</div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 text-center text-white font-bold mt-8">
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Offer Code</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">Diwali10</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Discount Percent</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4 ">10%</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Game Name</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">Single Digit Lottery</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Max Usage Limit</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">1000</div>
                </div>
                <button onClick={navigateToUserHome} className="absolute text-red-500 rounded-lg bg-white top-2 right-4 z-10 ">
                    <FaWindowClose size={30} className='shadow-lg shadow-red-500' />
                </button>
            </div>
        </div >
    )
}

export default UserOffers;