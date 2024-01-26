import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';


const UserComplaints = () => {
    const [complaintsData, setComplaintsData] = useState([]);
    const [complaintStatuses, setComplaintStatuses] = useState([]);
    const [complaintRemarks, setComplaintRemarks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch complaints data from the server
        axios.get('/user/complaints')
            .then(response => {
                const fetchedData = response.data;
                setComplaintsData(fetchedData);
            })
            .catch(error => {
                console.error('Error fetching complaints data:', error);
            });
    }, []); // The empty dependency array ensures that this effect runs only once on mount

    const navigateToAdminPage = () => {
        navigate(-1);
    }

    const handleStatusChange = (index, status) => {
        const newStatuses = [...complaintStatuses];
        newStatuses[index] = status;
        setComplaintStatuses(newStatuses);
    }

    const handleRemarkChange = (index, remark) => {
        const newRemarks = [...complaintRemarks];
        newRemarks[index] = remark;
        setComplaintRemarks(newRemarks);
    }


    const handleSubmit = (index) => {
        const selectedStatus = complaintStatuses[index];
        const enteredRemark = complaintRemarks[index];

        // Assuming you have an endpoint to update adminRemarks and compStatus
        axios.patch(`/admin/usersComplaints/${complaintsData[index]._id}`, {
            adminRemarks: enteredRemark,
            compStatus: selectedStatus,
        })
            .then(response => {
                // Handle the response if needed
                console.log('Update successful:', response.data);

                // You might want to update the local state after a successful update
                const updatedData = [...complaintsData];
                updatedData[index].adminRemarks = response.data.complaint.adminRemarks;
                updatedData[index].compStatus = response.data.complaint.compStatus;
                setComplaintsData(updatedData);
            })
            .catch(error => {
                console.error('Error updating complaint:', error);
            });
    }

    return (
        <div className="bg-slate-600 flex flex-col w-full items-center h-auto">
            <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">Complaints</div>
            <div className="text-center font-semibold text-white bg-black rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4">Complaints Table</div>
            <div className='w-[90%] mx-auto h-auto p-4 overflow-x-auto'>
                <table className="w-full text-sm text-slate-900 rounded-lg border-4">
                    <thead className="bg-black text-white font-bold">
                        <tr>
                            <th className="py-3 text-center border-2 px-6">ID</th>
                            <th className="py-3 text-center border-2 px-6">Complaint-ID</th>
                            <th className="text-center border-4 p-2">Create Time</th>
                            <th className="text-center border-4 p-2">Update Time</th>
                            <th className="py-3 text-center border-2 px-6">User-ID</th>
                            <th className="py-3 text-center border-2 px-6">Mobile Number</th>
                            <th className="py-3 text-center border-2 px-6">Game Name</th>
                            <th className="py-3 text-center border-2 px-6">Complaint Type</th>
                            <th className="py-3 text-center border-2 px-6">User Query</th>
                            <th className="py-3 text-center border-2 px-6">Remarks</th>
                            <th className="py-3 text-center border-2 px-6">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaintsData.map((row, index) => (
                            <tr key={index} className="bg-white font-semibold">
                                <td className='py-3 text-center font-bold border-2 px-6' >{index}</td>
                                <td className='py-3 text-center font-bold border-2 px-6'>{row.complaintID}</td><td className="text-center border-2">
                                    {format(new Date(row.createdAt), 'HH:mm:ss dd-MM-yyyy')}
                                </td>
                                <td className="text-center border-2">
                                    {format(new Date(row.updatedAt), 'HH:mm:ss dd-MM-yyyy')}
                                </td>
                                <td className='py-3 text-center font-bold border-2 px-6'>{row.userId}</td>
                                <td className='py-3 text-center font-bold border-2 px-6'>{row.mobileNumber}</td>
                                <td className='py-3 text-center font-bold border-2 px-6'>{row.gameName}</td>
                                <td className='py-3 text-center font-bold border-2 px-6'>{row.compSubject}</td>
                                <td className='py-3 text-center border-2 px-6'>{row.compDescription}</td>
                                <td className='py-3 text-center font-bold border-2 px-6'>
                                    {row.compStatus === 'Solved' || row.compStatus === 'Rejected' ? row.adminRemarks : (
                                        <div>
                                            <textarea
                                                name="complaintRemark"
                                                id="complaintRemark"
                                                cols="40"
                                                rows="3"
                                                placeholder='Remarks e.g Your Complaint is invalid, Issue Solved, Complaint Rejected, etc.'
                                                className='text-black font-semibold border-black border-2'
                                                onChange={(e) => handleRemarkChange(index, e.target.value)}
                                            />
                                            <button
                                                type="submit"
                                                className={`text-white font-bold p-2 rounded-lg shadow-sm shadow-slate-900 ${complaintStatuses[index] === 'Solved' ? 'bg-green-500' :
                                                    complaintStatuses[index] === 'Pending' ? 'bg-yellow-500' :
                                                        complaintStatuses[index] === 'Rejected' ? 'bg-red-500' :
                                                            'bg-gray-500'
                                                    }`}
                                                onClick={() => handleSubmit(index)}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className='py-3 text-center border-2 px-6 w-1/12'>
                                    {row.compStatus === 'Solved' ? (
                                        <div className="bg-green-700 text-white h-10 flex items-center justify-center">
                                            Solved
                                        </div>
                                    ) : row.compStatus === 'Rejected' ? (
                                        <div className="bg-red-700 text-white h-10 flex items-center justify-center">
                                            Rejected
                                        </div>
                                    ) : (
                                        <select
                                            value={complaintStatuses[index]}
                                            onChange={(e) => handleStatusChange(index, e.target.value)}
                                            className={`text-white text-center rounded-lg h-10 font-bold border-white border-2 ${complaintStatuses[index] === 'Solved' ? 'bg-green-500' :
                                                complaintStatuses[index] === 'Pending' ? 'bg-yellow-500' :
                                                    complaintStatuses[index] === 'Rejected' ? 'bg-red-500' :
                                                        'bg-gray-500'
                                                }`}
                                        >
                                            <option value='Select Option'>Select Option</option>
                                            <option value='Solved'>Solved</option>
                                            <option value='Pending'>Pending</option>
                                            <option value='Rejected'>Rejected</option>
                                        </select>
                                    )}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                            <td className="py-3 bg-black text-center border-2 px-6"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="absolute top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToAdminPage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div >
    );
};

export default UserComplaints;
