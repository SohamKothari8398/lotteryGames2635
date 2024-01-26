import React, { useState, useEffect } from 'react'
import { format } from 'date-fns';
import axios from 'axios';

function GameTable() {
    const [gamesTable, setGamesTable] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const gamesResponse = await axios.get('/games/tripleDigitLottery/games');
                const gamesData = gamesResponse.data;
                setGamesTable(gamesData);
                if (!gamesTable || gamesTable === 0) console.error("No Games Found. Wait for 5 to 15 minutes");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const interval = setInterval(async () => {
            await fetchData();
        }, 2000); // Fetch data every 2 second
        return () => {
            clearInterval(interval);
        };
    }, [gamesTable]);

    return (
        <div className="px-4 pb-10 flex flex-col bg-blue-900 items-center">
            <div className="text-center font-semibold bg-black text-white rounded-lg text-lg md:text-xl p-4 my-4 border-4 flex flex-row">Results
                {/* <MdOutlineArrowDropDownCircle size={35} className='ml-4' />              */}
            </div>
            <div className="w-full md:w-[98%] h-auto overflow-x-auto lg:overflow-hidden rounded-lg text-white grid items-center">
                <table className="table-auto h-auto text-sm text-slate-900 border-4">
                    <thead className="text-white bg-black font-bold text-xl">
                        <tr>
                            <th className="text-center border-4 p-1">ID</th>
                            <th className="text-center border-4 p-1">Game-ID</th>
                            <th className="text-center border-4 p-1">Date</th>
                            <th className="text-center border-4 p-1">Start Time</th>
                            <th className="text-center border-4 p-1">End Time</th>
                            <th className="text-center border-4 p-1">Total Bets</th>
                            <th className="text-center border-4 p-1">Total Amount</th>
                            <th className="text-center border-4 p-1">Result</th>
                        </tr>
                    </thead>
                    <tbody className='font-bold text-xl'>
                        {gamesTable.map((row, index) => (
                            <tr key={index} className="bg-white">
                                <td className='text-center border-2 p-4'>{index}</td>
                                <td className='text-center border-2 p-4'>{row.gameID}</td>
                                <td className='text-center border-2 p-4'>{format(new Date(row.gameID * 1000), 'dd/MM/yyyy')}</td>
                                <td className='text-center border-2 p-4'>{format(new Date(row.gameID * 1000), 'HH:mm:ss')}</td>
                                <td className='text-center border-2 p-4'>{format(new Date(row.endTime * 1000), 'HH:mm:ss')}</td>
                                <td className='text-center border-2 p-4'>{row.totalBets}</td>
                                <td className='text-center border-2 p-4'>{row.totalAmount}</td>
                                <td className='text-center border-2 p-4'>
                                    {row.winningNumber}
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-black">
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}


export default GameTable;