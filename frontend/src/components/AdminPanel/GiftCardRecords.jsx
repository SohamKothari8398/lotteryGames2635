import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { format } from 'date-fns';
import { useService } from '../../hooks/useService';

const AdminGiftCardsTable = () => {
    const service = useService();
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await service.get('/admin/allGiftCards');
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
            <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">Record</div>
            <div className="text-center font-semibold text-white bg-black rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4">Gift Cards</div>
            <div className='w-[90%] mx-auto h-auto p-4 overflow-x-auto lg:overflow-hidden'>
                <table className="w-full table-auto text-sm text-slate-900 rounded-lg border-4">
                    <thead className="bg-black text-white font-bold">
                        <tr>
                            <th className="text-center border-4 p-2">Sr.No.</th>
                            <th className="text-center border-4 p-2">To User</th>
                            <th className="text-center border-4 p-2">GiftCardID</th>
                            <th className="text-center border-4 p-2">Amount <span className="text-xs font-thin">(in INR)</span></th>
                            <th className="text-center border-4 p-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody >
                        {Array.isArray(tableData) && tableData.map((row, index) => (
                            <tr key={index} className="bg-white font-semibold">
                                <td className='text-center border-2 p-1'>{index + 1}</td>
                                <td className='text-center border-2 p-1'>{row.toUser}</td>
                                <td className='text-center border-2 p-1'>{row.giftCardID}</td>
                                <td className='text-center border-2 p-1'>{row.amount}</td>
                                <td className="text-center border-2">
                                    {format(new Date(row.createdAt), 'dd/MM/yyyy \n HH:mm:ss ')}
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-black">
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

export default AdminGiftCardsTable;
