import React, { useState, useEffect } from 'react';

const ResultGamesColorComponent = () => {
    const [game, setGame] = useState(0); // Set the default game to 0 (All Games)
    const [timer, setTimer] = useState(600); // Countdown timer in seconds
    const getButtonBackgroundColor = () => {
        switch (game) {
            case 1:
                return 'bg-blue-300';
            case 2:
                return 'bg-green-300';
            case 3:
                return 'bg-purple-300';
            case 4:
                return 'bg-yellow-300';
            default:
                return 'bg-white text-black';
        }
    };


    useEffect(() => {
        const countdown = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    const gameNames = [
        'Single Digit Lottery',
        'Double Digit Lottery',
        'Triple Digit Lottery',
        'ColourBall Game',
    ];

    const generateFakeData = () => {
        const resultsStoreData = [];
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const n = 100;

        for (let i = 0; i < n; i++) {
            const gameID = currentTimestamp - i * 600; // Decrease timestamp by 600 seconds for each row
            const gameDate = new Date(gameID * 1000);
            const gameTime = gameDate.toLocaleTimeString('en-US');
            const gameName = gameNames[i % gameNames.length];
            const totalPlayers = Math.floor(Math.random() * 1000) * 100;
            const totalGameAmount = Math.floor(Math.random() * 1000) * 100000;

            let winner;
            if (gameName === 'Single Digit Lottery') {
                winner = Math.floor(Math.random() * 10);
            } else if (gameName === 'Double Digit Lottery') {
                winner = ('0' + Math.floor(Math.random() * 100)).slice(-2);
            } else if (gameName === 'Triple Digit Lottery') {
                winner = ('00' + Math.floor(Math.random() * 1000)).slice(-3);
            } else if (gameName === 'ColourBall Game') {
                const colors = ['Red', 'Blue', 'Green', 'Purple', 'Yellow'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const number = Math.floor(Math.random() * 37);
                winner = `${color}, ${number}`;
            }

            resultsStoreData.push({
                ID: n - i,
                GameID: gameID,
                Date: gameDate.toLocaleDateString('en-US'),
                Time: gameTime,
                GameName: gameName,
                TotalPlayers: totalPlayers,
                TotalGameAmount: totalGameAmount,
                Winner: winner,
                NextGameStartingTime: timer + i * 10,
            });
        }
        return resultsStoreData;
    };

    const resultsStoreData = generateFakeData();

    const filterData = () => {
        if (game === 0) {
            return resultsStoreData; // All Games
        } else {
            const filteredData = resultsStoreData.filter((row) => row.GameName === gameNames[game - 1]);
            return filteredData;
        }
    };

    const filteredData = filterData();

    return (
        <div className="py-10 my-10 rounded-lg shadow-lg w-full m-auto h-auto border-4 flex flex-col">
            <div className="text-4xl lg:text-6xl italic text-white border-b-4 font-bold m-auto mb-10">
                All Games Results
            </div>
            <div className='flex flex-col md:flex-row lg:flex-row w-auto h-auto justify-around'>
                <div className="ml-10 mt-8 w-auto md:mt-0 md:ml-0 lg:mt-0 lg:ml-0">
                    <button
                        className={`bg-black hover:bg-green-900 border-2 text-white font-bold py-2 mr-5 px-4 rounded-lg`}
                        onClick={() => setGame(0)}
                    >
                        All Games
                    </button>
                    <select
                        className="bg-black hover:bg-green-900 text-center border-2 mt-8 md:mt-0 lg:mt-0  text-white font-bold py-2 mr-5 rounded-xl"
                        value={game}
                        onChange={(e) => setGame(parseInt(e.target.value))}
                    >
                        <option defaultValue className='font-semibold'>Select Game Name</option>
                        {gameNames.map((name, index) => (
                            <option key={index} value={index + 1} className='font-semibold'>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-4 p-8 w-auto h-auto mb-2 md:mb-2 lg:mb-0 overflow-auto">
                <table className="m-auto w-auto h-auto table-auto border-collapse border-4 border-white">
                    <thead className='border-4 border-black'>
                        <tr className="bg-black text-white">
                            <th className="border-4 p-2">ID</th>
                            <th className="border-4 p-2">GID (game id)</th>
                            <th className="border-4 p-2">Date</th>
                            <th className="border-4 p-2">Time</th>
                            <th className="border-4 p-2">Game</th>
                            <th className="border-4 p-2">Total Players</th>
                            <th className="border-4 p-2">Total Game Amount (in INR)</th>
                            <th className="border-4 p-2 bg-green-900">Result</th>
                            {/* <th className="border-4 p-2">Countdown Timer</th> */}
                        </tr>
                    </thead>
                    <tbody className='border-4 border-black font-bold'>
                        {filteredData.map((row, index) => (
                            <tr key={index} className={`${getButtonBackgroundColor()} border-2 border-black`}>
                                <td className="border-2 text-center border-black p-2">{row.ID}</td>
                                <td className="border-2 text-center border-black p-2">{row.GameID}</td>
                                <td className="border-2 text-center border-black p-2">{row.Date}</td>
                                <td className="border-2 text-center border-black p-2">{row.Time}</td>
                                <td className="border-2 text-center border-black p-2">{row.GameName}</td>
                                <td className="border-2 text-center border-black p-2">{row.TotalPlayers}</td>
                                <td className="border-2 text-center border-black p-2">{row.TotalGameAmount}</td>
                                <td className="border-2 text-center border-black p-2 bg-green-300">{row.Winner}</td>
                                {/* <td className="border-2 text-center border-black p-2">
                                    <div className='bg-black text-white font-bold rounded-xl'>
                                        {formatTime(row.NextGameStartingTime)}
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                        <tr className='bg-black border-4 border-white'>
                            <td className="border-4 text-center border-white p-4"></td>
                            <td className="border-4 text-center border-white p-4"></td>
                            <td className="border-4 text-center border-white p-4"></td>
                            <td className="border-4 text-center border-white p-4"></td>
                            <td className="border-4 text-center border-white p-4"></td>
                            <td className="border-4 text-center border-white p-4"></td>
                            <td className="border-4 text-center border-white p-4"></td>
                            <td className="border-4 text-center border-white p-4"></td>
                            {/* <td className="border-4 text-center border-white p-4"></td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultGamesColorComponent;


