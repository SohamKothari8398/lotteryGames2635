import React, { useState, useEffect } from 'react'
import { IoMdClock } from "react-icons/io";
import { BiSolidWalletAlt, BiUserCircle } from 'react-icons/bi';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { useAuthContext } from '../../hooks/useAuthContext';
import GetWalletBalance from '../UsersPanel/WalletBalance';
import { useService } from '../../hooks/useService';

const gameTimer = 300;

function formatTimer(seconds) {
    // const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    // const daysStr = String(days).padStart(2, '0');
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(remainingSeconds).padStart(2, '0');
    // return `${daysStr}:${hoursStr}:${minutesStr}:${secondsStr}`;
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}
function Form() {
    const { user } = useAuthContext();
    const service = useService()
    const [countdownTimer, setCountdownTimer] = useState(0);
    const [cooldown, setCooldown] = useState(10);
    const [showRules, setShowRules] = useState(false);
    const [counter, setCounter] = useState(1);
    let [betCount, setBetCount] = useState(0);
    const [number, setNumber] = useState(0);
    const [betAmount, setBetAmount] = useState(0);
    const [rewardAmount] = useState(0);
    // const [totalAmountBet, setTotalAmountBet] = useState(0);
    const userID = user.userID;

    const handleSubmitBet = async (e) => {
        e.preventDefault();
        if (betAmount > user.walletBalance || user.walletBalance === 0) {
            alert('Insufficient Wallet Balance.\nPlease Recharge Your Wallet...');
        } else if (number > -1 && number < 10 && betAmount > 99) {
            setBetCount((prevCount) => prevCount + 1);
            // setTotalAmountBet((prevAmount) => (prevAmount + betAmount));
            console.log(userID, number, betAmount);
            const response = await service.post("/games/singleDigitLottery/createBet", {
                userID: user.userID,
                betNumber: number,
                betAmount: betAmount,
            })
            if (response.data.status === "Bet Placed") {
                alert(`Bet Submitted.\nCheck the Active Bets Table.`);
            }
        } else {
            alert('Please select a number between 0 to 9. \nMinimum Bet Amount = 100.');
        }
    }

    const handleShowRules = () => {
        setShowRules(!showRules);
    }
    const handleNumberClick = (value) => {
        setNumber(parseInt(value, 10));
    }
    const handleBetClick = (value) => {
        setBetAmount(parseInt(value, 10));
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (countdownTimer === 0) {
                setCounter((prevCounter) => prevCounter + 1);
                setBetCount(0);
                setCountdownTimer(gameTimer);
                setCooldown(10);
            } else if (cooldown !== 0) {
                setCooldown((prevCooldown) => prevCooldown - 1);
            } else {
                setCountdownTimer((prevCountdown) => prevCountdown - 1);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [countdownTimer, cooldown, userID, number, betAmount, counter]);

    return (
        <div className="px-4 pb-10 flex flex-col items-center">
            <div className="text-2xl md:text-4xl font-bold text-center mt-28 text-white underline underline-offset-8 italic mb-10">Single Digit Lottery</div>
            <div className="fixed w-full text-white bg-black/70 h-auto p-2 rounded-xl border-4 overflow-x-auto md:overflow-hidden ">
                <div className="w-auto md:w-full h-auto text-xs md:text-sm grid grid-cols-4 overflow-x-auto md:overflow-hidden gap-32 md:gap-10">
                    <div className={`p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center
                    ${countdownTimer === 0 ? 'text-white' : 'text-green-500'}`}>
                        <div>Game Timer</div>
                        <div className='flex items-center mt-2'><IoMdClock size={30} className='mr-2' />{formatTimer(countdownTimer)}</div>
                    </div>
                    {/* <div className={`p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center
                   ${cooldown !== 0 ? 'text-red-700' : 'text-white'}`}>
                        <div>Lock Timer</div>
                        <div className='flex items-center mt-2'><MdLockClock size={30} className='mr-2' />{formatTimer(cooldown)}</div>
                    </div> */}
                    {/* <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center">
                        <div>Total Bet</div>
                        <div>Rs.{totalAmountBet}</div>
                    </div> */}
                    <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex text-center justify-center align-items-center items-center">
                        <BiUserCircle size={30} className='mr-2' />{userID}
                    </div>
                    <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex text-center justify-center align-items-center items-center">
                        <BiSolidWalletAlt size={30} />
                        <GetWalletBalance />
                    </div>
                    <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center">
                        <div>Reward</div>
                        <div>Rs.{rewardAmount}</div>
                    </div>
                    {/* <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center">
                        <div>Max Bets</div>
                        <div>{maxBet}</div>
                    </div> */}
                </div>
            </div>


            <div className=' items-center mb-10 border-4 py-2 grid grid-cols-1 w-auto lg:w-[50%] h-auto text-center rounded-xl text-white font-bold shadow-red-600 shadow-lg'>
                <div className="text-center w-full font-semibold bg-black text-white rounded-xl text-lg md:text-xl underline underline-offset-4">Place Your Bets</div>
                <div className="mx-2 p-2 bg-black rounded-lg w-auto h-auto flex flex-col">
                    <div className='grid grid-cols-3 gap-4 justify-center text-black text-xs md:text-xl lg:text-2xl items-center my-4 py-2'>
                        <div className='text-white flex flex-col w-full shadow-lg shadow-red-600 rounded-lg'>
                            <div className=' text-sm md:text-base'>Bet Number</div>
                            <select
                                name="betNumber"
                                value={number}
                                onChange={(e) => handleNumberClick(e.target.value)}
                                className='p-2 m-2 text-center font-semibold rounded-lg bg-red-800 text-black shadow-md shadow-white'>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                        <div className='text-white flex flex-col w-full shadow-lg shadow-red-600 rounded-lg'>
                            <div className=' text-sm md:text-base'>Bet Amount</div>
                            <select
                                name="betAmount"
                                value={betAmount}
                                onChange={(e) => handleBetClick(e.target.value)}
                                className='p-2 m-2 text-center font-semibold rounded-lg bg-green-800 text-black shadow-md shadow-white'>
                                <option value="no-value">Select Value</option>
                                <option value="100">100</option>
                                <option value="250">250</option>
                                <option value="500">500</option>
                                <option value="750">750</option>
                                <option value="1000">1000</option>
                            </select>
                        </div>
                        <div className='text-white flex flex-col w-full shadow-lg shadow-red-600 rounded-lg'>
                            <div className=' text-sm md:text-base'>Custom Bet</div>
                            <div className='w-auto'>
                                <input type='number' onChange={(e) => setBetAmount(parseInt(e.target.value, 10))}
                                    value={betAmount} placeholder='100, 200, 300, 500, etc.'
                                    className='p-2 m-2 w-10/12 md:w-11/12 text-center font-semibold rounded-lg bg-blue-800 text-black shadow-md shadow-white' />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mx-2 p-2 rounded-lg bg-black w-auto h-auto flex items-center">
                        <div className='w-full my-auto border-white text-sm md:text-base rounded-md'>Custom Bet</div>
                        <div className="rounded-lg grid grid-cols-5 gap-2 md:gap-4 w-full mx-auto h-auto text-xs md:text-xl text-white px-2 border-white">
                            <div value={100} onClick={() => handleBetClick(100)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white hover:bg-green-500'>100</div>
                            <div value={250} onClick={() => handleBetClick(250)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>250</div>
                            <div value={500} onClick={() => handleBetClick(500)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>500</div>
                            <div value={750} onClick={() => handleBetClick(750)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>750</div>
                            <div value={1000} onClick={() => handleBetClick(1000)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg shadow-md shadow-white  hover:bg-green-500'>1000</div>
                        </div> 
                        <div className='w-10/12 mx-auto h-12 border-4 rounded-xl'>
                            <input type='number' onChange={(e) => setBetAmount(parseInt(e.target.value, 10))} value={betAmount} placeholder='100, 200, 300, 500, etc.' className="bg-white w-full h-full text-center font-bold rounded-lg text-black" />
                        </div>
                    </div> */}
                <div className='w-auto h-auto text-xs md:text-base my-2 mb-4'>
                    <div onClick={handleSubmitBet} className={`bg-blue-700 w-[70%] md:w-1/4 border-2 shadow-md hover:scale-125 shadow-white border-white p-1 rounded-lg h-auto flex flex-col cursor-pointer mx-auto ${betCount < 1 ? '' : 'hidden'}`}>
                        Place Bet
                    </div>
                    <div onClick={handleSubmitBet} className={`bg-blue-700 w-[70%] md:w-1/4 border-2 shadow-md hover:scale-125 shadow-white border-white p-1 rounded-lg h-auto flex flex-col cursor-pointer mx-auto ${betCount >= 1 ? '' : 'hidden'}`}>
                        Place More Bets
                    </div>
                </div>
                <div className="bg-black mx-2 p-1 rounded-lg w-auto h-auto flex flex-col">
                    <div onClick={handleShowRules} className='border-white text-sm rounded-md flex w-full cursor-pointer justify-center align-content-center '>Rules <MdArrowDropDownCircle size={20} className='ml-4' /></div>
                    {showRules ? (
                        <div>
                            <div className='border-white text-sm rounded-md'>1. Select a Number from 0 to 9</div>
                            <div className='border-white text-sm rounded-md mt-2'>2. Minimum Bet Amount is 100</div>
                        </div>
                    ) : (<></>)
                    }
                    {/* <div className="rounded-lg grid grid-cols-5 text-2xl h-auto w-auto md:grid-cols-10 lg:grid-cols-10 text-black py-4 px-8">
                            <div value={0} onClick={() => handleNumberClick(0)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>0</div>
                            <div value={1} onClick={() => handleNumberClick(1)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>1</div>
                            <div value={2} onClick={() => handleNumberClick(2)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>2</div>
                            <div value={3} onClick={() => handleNumberClick(3)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>3</div>
                            <div value={4} onClick={() => handleNumberClick(4)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>4</div>
                            <div value={5} onClick={() => handleNumberClick(5)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>5</div>
                            <div value={6} onClick={() => handleNumberClick(6)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>6</div>
                            <div value={7} onClick={() => handleNumberClick(7)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>7</div>
                            <div value={8} onClick={() => handleNumberClick(8)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>8</div>
                            <div value={9} onClick={() => handleNumberClick(9)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-10 md:h-12'>9</div>
                        </div> */}
                </div>
            </div>
        </div >
    )
}

export default Form; 