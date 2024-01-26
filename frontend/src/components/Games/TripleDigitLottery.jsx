// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { FaWindowClose } from 'react-icons/fa';
// import { BiSolidWalletAlt, BiUserCircle } from 'react-icons/bi';
// import { MdLockClock, MdArrowDropDownCircle } from 'react-icons/md';
// import { IoMdClock } from "react-icons/io";
// import { useAuthContext } from '../../hooks/useAuthContext';
// import axios from 'axios';
// import { format } from 'date-fns';

// const gameTimer = 300;
// let totalRewardAmount = 0;

// function formatTimer(seconds) {
//     // const days = Math.floor(seconds / (3600 * 24));
//     const hours = Math.floor((seconds % (3600 * 24)) / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;
//     // const daysStr = String(days).padStart(2, '0');
//     const hoursStr = String(hours).padStart(2, '0');
//     const minutesStr = String(minutes).padStart(2, '0');
//     const secondsStr = String(remainingSeconds).padStart(2, '0');
//     // return `${daysStr}:${hoursStr}:${minutesStr}:${secondsStr}`;
//     return `${hoursStr}:${minutesStr}:${secondsStr}`;
// }

// function TripleDigitLottery() {
//     const { user } = useAuthContext();
//     const [countdownTimer, setCountdownTimer] = useState(0); // Initially 10 seconds
//     const [cooldown, setCooldown] = useState(10);
//     const [counter, setCounter] = useState(1);
//     let [betCount, setBetCount] = useState(0);
//     const [number, setNumber] = useState(0);
//     const [betAmount, setBetAmount] = useState(0);
//     const [maxBet, setMaxBet] = useState(1000);
//     const [totalAmountBet, setTotalAmountBet] = useState(0);
//     const [rewardAmount, setRewardAmount] = useState(0);
//     const [myBetsTable, setMyBetsTable] = useState([]);
//     const [gameHistoryTable, setGameHistoryTable] = useState([]);
//     const userID = user.userID;
//     const [walletBalance, setWalletBalance] = useState(user.walletBalance);
//     const navigate = useNavigate();

//     const navigateToUserHome = () => {
//         navigate(-1);
//     }
//     const handleBetClick = (value) => {
//         setBetAmount(value);
//     }
//     const handleSubmitBet = async (e) => {
//         e.preventDefault();
//         if (number > -1 && number < 1000 && betAmount > 99) {
//             setBetCount((prevCount) => prevCount + 1);
//             setTotalAmountBet((prevAmount) => (prevAmount + betAmount));
//             setWalletBalance((prevAmount) => (prevAmount - betAmount));
//             setMaxBet((prevCount) => (prevCount - 1));
//             const response = await axios.post("/games/tripleDigitLottery/bets", {
//                 userID: userID,
//                 mobileNumber: user.mobileNumber,
//                 betNumber: number,
//                 betAmount: betAmount,
//             })
//             if (response.data.status === "Bet Placed") {
//                 alert(`Bet Submitted.\nCheck the Active Bets Table.`);
//             }
//         } else {
//             alert('Select any number from 0 to 999. \nMinimum Bet Amount = 100.');
//         }
//     }

//     const calculateTotalReward = () => {
//         let totalReward = 0;
//         myBetsTable.forEach((row) => {
//             totalReward += calculateReward(row);
//         });
//         return totalReward;
//     };

//     const calculateReward = (bet) => {
//         const { betAmt, selectedColor, lotteryNum, resultColor, resultNum } = bet;
//         let reward = 0;
//         if (lotteryNum === resultNum && selectedColor === resultColor) {
//             // Choose Both Number and Colour if winner, Reward 100x
//             reward = 100 * betAmt;
//         }
//         totalRewardAmount += reward;
//         return reward;
//     };


//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (countdownTimer === 0) {
//                 const fetchData = async () => {
//                     try {
//                         const gamesResponse = await axios.get('/games/tripleDigitLottery/games');
//                         const gamesData = gamesResponse.data;
//                         setGameHistoryTable(gamesData);
//                         // Fetch bets data
//                         const betsResponse = await axios.get(`/games/tripleDigitLottery/bets/${userID}`);
//                         const fetchedBets = betsResponse.data;
//                         setMyBetsTable(fetchedBets);
//                     } catch (error) {
//                         console.error('Error fetching data:', error);
//                     }
//                 };
//                 fetchData();
//                 console.log(myBetsTable);
//                 console.log(gameHistoryTable);
//                 setCountdownTimer(gameTimer);
//                 setCooldown(10);
//                 setCounter((prevCounter) => prevCounter + 1); // Increment the counter
//                 setBetCount(0);
//                 setMaxBet(1000); // Reset Max Bet
//             } else if (cooldown !== 0) {
//                 setCooldown((prevCooldown) => (prevCooldown - 1));
//             } else {
//                 setCountdownTimer((prevCountdown) => (prevCountdown - 1));
//             }
//         }, 1000);
//         return () => {
//             clearInterval(interval);
//         };
//     }, [countdownTimer, cooldown, userID, gameHistoryTable, number, betAmount, counter, totalAmountBet, myBetsTable]);

