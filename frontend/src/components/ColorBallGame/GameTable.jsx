import React, { useState, useEffect } from 'react'
import { format } from 'date-fns';
import { useService } from '../../hooks/useService';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';


function GameTable() {
    const service = useService();
    const [gamesTable, setGamesTable] = useState([]);
    const [showGames, setshowGames] = useState(false);
    const handleShowGames = () => {
        setshowGames(!showGames);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const gamesResponse = await service.get('/games/colorBallLottery/games');
                const gamesData = gamesResponse.data;
                setGamesTable(gamesData);
                if (!gamesTable || gamesTable === 0) alert("No Games Found. Wait for 5 to 15 minutes");
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
    }, [gamesTable, service]);

    return (

        <div className="px-4 pb-10 flex flex-col items-center">
            <div onClick={handleShowGames} className="text-center font-semibold bg-black cursor-pointer text-white rounded-lg text-lg md:text-xl p-4 my-4 border-4 flex flex-row">Games & Results
                <MdOutlineArrowDropDownCircle size={30} className='ml-4' />
            </div>
            {showGames ? (<div className="w-full md:w-auto flex h-auto overflow-x-auto lg:overflow-hidden rounded-lg text-white items-center">
                <table className="table-auto h-auto text-sm text-slate-900 border-4">
                    <thead className="text-white bg-black font-bold text-sm md:text-xl">
                        <tr>
                            <th className="py-3 text-center border-4 px-6">ID</th>
                            <th className="py-3 text-center border-4 px-6">Game-ID</th>
                            <th className="py-3 text-center border-4 px-6">Date</th>
                            <th className="py-3 text-center border-4 px-6">Start Time</th>
                            <th className="py-3 text-center border-4 px-6">End Time</th>
                            <th className="py-3 text-center border-4 px-6">Total Bets</th>
                            <th className="py-3 text-center border-4 px-6">Total Amount</th>
                            <th className="py-3 text-center border-4 px-6">Results</th>
                        </tr>
                    </thead>
                    <tbody className='font-bold text-xs md:text-sm'>
                        {gamesTable.slice().reverse().map((row, index) => (
                            <tr key={index} className="bg-white font-semibold">
                                <td className='py-3 text-center border-2 px-6'>{gamesTable.length - index}</td>
                                <td className='py-3 text-center border-2 px-6'>{row.gameID}</td>
                                <td className="py-3 text-center border-2 px-6">{format(new Date(row.gameID * 1000), 'dd/MM/yyyy')}</td>
                                <td className="py-3 text-center border-2 px-6">{format(new Date(row.gameID * 1000), 'HH:mm:ss')}</td>
                                <td className="py-3 text-center border-2 px-6">{format(new Date(row.endTime * 1000), 'HH:mm:ss')}</td>
                                <td className='text-center border-2 p-4'>{row.totalBets}</td>
                                <td className='text-center border-2 p-4'>{row.totalAmount}</td>
                                <td className='text-center border-2'>
                                    <div className={`font-extrabold border-black hover:scale-150 flex w-1/2 justify-center mx-auto p-2 rounded-full shadow-lg text-white shadow-slate-900 ${row.winningColor === 'Red' ? 'bg-red-800' :
                                        row.winningColor === 'Purple' ? 'bg-fuchsia-900' : row.winningColor === 'Green' ? 'bg-green-900' : row.winningColor === 'Blue' ? 'bg-blue-800' : row.winningColor === 'Yellow' ? 'bg-yellow-500' : 'bg-black '}`}>
                                        {row.winningNumber}
                                    </div>
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
            </div>) : (<></>)}
        </div >
    )
}

export default GameTable;