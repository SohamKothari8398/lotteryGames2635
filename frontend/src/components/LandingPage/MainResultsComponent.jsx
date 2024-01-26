import React, { useEffect, useState } from 'react';

function formatCountdownTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
function formatTime(time) {
    if (time instanceof Date) {
        const hh = String(time.getHours()).padStart(2, '0');
        const mm = String(time.getMinutes()).padStart(2, '0');
        const ss = String(time.getSeconds()).padStart(2, '0');
        return `${hh}:${mm}:${ss}`;
    }
    return ''; // Return an empty string if 'time' is not a Date object
}

function formatDate(date) {
    if (date instanceof Date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }
    return ''; // Return an empty string if 'date' is not a Date object
}

function GamesResult() {
    const [countdown, setCountdown] = useState(900); // 15 seconds
    const [rows, setRows] = useState([]);
    const [counter, setCounter] = useState(1); // Initialize counter to 1
    const gamesString = ['Single Digit Game', 'Double Digit Game', 'Triple Diigit Game', 'Color Ball Number Game', 'Color Ball Color Game', 'Color Ball Game'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);

            if (countdown === 0) {
                // Create a new row every 15 seconds with a decreasing ID
                const now = new Date();
                const newRow = {
                    id: counter,
                    date: formatDate(now),
                    gameName: gamesString[random(0, gamesString.length - 1)],
                    startTime: formatTime(now),
                    endTime: formatTime(new Date(now.getTime() + counter * 5000)), // Calculate End Time
                    totalLotteryAmount: random(100000, 10000000), // Random number between 1 and 1000
                    winner: random(0, 999), // Random number between 0 and 9
                };
                setRows((prevRows) => [newRow, ...prevRows]); // Add new row at the beginning
                setCounter((prevCounter) => prevCounter + 1); // Increment the counter
                setCountdown(10); // Reset the countdown timer to 15 seconds
            }
        }, 1000); // Interval is set to 1000ms (1 second) for a 15-second countdown

        return () => {
            clearInterval(interval);
        };
    }, [countdown, rows, counter]);

    return (
        <div className="mb-20 bg-slate-500 pb-8">
            <div className="text-5xl lg:text-7xl mt-8 border-t-8 border-t-slate-900 font-bold text-white italic m-auto p-4 rounded-lg text-center">
                Results
            </div>
            <div className="text-2xl  w-[50%] sm:text-xl  md:text-xl  lg:w-[20%] mt-8 font-bold bg-black text-white m-auto p-4 rounded-lg text-center">
                Countdown Timer: {formatCountdownTimer(countdown)}
            </div>
            <table className="table-fixed w-[80%] mx-auto p-2 mt-8">
                <thead>
                    <tr className="bg-black text-white">
                        <th className="w-1/6 p-4 font-bold border hidden">ID</th>
                        <th className="w-1/6 p-4 font-bold border">Date</th>
                        <th className="w-1/6 p-4 font-bold border  hidden">Start Time</th>
                        <th className="w-1/6 p-4 font-bold border  hidden">End Time</th>
                        <th className="w-1/6 p-4 font-bold border">Game Name</th>
                        <th className="w-1/6 p-4 font-bold border">Total Lottery Amount</th>
                        <th className="w-1/6 p-4 font-bold border">Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} className="bg-white text-black font-semibold">
                            <td className="text-center p-4 border border-black hidden">{row.id}</td>
                            <td className="text-center p-4 border border-black">{row.date}</td>
                            <td className="text-center p-4 hidden border border-black">{row.startTime}</td>
                            <td className="text-center p-4 hidden border border-black">{row.endTime}</td>
                            <td className="text-center p-4 border border-black">{row.gameName}</td>
                            <td className="text-center p-4 border border-black">{row.totalLotteryAmount}</td>
                            <td className="text-center p-4 border border-black">{row.winner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GamesResult;