//     return (
//         <div className="px-10 pb-10 flex flex-col bg-blue-900 items-center">
//             <div className="text-2xl md:text-4xl font-bold text-center text-white mt-28 mb-8 underline underline-offset-8 italic">Triple Digit Lottery</div>

//             <div className="fixed w-full text-white bg-black/70 h-auto p-2 rounded-xl border-4 overflow-x-auto md:overflow-hidden ">
//                 <div className="w-auto md:w-full h-auto text-xs md:text-sm grid grid-cols-4 overflow-x-auto md:overflow-hidden gap-32 md:gap-10">
//                     <div className={`p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center
//                     ${countdownTimer === 0 ? 'text-white' : 'text-green-500'}`}>
//                         <div>Game Timer</div>
//                         <div className='flex items-center mt-2'><IoMdClock size={30} className='mr-2' />{formatTimer(countdownTimer)}</div>
//                     </div>
//                     <div className={`p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center
//                    ${cooldown !== 0 ? 'text-red-700' : 'text-white'}`}>
//                         <div>Lock Timer</div>
//                         <div className='flex items-center mt-2'><MdLockClock size={30} className='mr-2' />{formatTimer(cooldown)}</div>
//                     </div>
//                     <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center">
//                         <div>Total Bet</div>
//                         <div>Rs.{totalAmountBet}</div>
//                     </div>
//                     <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center">
//                         <div>Max Bets</div>
//                         <div>{maxBet}</div>
//                     </div>
//                 </div>
//             </div>
//             <nav className="fixed w-full text-white left-0 right-0 bottom-0 bg-black/70 h-[5rem] border-4 rounded-xl">
//                 <div className="w-auto md:w-full h-auto text-xs md:text-sm grid grid-cols-3 overflow-x-auto md:overflow-hidden p-4 gap-32 md:gap-10">
//                     <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex text-center justify-center align-items-center items-center">
//                         <BiUserCircle size={30} className='mr-2' />{userID}
//                     </div>
//                     <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex text-center justify-center align-items-center items-center">
//                         <BiSolidWalletAlt size={30} className='mr-2' /> {walletBalance}
//                     </div>
//                     <div className="p-2 rounded-lg font-bold w-40 md:w-auto h-auto flex flex-col text-center justify-center align-items-center items-center">
//                         <div>Reward</div>
//                         <div>Rs.{calculateTotalReward()}</div>
//                     </div>
//                 </div>
//             </nav>

//             <div className="text-center font-semibold bg-black text-white border-4 rounded-xl text-lg md:text-xl p-4 mb-4 flex flex-row items-center">Place Your Bet Below <MdArrowDropDownCircle size={30} className='ml-4' /></div>
//             <div className={`w-full flex-col text-white h-auto items-center mb-10 ${cooldown !== 0 ? 'hidden' : 'flex'}`}>
//                 <div className="grid grid-cols-1 w-full lg:w-[50%] text-center border-4 bg-slate-500 rounded-xl text-white font-bold">
//                     <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col border-4 border-white">

