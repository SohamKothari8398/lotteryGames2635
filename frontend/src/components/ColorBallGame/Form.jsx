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

    const handleBetClick = (value) => {
        setBetAmount(value);
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
        <div className="px-4 pb-10 flex flex-col bg-blue-900 items-center">
            <div className="text-2xl md:text-4xl font-bold text-center mt-28 text-white underline underline-offset-8 italic mb-10">ColorBall Lottery Game</div>
            <div className="fixed w-full text-white bg-black/70 h-auto p-2 rounded-xl border-4 overflow-x-auto md:overflow-hidden ">
                <div className="w-auto md:w-full h-auto text-xs md:text-sm grid grid-cols-5 overflow-x-auto md:overflow-hidden gap-32 md:gap-10">
                    <div className={`p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center
                    ${countdownTimer === 0 ? 'text-white' : 'text-green-500'}`}>
                        <div>Game Timer</div>
                        <div className='flex items-center mt-2'><IoMdClock size={30} className='mr-2' />{formatTimer(countdownTimer)}</div>
                    </div>
                    <div className={`p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center
                   ${cooldown !== 0 ? 'text-red-700' : 'text-white'}`}>
                        <div>Lock Timer</div>
                        <div className='flex items-center mt-2'><MdLockClock size={30} className='mr-2' />{formatTimer(cooldown)}</div>
                    </div>
                    {/* <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center">
                        <div>Total Bet</div>
                        <div>Rs.{totalAmountBet}</div>
                    </div> */}
                    <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex text-center justify-center align-items-center items-center">
                        <BiUserCircle size={30} className='mr-2' />{userID}
                    </div>
                    <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex text-center justify-center align-items-center items-center">
                        <BiSolidWalletAlt size={30} className='mr-2' />
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
            {/* <nav className="fixed w-full text-white left-0 right-0 bottom-0 bg-black/70 h-[5rem] border-4 rounded-xl">
                <div className="w-auto md:w-full h-auto text-xs md:text-sm grid grid-cols-3 overflow-x-auto md:overflow-hidden p-4 gap-32 md:gap-10">
                    <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex text-center justify-center align-items-center items-center">
                        <BiUserCircle size={30} className='mr-2' />{userID}
                    </div>
                    <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex text-center justify-center align-items-center items-center">
                        <BiSolidWalletAlt size={30} className='mr-2' /> {walletBalance}
                    </div>
                    <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center">
                        <div>Reward</div>
                        <div>Rs.{rewardAmount}</div>
                    </div>
                </div>
            </nav> */}

            <div className="text-center font-semibold bg-black text-white border-4 rounded-xl text-lg md:text-xl p-4 mb-4 flex flex-row items-center">Place Your Bet Below <MdArrowDropDownCircle size={30} className='ml-4' /></div>
            <div className={`w-full flex-col text-white h-auto items-center mb-10 ${cooldown !== 0 ? 'hidden' : 'flex'}`}>
                <div className="grid grid-cols-1 w-full lg:w-[50%] h-[30%] text-center border-4 rounded-xl bg-slate-600 text-white font-bold">
                    <div className="bg-black m-2 p-1 rounded-lg w-auto h-auto flex flex-col border-4">
                        <div className='border-4 w-full md:w-3/6 mx-auto border-white text-md md:text-xl rounded-md'>Select a Number from 1 to 36</div>
                        {/* <div className="rounded-lg text-md md:text-xl flex overflow-x-auto p-4 text-black text-center">
                            <div value={1} onClick={() => handleNumberClick(1)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>1</div>
                            <div value={2} onClick={() => handleNumberClick(2)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>2</div>
                            <div value={3} onClick={() => handleNumberClick(3)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>3</div>
                            <div value={4} onClick={() => handleNumberClick(4)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>4</div>
                            <div value={5} onClick={() => handleNumberClick(5)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>5</div>
                            <div value={6} onClick={() => handleNumberClick(6)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>6</div>
                            <div value={7} onClick={() => handleNumberClick(7)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>7</div>
                            <div value={8} onClick={() => handleNumberClick(8)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>8</div>
                            <div value={9} onClick={() => handleNumberClick(9)} className='flex h cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>9</div>
                            <div value={10} onClick={() => handleNumberClick(10)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>10</div>
                            <div value={11} onClick={() => handleNumberClick(11)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>11</div>
                            <div value={12} onClick={() => handleNumberClick(12)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>12</div>
                            <div value={13} onClick={() => handleNumberClick(13)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>13</div>
                            <div value={14} onClick={() => handleNumberClick(14)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>14</div>
                            <div value={15} onClick={() => handleNumberClick(15)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>15</div>
                            <div value={16} onClick={() => handleNumberClick(16)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>16</div>
                            <div value={17} onClick={() => handleNumberClick(17)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>17</div>
                            <div value={18} onClick={() => handleNumberClick(18)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>18</div>
                            <div value={19} onClick={() => handleNumberClick(19)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>19</div>
                            <div value={20} onClick={() => handleNumberClick(20)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>20</div>
                            <div value={21} onClick={() => handleNumberClick(21)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>21</div>
                            <div value={22} onClick={() => handleNumberClick(22)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>22</div>
                            <div value={23} onClick={() => handleNumberClick(23)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>23</div>
                            <div value={24} onClick={() => handleNumberClick(24)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>24</div>
                            <div value={25} onClick={() => handleNumberClick(25)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>25</div>
                            <div value={26} onClick={() => handleNumberClick(26)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>26</div>
                            <div value={27} onClick={() => handleNumberClick(27)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>27</div>
                            <div value={28} onClick={() => handleNumberClick(28)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>28</div>
                            <div value={29} onClick={() => handleNumberClick(29)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>29</div>
                            <div value={30} onClick={() => handleNumberClick(30)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>30</div>
                            <div value={31} onClick={() => handleNumberClick(31)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>31</div>
                            <div value={32} onClick={() => handleNumberClick(32)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>32</div>
                            <div value={33} onClick={() => handleNumberClick(33)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>33</div>
                            <div value={34} onClick={() => handleNumberClick(34)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>34</div>
                            <div value={35} onClick={() => handleNumberClick(35)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>35</div>
                            <div value={36} onClick={() => handleNumberClick(36)} className='flex cursor-pointer justify-center items-center border-4 border-white p-2 md:p-1 font-bold m-1 rounded-full shadow-md shadow-white bg-white hover:scale-150 h-8 md:h-10'>36</div>
                        </div> */}
                        <div className='grid grid-cols-2 justify-center text-xl items-center border-2 border-black m-4 p-2'>
                            Your Selection
                            <input type="number" onChange={(e) => setNumber(e.target.value)} maxLength={2} max={36} className='p-2 border-4 font-bold outline-none shadow-md shadow-white text-black text-center w-1/2 h-auto rounded-lg bg-green-600 ml-2' name="gameNumber" id="gameNumber" />
                        </div>
                    </div>
                    <div className="m-2 p-2 bg-black rounded-lg w-auto h-auto flex flex-col border-4">
                        <div className='border-4 w-full md:w-2/6 mx-auto mb-2 border-white text-md md:text-xl rounded-md'>Select Color</div>
                        <div className="rounded-lg grid grid-cols-5 gap-1 md:gap-4 text-md md:text-xl mx-auto w-full md:w-2/4 text-white">
                            <div value={'Red'} onClick={() => setSelectColor('Red')} className='flex justify-center cursor-pointer items-center p-1 border-white bg-red-700  font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>R</div>
                            <div value={'Blue'} onClick={() => setSelectColor('Blue')} className='flex justify-center items-center cursor-pointer p-1 border-white bg-blue-800 font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>B</div>
                            <div value={'Green'} onClick={() => setSelectColor('Green')} className='flex justify-center items-center cursor-pointer p-1 border-white bg-green-700 font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>G</div>
                            <div value={'Yellow'} onClick={() => setSelectColor('Yellow')} className='flex justify-center items-center cursor-pointer p-1 border-white bg-yellow-500 font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>Y</div>
                            <div value={'Purple'} onClick={() => setSelectColor('Purple')} className='flex justify-center items-center cursor-pointer p-1 border-white bg-purple-800 font-bold m-1 rounded-full shadow-lg shadow-white  hover:scale-150 h-8 md:h-12'>P</div>
                        </div>
                    </div>
                    <div className="mx-2 p-2 rounded-lg bg-black w-auto h-auto flex flex-col border-4">
                        <div className='border-4 w-full md:w-2/6 mx-auto mb-2 border-white text-md md:text-xl rounded-md'>Bet Amount</div>
                        <div className="rounded-lg grid grid-cols-5 gap-2 md:gap-4 w-full mx-auto h-auto text-xs md:text-xl text-white px-2 border-white">
                            <div value={100} onClick={() => handleBetClick(100)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white hover:bg-green-500'>100</div>
                            <div value={250} onClick={() => handleBetClick(250)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>250</div>
                            <div value={500} onClick={() => handleBetClick(500)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>500</div>
                            <div value={750} onClick={() => handleBetClick(750)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>750</div>
                            <div value={1000} onClick={() => handleBetClick(1000)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg shadow-md shadow-white  hover:bg-green-500'>1000</div>
                        </div>
                        <div className='w-10/12 mx-auto h-12 mt-4 border-4 rounded-xl'>
                            <input type='number' onChange={(e) => setBetAmount(parseInt(e.target.value, 10))} value={betAmount} placeholder='100, 200, 300, 500, etc.' className="bg-white w-full h-full text-center font-bold rounded-lg text-black" />
                        </div>
                    </div>
                    <div className="m-2 p-2 bg-black rounded-lg w-auto h-auto flex flex-col border-4">
                        <div className='grid grid-cols-3 gap-2 justify-center text-xs md:text-xl items-center'>
                            <div className={`p-2 mx-auto border-4 font-bold outline-none shadow-md shadow-white text-white text-center w-full h-auto rounded-lg
                              ${selectColor === 'Red' ? 'bg-red-700' : selectColor === 'Purple' ? 'bg-purple-800' : selectColor === 'Green' ? 'bg-green-700' : selectColor === 'Blue' ? 'bg-blue-800' : selectColor === 'Yellow' ? 'bg-yellow-500' : 'bg-black'}`}>{number}
                            </div>
                            <div className={`p-2 mx-auto border-4 border-white shadow-md shadow-white font-bold text-center w-full h-auto rounded-lg
                             ${selectColor === 'Red' ? 'bg-red-700' : selectColor === 'Purple' ? 'bg-purple-800' : selectColor === 'Green' ? 'bg-green-700' : selectColor === 'Blue' ? 'bg-blue-800' : selectColor === 'Yellow' ? 'bg-yellow-500' : 'bg-black'}`}>
                                {selectColor}
                            </div>
                            <div className={`p-2 mx-auto border-4 border-white shadow-md shadow-white font-bold text-center w-full h-auto rounded-lg
                             ${selectColor === 'Red' ? 'bg-red-700' : selectColor === 'Purple' ? 'bg-purple-800' : selectColor === 'Green' ? 'bg-green-700' : selectColor === 'Blue' ? 'bg-blue-800' : selectColor === 'Yellow' ? 'bg-yellow-500' : 'bg-black'}`}>
                                {betAmount}
                            </div>
                        </div>
                    </div>
                    <div className='w-5/6 md:w-1/2 h-auto cursor-pointer mx-auto my-4'>
                        <div onClick={handleSubmitBet} className={`bg-green-900 p-2 rounded-lg h-auto flex flex-col mx-auto hover:scale-125 border-4 cursor-pointer hover:bg-blue-500 ${betCount < 1 ? '' : 'hidden'}`}>
                            Place Bet
                        </div>
                        <div onClick={handleSubmitBet} className={`bg-green-900 p-2 rounded-lg h-auto flex flex-col mx-auto hover:scale-125 border-4 cursor-pointer hover:bg-blue-500 ${betCount >= 1 ? '' : 'hidden'}`}>
                            Place More Bets
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Form; 