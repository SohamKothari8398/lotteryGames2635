import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useService } from '../../hooks/useService';

function UserReport() {
    const service = useService()
    const [showDepositHistory, setshowDepositHistory] = useState('');
    const [showWithdrawHistory, setshowWithdrawHistory] = useState('');
    const navigate = useNavigate();

    const navigateToUserHome = () => {
        navigate('/user/home');
    }

    const handleshowDepositHistory = () => {
        setshowDepositHistory(!showDepositHistory);
    }

    const handleshowWithdrawHistory = () => {
        setshowWithdrawHistory(!showWithdrawHistory);
    }

    return (
        <div className="fixed top-0 left-[-1rem] right-0 bottom-0 flex flex-col bg-slate-900 items-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center mt-12 text-white underline underline-offset-8 italic">My Report</h1>
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-center mt-12 text-white">Analytics</div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 text-center text-white font-bold mt-8">
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Wallet Balance(in INR)</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2">10000</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Total Games Played</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4 ">10000</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Games Won</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">2500</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Active Games</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">2500</div>
                </div>
            </div>
            <div className="w-full flex flex-col text-white items-center">
                <div onClick={handleshowDepositHistory} className="text-center font-semibold  bg-black rounded-lg text-md md:text-lg lg:text-xl p-4 my-4 flex flex-row">My Active Games Report<MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                {showDepositHistory ? (<div>
                    1. Active games reports
                </div>) : (<></>)}
            </div>
            <div className="w-full flex flex-col text-white items-center">
                <div onClick={handleshowWithdrawHistory} className="text-center font-semibold  bg-black rounded-lg text-md md:text-lg lg:text-xl p-4 my-4 flex flex-row">My Games History<MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                {showWithdrawHistory ? (<div>
                    1. History of games and bets
                </div>) : (<></>)}
            </div>
            <button onClick={navigateToUserHome} className="absolute text-red-500 rounded-lg bg-white top-2 right-4 z-10 ">
                <FaWindowClose size={30} className='shadow-lg shadow-red-500' />
            </button>
        </div >
    )
}

export default UserReport;