//                         <div className='border-4 border-white mx-12 text-xl rounded-xl'>Select a Number from 0 to 999</div>
//                         <div className='grid grid-cols-2 justify-center text-xl items-center border-2 border-black m-4 p-2'>
//                             Your Selection
//                             <input type="number" value={number} maxLength={3} onChange={(e) => setNumber(e.target.value)} min={0} max={999} className='p-2 border-4 font-bold outline-none shadow-md shadow-white text-black text-center w-1/2 h-auto rounded-lg bg-green-600 ml-2' name="tripleDigitNumber" id="tripleDigitNumber" />
//                         </div>
//                     </div>
//                     <div className="mx-2 p-2 rounded-lg bg-black w-auto h-auto flex flex-col border-4">
//                         <div className='border-4 w-full md:w-2/6 mx-auto mb-2 border-white text-md md:text-xl rounded-md'>Bet Amount</div>
//                         <div className="rounded-lg grid grid-cols-5 gap-2 md:gap-4 w-full mx-auto h-auto text-xs md:text-xl text-white px-2 border-white">
//                             <div value={100} onClick={() => handleBetClick(100)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white hover:bg-green-500'>100</div>
//                             <div value={250} onClick={() => handleBetClick(250)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>250</div>
//                             <div value={500} onClick={() => handleBetClick(500)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>500</div>
//                             <div value={750} onClick={() => handleBetClick(750)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg  shadow-md shadow-white  hover:bg-green-500'>750</div>
//                             <div value={1000} onClick={() => handleBetClick(1000)} className='flex justify-center items-center border-4 border-white bg-black p-1 rounded-lg shadow-md shadow-white  hover:bg-green-500'>1000</div>
//                         </div>
//                         <div className='w-10/12 mx-auto h-12 mt-4 border-4 rounded-xl'>
//                             <input type='number' onChange={(e) => handleBetClick(e.target.value)} value={betAmount} placeholder='100, 200, 300, 500, etc.' className="bg-white w-full h-full text-center font-bold rounded-lg text-black" />
//                         </div>
//                     </div>
//                     <div className='w-auto h-auto my-4'>
//                         <div onClick={handleSubmitBet} className={`bg-blue-500 w-1/2 p-2 rounded-lg h-auto flex flex-col mx-auto hover:scale-125 border-4 hover:bg-blue-500 ${betCount < 1 ? '' : 'hidden'}`}>
//                             Place Bet
//                         </div>
//                         <div onClick={handleSubmitBet} className={`bg-blue-500 w-1/2 p-2 rounded-lg h-auto flex flex-col mx-auto hover:scale-125 border-4 hover:bg-blue-500 ${betCount >= 1 && betCount < 1000 ? '' : 'hidden'}`}>
//                             Place More Bets
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="text-center font-semibold bg-black text-white border-4 rounded-xl text-xl md:text-2xl md p-4 my-4 flex flex-row">Results</div>
//             <div className="w-full lg:w-auto h-auto overflow-x-auto lg:overflow-hidden rounded-lg text-white items-center">
//                 <table className="table-auto h-auto text-sm text-slate-900 border-4">
//                     <thead className="text-white bg-black font-bold">
//                         <tr>
//                             <th className="py-3 text-center border-4 px-6">ID</th>
//                             <th className="py-3 text-center border-4 px-6">Game-ID</th>
//                             <th className="py-3 text-center border-4 px-6">Date</th>
//                             <th className="text-center border-4 p-1">Start Time</th>
//                             <th className="text-center border-4 p-1">End Time</th>
//                             <th className="py-3 text-center border-4 px-6">Total Bets</th>
//                             <th className="py-3 text-center border-4 px-6">Total Amount</th>
//                             <th className="py-3 text-center border-4 px-6">Results</th>
//                         </tr>
//                     </thead>
//                     <tbody className='font-bold text-xl'>
//                         {gameHistoryTable.map((row, index) => (
//                             <tr key={index} className="bg-white">
//                                 <td className='text-center border-2 p-4'>{index}</td>
//                                 <td className='text-center border-2 p-4'>{row.gameID}</td>
//                                 <td className='text-center border-2 p-4'>{format(new Date(row.gameID * 1000), 'dd/MM/yyyy')}</td>
//                                 {/* Convert Unix timestamp to formatted date */}
//                                 <td className='text-center border-2 p-4'>{format(new Date(row.gameID * 1000), 'HH:mm:ss')}</td>
//                                 {/* Convert Unix timestamp to formatted date */}
//                                 <td className='text-center border-2 p-4'>{format(new Date(row.endTime * 1000), 'HH:mm:ss')}</td>
//                                 <td className='text-center border-2 p-4'>{row.totalBets}</td>
//                                 <td className='text-center border-2 p-4'>{row.totalAmount}</td>
//                                 <td className='text-center border-2 p-4'>
//                                     {row.winningNumber}
//                                 </td>
//                                 {/* <td className='text-center border-2 p-4'>
//                                     {cooldown > 0 ? row.winner : '---'}
//                                 </td> */}
//                             </tr>
//                         ))}
//                         <tr className="bg-black">
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <div className="text-center font-semibold bg-black text-white rounded-lg text-xl md:text-2xl p-4 my-4 border-4 flex flex-row">Active Bets
//                 {/* <MdOutlineArrowDropDownCircle size={35} className='ml-4' />              */}
//             </div>
//             <div className="w-full lg:w-auto h-auto overflow-x-auto lg:overflow-hidden rounded-lg text-white items-center">
//                 <table className="table-auto h-auto text-sm text-slate-900 border-4">
//                     <thead className="text-white bg-black font-bold text-xl">
//                         <tr>
//                             <th className="text-center border-4 p-1">ID</th>
//                             <th className="text-center border-4 p-1">Game-ID</th>
//                             <th className="text-center border-4 p-1">Date</th>
//                             <th className="text-center border-4 p-1">Time</th>
//                             <th className="text-center border-4 p-1">Bet-ID</th>
//                             <th className="text-center border-4 p-1">User-ID</th>
//                             <th className="text-center flex flex-col p-1">
//                                 <div>My Bet</div>
//                                 <div className='flex text-sm'>
//                                     <div className='p-2' >Amount</div>
//                                     <div className='p-2' >Number</div>
//                                 </div>
//                             </th>
//                             <th className="text-center border-4 p-1">Reward</th>
//                             <th className="text-center border-4 p-1">Result</th>
//                         </tr>
//                     </thead>
//                     <tbody className='font-bold text-md'>
//                         {myBetsTable.map((row, index) => (
//                             <tr key={index} className={`${row.rewardAmount !== 0 ? 'bg-green-500' : 'bg-white'}`}>
//                                 <td className='text-center border-2 p-1'>{index}</td>
//                                 <td className='text-center border-2 p-1'>{row.gameID}</td>
//                                 <td className='text-center border-2 p-1'>{row.betID}</td>
//                                 <td className="text-center border-2 p-1">{format(new Date(row.betTime * 1000), 'dd/MM/yyyy')}</td>
//                                 <td className="text-center border-2 p-1">{format(new Date(row.betTime * 1000), 'HH:mm:ss')}</td>
//                                 <td className='text-center border-2 p-1'>{row.userID}</td>
//                                 <th className="text-center flex flex-col border-2 p-1">
//                                     <div className='grid grid-cols-2 items-center gap-2'>
//                                         <div className='p-2 items-center border-2' >{row.betAmount}</div>
//                                         <div className='p-2 items-center border-2' >{row.betNumber}</div>
//                                     </div>
//                                 </th>
//                                 <td className='text-center border-2 p-1'>
//                                     {row.rewardAmount}
//                                 </td>
//                                 <td className='text-center border-2 p-1'>{cooldown > 0 ? row.winningNumber : '---'}</td>
//                             </tr>
//                         ))}
//                         <tr className="bg-black">
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                             <td className='border-4 p-4'></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>


