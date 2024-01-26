import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';

const AgentsRecordTable = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/agentsRecords');
                setTableData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [tableData]);

    // Navigator
    const navigate = useNavigate();

    const navigateToAdminPage = () => {
        navigate(-1);
    }

    return (
        <div className="bg-slate-600 flex flex-col w-full mb-2 items-center h-auto">
            <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">Records</div>
            <div className="text-center font-semibold text-white bg-black rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4">Agents Record</div>
            <div className='w-[90%] mx-auto h-auto p-4 overflow-x-auto lg:overflow-hidden'>
                <table className="w-full table-auto text-sm text-slate-900 rounded-lg border-4">
                    <thead className="bg-black text-white font-bold">
                        <tr>
                            <th className="text-center border-4 p-2">ID</th>
                            <th className="text-center border-4 p-2">User-ID</th>
                            <th className="text-center border-4 p-2">Mobile Number</th>
                            <th className="text-center border-4 p-2">Promo Code</th>
                            <th className="text-center border-4 p-2">Balance <span className="text-xs font-thin">(in INR)</span></th>
                            <th className="text-center border-4 p-2">Created At</th>
                            <th className="text-center border-4 p-2">Last Updated</th>
                            <th className="text-center border-4 p-2">Account Status</th>
                            <th className="text-center border-4 p-2">Games Status</th>
                            <th className="text-center border-4 p-2">Bets Status</th>
                            <th className="text-center border-4 p-2">Games Played</th>
                            <th className="text-center border-4 p-2 bg-green-500">Won</th>
                            <th className="text-center border-4 p-2 bg-blue-500">Active</th>
                            <th className="text-center border-4 p-2 bg-red-500">Lost</th>
                        </tr>
                    </thead>
                    <tbody >
                        {tableData.map((row, index) => (
                            <tr key={index} className="bg-white font-semibold">
                                <td className='text-center border-2 p-1'>{index}</td>
                                <td className='text-center border-2 p-1'>{row.userID}</td>
                                <td className='text-center border-2 p-1'>{row.mobileNumber}</td>
                                <td className='text-center border-2 p-1'>{row.promoCode}</td>
                                <td className='text-center border-2 p-1'>{row.walletBalance}</td>
                                <td className="text-center border-2">
                                    {format(new Date(row.createdAt), 'dd/MM/yyyy \n HH:mm:ss ')}
                                </td>
                                <td className="text-center border-2">
                                    {format(new Date(row.updatedAt), 'dd/MM/yyyy \n HH:mm:ss ')}
                                </td>
                                <td className='text-center border-2 p-1'>{row.accountStatus}</td>
                                <td className='text-center border-2 p-1'>{row.games}</td>
                                <td className='text-center border-2 p-1'>{row.bets}</td>
                                <td className='text-center border-2 p-1'>{row.gamesPlayed}</td>
                                <td className='text-center border-2 p-1 text-green-700'>{row.gamesWon}</td>
                                <td className='text-center border-2 p-1 text-blue-700'>{row.gamesActive}</td>
                                <td className='text-center border-2 p-1 text-red-700'>{row.gamesLoss}</td>
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
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="absolute top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToAdminPage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div>
    );
};

export default AgentsRecordTable;


