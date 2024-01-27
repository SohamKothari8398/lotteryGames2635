import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useService } from '../../hooks/useService';

function History() {
    const { user } = useAuthContext();
    const service = useService()
    const [allBetsTable, setAllBetsTable] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const betsResponse = await service.get(`/games/singleDigitLottery/bets/${user.userID}`);
                const fetchedBets = betsResponse.data;
                setAllBetsTable(fetchedBets);
                if (!allBetsTable || allBetsTable.length === 0) console.error("No Bets found. Place Some Bets");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const interval = setInterval(async () => {
            await fetchData();
        }, 5000); // Fetch data every 5 second
        return () => {
            clearInterval(interval);
        };
    }, [user, allBetsTable]);


    return (
        <div className="px-4 pb-10 flex flex-col bg-blue-900 items-center">
            <div className="text-center font-semibold bg-black text-white rounded-lg text-lg md:text-xl p-4 my-4 border-4 flex flex-row">All Bets
                {/* <MdOutlineArrowDropDownCircle size={35} className='ml-4' />              */}
            </div>
            <div className="w-full md:w-[98%] h-auto overflow-x-auto lg:overflow-hidden rounded-lg text-white grid items-center">
                <table className="table-auto h-auto text-sm text-slate-900 border-4">
                    <thead className="text-white bg-black font-bold text-xl">
                        <tr>
                            <th className="text-center border-4 p-1">ID</th>
                            <th className="text-center border-4 p-1">Game-ID</th>
                            <th className="text-center border-4 p-1">Bet-ID</th>
                            <th className="text-center border-4 p-1">Date</th>
                            <th className="text-center border-4 p-1">Time</th>
                            <th className="text-center border-4 p-1">User-ID</th>
                            <th className="text-center flex flex-col p-1">
                                <div>Bet</div>
                                <div className='flex items-center gap-2'>
                                    <div className='flex p-2' >Amount</div>
                                    <div className='flex p-2' >Number</div>
                                </div>
                            </th>
                            <th className="text-center border-4 p-1">Reward</th>
                            <th className="text-center border-4 p-1">Result</th>
                        </tr>
                    </thead>
                    <tbody className='font-bold text-md'>
                        {allBetsTable.map((row, index) => (
                            <tr key={index} className={`${row.rewardAmount !== 0 && row.rewardAmount !== null ? 'bg-green-500' : 'bg-white'}`}>
                                <td className='text-center border-2 p-1'>{index}</td>
                                <td className='text-center border-2 p-1'>{row.gameID}</td>
                                <td className='text-center border-2 p-1'>{row.betID}</td>
                                <td className="text-center border-2 p-1">{format(new Date(row.betTime * 1000), 'dd/MM/yyyy')}</td>
                                <td className="text-center border-2 p-1">{format(new Date(row.betTime * 1000), 'HH:mm:ss')}</td>
                                <td className='text-center border-2 p-1'>{row.userID}</td>
                                <th className="text-center flex flex-col border-2 p-1">
                                    <div className='grid grid-cols-2 items-center gap-2'>
                                        <div className='p-2 items-center border-2' >{row.betAmount}</div>
                                        <div className='p-2 items-center border-2' >{row.betNumber}</div>
                                    </div>
                                </th>
                                <td className='text-center border-2 p-1'>
                                    {row.rewardAmount}
                                </td>
                                <td className='text-center border-2 p-1'>{row.winningNumber}</td>
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
                            <td className='border-4 p-4'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default History;