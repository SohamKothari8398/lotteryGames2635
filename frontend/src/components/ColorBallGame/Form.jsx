import React, { useState, useEffect } from 'react'
import { IoMdClock } from "react-icons/io";
import { BiSolidWalletAlt, BiUserCircle } from 'react-icons/bi';
import { MdLockClock, MdArrowDropDownCircle } from 'react-icons/md';
import { useAuthContext } from '../../hooks/useAuthContext';
import GetWalletBalance from '../UsersPanel/WalletBalance';
import { useService } from '../../hooks/useService';

const gameTimer = 600;
let totalRewardAmount = 0;

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
    const service = useService();
    const { user } = useAuthContext();
    const [countdownTimer, setCountdownTimer] = useState(0); // Initially 10 seconds
    const [cooldown, setCooldown] = useState(10);
    const [number, setNumber] = useState(0);
    const [selectColor, setSelectColor] = useState('No Color');
    const [rewardAmount, setRewardAmount] = useState(0);
    const [betAmount, setBetAmount] = useState(0);
    const [counter, setCounter] = useState(1);
    let [betCount, setBetCount] = useState(0);
    // const [totalAmountBet, setTotalAmountBet] = useState(0);
    const userID = user.userID;
    const [showRules, setShowRules] = useState(false);

    const handleShowRules = () => {
        setShowRules(!showRules);
    }
    const handleNumberClick = (value) => {
        setNumber(parseInt(value, 10));
    }
    const handleBetClick = (value) => {
        setBetAmount(parseInt(value, 10));
    }

    const handleSubmitBet = async (e) => {
        e.preventDefault();
        if (betAmount > user.walletBalance || user.walletBalance === 0) {
            alert('Insufficient Wallet Balance.\nPlease Recharge Your Wallet...');
        } else if (number > 0 && number < 37 && betAmount > 99) {
            setBetCount((prevCount) => prevCount + 1);
            // setTotalAmountBet((prevAmount) => (prevAmount + betAmount));
            console.log(userID, number, betAmount);
            const response = await service.post("/games/colorBallLottery/createBet", {
                userID: userID,
                betNumber: number,
                betColor: selectColor,
                betAmount: betAmount,
            })
            if (response.data.status === "Bet Placed") {
                alert(`Bet Submitted.\nCheck the Active Bets Table.`);
            }
        } else {
            alert('Please select a number between 1 to 36 and a valid colour from the options. \n Minimum Bet Amount = 100.');
        }
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
    }, [countdownTimer, cooldown, userID, number, betAmount]);

    return (
        <div className="px-4 pb-10 flex flex-col items-center">
            <div className="text-2xl md:text-4xl font-bold text-center mt-28 text-white underline underline-offset-8 italic mb-10">Color Ball Game</div>
            <div className="fixed w-full text-white bg-black/70 h-auto p-2 rounded-xl border-4 overflow-x-auto md:overflow-hidden ">
                <div className="w-auto md:w-full h-auto text-xs md:text-sm grid grid-cols-4 overflow-x-auto md:overflow-hidden gap-32 md:gap-10">
                    <div className={`p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center
                    ${countdownTimer === 0 ? 'text-white' : 'text-green-500'}`}>
                        <div>Game Timer</div>
                        <div className='flex items-center mt-2'><IoMdClock size={30} className='mr-2' />{formatTimer(countdownTimer)}</div>
                    </div>
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
                                className='p-2 m-2 text-center font-semibold rounded-lg bg-white text-black shadow-md shadow-white'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                            </select>
                        </div>
                        <div className='text-white flex flex-col w-full shadow-lg shadow-red-600 rounded-lg'>
                            <div className=' text-sm md:text-base'>Bet Amount</div>
                            <select
                                name="betAmount"
                                value={betAmount}
                                onChange={(e) => handleBetClick(e.target.value)}
                                className='p-2 m-2 text-center font-semibold rounded-lg bg-white text-black shadow-md shadow-white'>
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
                                    className='p-2 m-2 w-10/12 md:w-11/12 text-center font-semibold rounded-lg bg-white text-black shadow-md shadow-white' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-2 mb-4 p-2 bg-black rounded-lg w-auto h-auto flex flex-col shadow-lg shadow-red-600">
                    <div className="text-center w-full font-semibold bg-black text-white rounded-xl text-lg md:text-xl underline underline-offset-4">Bet Colour</div>
                    <div className="rounded-lg grid grid-cols-5 gap-4 md:gap-8 text-md md:text-xl mx-auto w-full md:w-7/12 my-4 text-white">
                        <div value={'Red'} onClick={() => setSelectColor('Red')} className='flex justify-center cursor-pointer items-center p-1 border-white bg-red-700  font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>R</div>
                        <div value={'Blue'} onClick={() => setSelectColor('Blue')} className='flex justify-center items-center cursor-pointer p-1 border-white bg-blue-800 font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>B</div>
                        <div value={'Green'} onClick={() => setSelectColor('Green')} className='flex justify-center items-center cursor-pointer p-1 border-white bg-green-700 font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>G</div>
                        <div value={'Yellow'} onClick={() => setSelectColor('Yellow')} className='flex justify-center items-center cursor-pointer p-1 border-white bg-yellow-500 font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>Y</div>
                        <div value={'Purple'} onClick={() => setSelectColor('Purple')} className='flex justify-center items-center cursor-pointer p-1 border-white bg-purple-800 font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>P</div>
                    </div>
                </div>
                <div className='w-auto h-auto text-xs md:text-base my-2 mb-4'>
                    <div onClick={handleSubmitBet} className={`bg-blue-700 w-[70%] md:w-1/2 border-2 shadow-md hover:scale-125 shadow-white border-white p-1 rounded-lg h-auto flex flex-col cursor-pointer mx-auto ${betCount < 1 ? '' : 'hidden'}`}>
                        Place Bet
                    </div>
                    <div onClick={handleSubmitBet} className={`bg-blue-700 w-[70%] md:w-1/2 border-2 shadow-md hover:scale-125 shadow-white border-white p-1 rounded-lg h-auto flex flex-col cursor-pointer mx-auto ${betCount >= 1 ? '' : 'hidden'}`}>
                        Place More Bets
                    </div>
                </div>
                <div className="bg-black mx-2 p-1 rounded-lg w-auto h-auto flex flex-col">
                    <div onClick={handleShowRules} className='border-white text-sm rounded-md flex w-full cursor-pointer justify-center align-content-center '>Rules <MdArrowDropDownCircle size={20} className='ml-4' /></div>
                    {showRules ? (
                        <div className='border-2 border-red-700 rounded-lg'>
                            <div className='border-white text-sm rounded-md'>1. Select a Number from 1 to 36</div>
                            <div className='border-white text-sm rounded-md mt-2'>2. Minimum Bet Amount is 100</div>
                            <div className='border-white text-sm rounded-md mt-2'>3. Select a colour from the colour options</div>
                        </div>
                    ) : (<></>)
                    }
                </div>
            </div>
        </div >
    )
}

export default Form; 