//             <div className="text-center font-semibold bg-black text-white rounded-lg text-lg md:text-xl mt-8 p-4 my-4 border-4 flex flex-row">My History
//                 {/* <MdOutlineArrowDropDownCircle size={35} className='ml-4' />              */}
//             </div>
//             <div className="grid grid-cols-2 w-full lg:w-[80%] md:grid-cols-2 lg:grid-cols-4 text-center text-white font-bold py-4 mb-16">
//                 <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
//                     <div>Balance</div>
//                     <div className="bg-white rounded-lg text-black p-4 m-2">10000</div>
//                 </div>
//                 <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
//                     <div>Total Players</div>
//                     <div className="bg-white rounded-lg text-black p-4 m-2">10000</div>
//                 </div>
//                 <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
//                     <div>Active Games</div>
//                     <div className="bg-white rounded-lg text-black p-4 m-2">6</div>
//                 </div>
//                 <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
//                     <div>Active Players</div>
//                     <div className="bg-white rounded-lg text-black p-4 m-2">6000</div>
//                 </div>
//                 <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
//                     <div>Your Number</div>
//                     <div className="bg-white rounded-lg text-black p-4 m-2">7</div>
//                 </div>
//                 <div className="bg-green-500 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
//                     <div>Winning Number</div>
//                     <div className="bg-white rounded-lg text-black p-4 m-2">7</div>
//                 </div>
//                 <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
//                     <div>Your Bet Aomunt</div>
//                     <div className="bg-white rounded-lg text-black p-4 m-2">1000</div>
//                 </div>
//                 <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
//                     <div>Reward</div>
//                     <div className="bg-white rounded-lg text-black p-4 m-2">8000</div>
//                 </div>
//             </div>
//             <button onClick={navigateToUserHome} className="fixed text-red-500 rounded-lg bg-white top-2 right-4 z-10 ">
//                 <FaWindowClose size={30} className='shadow-lg shadow-red-500' />
//             </button>
//         </div >
//     )
// }

// export default TripleDigitLottery;


