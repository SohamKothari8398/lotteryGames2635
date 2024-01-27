import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useAuthContext } from '../../hooks/useAuthContext';
import { format } from 'date-fns';
import { useService } from '../../hooks/useService';


function AgentsUserRecords() {
    const { user } = useAuthContext();
    const service = useService();
    // Use States
    const [tableData, setTableData] = useState([]);
    const [showDepositRecord, setshowDepositRecord] = useState('');
    const [showTransactionsRecord, setShowTransactionsRecord] = useState('');
    const [showWithdrawRecord, setshowWithdrawRecord] = useState('');
    const [showUserRecordsTable, setshowUserRecordsTable] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await service.get('/agent/userRecords', { params: { promoCode: user.promoCode } });
                setTableData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message || error);
            }
        }
        fetchData();
    }, [tableData]);

    // Navigator
    const navigate = useNavigate();

    const navigateToAdminPage = () => {
        navigate(-1);
    }

    const handleShowUserRecordsTable = () => {
        setshowUserRecordsTable(!showUserRecordsTable);
    }
    const handleShowTransactionsRecord = () => {
        setShowTransactionsRecord(!showTransactionsRecord);
    }
    const handleShowDepositRecords = () => {
        setshowDepositRecord(!showDepositRecord);
    }
    const handleShowWithdrawalRecords = () => {
        setshowWithdrawRecord(!showWithdrawRecord);
    }

    return (
        <div className="bg-slate-600 flex flex-col w-full py-16 items-center h-auto">

            <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">
                Users Record
            </div>

            <div className='mx-auto h-auto p-4 w-full'>
                <div onClick={handleShowUserRecordsTable} className="mx-auto w-1/2 md:w-1/4 flex font-semibold justify-between text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4">
                    Records Table <MdOutlineArrowDropDownCircle size={35} className='ml-4' />
                </div>
                {showUserRecordsTable ? (<div className='w-full mx-auto overflow-x-auto grid'>
                    <table className="table-auto text-sm text-slate-900 border-4">
                        <thead className="bg-black text-white font-bold">
                            <tr>
                                <th className="text-center border-4 p-1">ID</th>
                                <th className="text-center border-4 p-1">User-ID</th>
                                <th className="text-center border-4 p-1">Mobile</th>
                                <th className="text-center border-4 p-1">Promo Code</th>
                                {/* <th className="text-center border-4 p-1">Gift Card</th> */}
                                <th className="text-center border-4 p-1">Wallet Balance(in INR)</th>
                                <th className="text-center border-4 p-1">Date and Time</th>
                                <th className="text-center border-4 p-1">Account Status</th>
                                <th className="text-center border-4 p-1">Total Games Played</th>
                                <th className="text-center border-4 p-1 bg-green-500">Won</th>
                                <th className="text-center border-4 p-1 bg-blue-500">Active</th>
                                <th className="text-center border-4 p-1 bg-red-500">Lost</th>
                            </tr>
                        </thead>
                        <tbody >
                            {tableData.map((row, index) => (
                                <tr key={index} className="bg-white font-semibold">
                                    <td className='text-center border-2 p-1'>{index}</td>
                                    <td className='text-center border-2 p-1'>{row.userID}</td>
                                    <td className='text-center border-2 p-1'>{row.mobileNumber}</td>
                                    <td className='text-center border-2 p-1'>{row.promoCode}</td>
                                    {/* <td className='text-center border-2 p-1'>{row.giftCardCode}</td> */}
                                    <td className='text-center border-2 p-1'>{row.walletBalance}</td>
                                    <td className='text-center border-2 p-1'>{format(new Date(row.createdAt), "HH:mm:ss dd/MM/yyyy")}</td>
                                    <td className='text-center border-2 p-1'>{row.accountStatus}</td>
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
                            </tr>
                        </tbody>
                    </table>
                </div>) : (<></>)}
            </div>

            <div className='mx-auto h-auto p-4 w-full'>
                <div onClick={handleShowTransactionsRecord} className="mx-auto w-1/2 md:w-1/4 flex font-semibold justify-between text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4">
                    Transactions Table<MdOutlineArrowDropDownCircle size={35} className='ml-4' />
                </div>
                {showTransactionsRecord ? (<div className='w-full mx-auto overflow-x-auto grid'>
                    <table className="w-full text-sm text-slate-900 rounded-xl border-4">
                        <thead className="bg-black text-white font-bold">
                            <tr>
                                <th className="w-1/12 text-center border-4 p-1">ID</th>
                                <th className="w-2/12 text-center border-4 p-1">User-ID</th>
                                <th className="w-2/12 text-center border-4 p-1">Date</th>
                                <th className="w-1/12 text-center border-4 p-1">Time</th>
                                <th className="w-3/12 text-center border-4 p-1">Amount</th>
                                <th className="w-3/12 text-center border-4 p-1">Action</th>
                                {/* <th className="w-3/12 text-center border-4 p-1">Status</th> */}
                                <th className="w-3/12 text-center border-4 p-1">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="bg-white font-semibold">
                                    <td className="text-center border-2 p-1">{index}</td>
                                    <td className="text-center border-2 p-1">{row.userID}</td>
                                    <td className="text-center border-2 p-1">{row.mobileNumber}</td>
                                    <td className="text-center border-2 p-1"></td>
                                    <td className="text-center border-2 p-1">{row.amount}</td>
                                    <td className="text-center border-2 p-1">{row.transactionType}</td>
                                    <td className={`text-center font-bold border-2 p-1 hover:scale-150 text-xl
                                        ${row.status === 'Debited' ? 'text-green-700' : row.status === 'Pending' ? 'text-yellow-600' :
                                            row.status === 'Failed' ? 'text-red-900' : row.status === 'Rejected' ? 'text-red-600' : row.status === 'Credited' ? 'text-sky-700' : 'bg-white'}`
                                    }>
                                        {row.status}
                                    </td>
                                </tr>
                            ))}
                            <tr className='bg-black'>
                                <th className="w-1/12 text-center border-4 p-2"></th>
                                <th className="w-1/12 text-center border-4 p-2"></th>
                                <th className="w-1/12 text-center border-4 p-2"></th>
                                <th className="w-1/12 text-center border-4 p-2"></th>
                                <th className="w-1/12 text-center border-4 p-2"></th>
                                <th className="w-1/12 text-center border-4 p-2"></th>
                                <th className="w-1/12 text-center border-4 p-2"></th>
                            </tr>
                        </tbody>
                    </table>
                </div>) : (<></>)}
            </div>
            <div className="absolute top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToAdminPage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div >
    );
}

export default AgentsUserRecords;