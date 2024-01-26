import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

function UserComplaintsForm() {
    const { user } = useAuthContext();
    const [showComplaintsForm, setShowComplaintsForm] = useState(false);
    const [showComplaintsStatus, setShowComplaintsStatus] = useState(false);
    const [showComplaintsHistory, setShowComplaintsHistory] = useState(false);
    const navigate = useNavigate();
    const [selectedGame, setSelectedGame] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const userId = user.userID;

    // State to store form submissions
    const [userComplaints, setUserComplaints] = useState([]);
    const [filteredPendingComplaints, setFilteredPendingComplaints] = useState([]);
    const [filteredSolvedAndRejectedComplaints, setFilteredSolvedAndRejectedComplaints] = useState([]);

    // Navigators
    const navigateToUserHomePage = () => {
        navigate(-1);
    };

    // Handlers
    const handleshowComplaintsForm = () => {
        setShowComplaintsForm(!showComplaintsForm);
    };

    const handleshowComplaintsStatus = () => {
        setShowComplaintsStatus(!showComplaintsStatus);
    };

    const handleshowComplaintsHistory = () => {
        setShowComplaintsHistory(!showComplaintsHistory);
    };

    useEffect(() => {
        const fetchUserComplaints = async () => {
            try {
                const response = await axios.get(`/user/complaints/${userId}`);
                const fetchedComplaints = response.data;
                setUserComplaints(fetchedComplaints);
                // Filter pending complaints
                const pendingComplaints = fetchedComplaints.filter((complaint) => complaint.compStatus === 'Pending');
                setFilteredPendingComplaints(pendingComplaints);
                // Filter solved and rejected complaints
                const solvedAndRejectedComplaints = fetchedComplaints.filter(
                    (complaint) => complaint.compStatus === 'Solved' || complaint.compStatus === 'Rejected'
                );
                setFilteredSolvedAndRejectedComplaints(solvedAndRejectedComplaints);
            } catch (error) {
                console.error('Error fetching user complaints:', error);
            }
        };

        if (userId) {
            fetchUserComplaints();
        }
    }, [userId, userComplaints, filteredPendingComplaints]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userId || !selectedGame || !complaintType || !descriptionText) {
            alert('Please fill in all fields before submitting the form.');
        }
        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const complaintID = `${userId},${formattedDate},${formattedTime}`;

        // Create a new complaint object
        const newComplaint = {
            id: userComplaints.length + 1,
            complaintID,
            date: formattedDate,
            time: formattedTime,
            user_id: userId,
            selected_game: selectedGame,
            complaint_type: complaintType,
            description_text: descriptionText,
            adminRemarks: 'This will be updated by the Admin',
            status: 'Pending',
        };

        // Show confirmation dialog
        const userConfirmed = window.confirm(`Complaint-ID: ${complaintID}\nDate: ${formattedDate}\nTime: ${formattedTime}\nUser-ID: ${userId}\nSelected Game: ${selectedGame}\nComplaint Type: ${complaintType}\nDescription Text: ${descriptionText}`);

        // Check user's confirmation
        if (userConfirmed) {
            // Update the complaints array with the new complaint
            setUserComplaints([...userComplaints, newComplaint]);
            setShowComplaintsStatus(true);
            setShowComplaintsHistory(true);
            try {
                const result = axios.post('/user/complaints', {
                    userId: user.userID,
                    mobileNumber: user.mobileNumber,
                    complaintID: complaintID,
                    compDate: formattedDate,
                    compTime: formattedTime,
                    gameName: selectedGame,
                    compSubject: complaintType,
                    compDescription: descriptionText,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                alert('Your complaint is registered.\nWait until the admin solves your complaint.');
                console.log(result);
            } catch (err) {
                console.error('Error during complaint submission:', err);
                alert('Error submitting complaint. Please try again.');
            }
        } else {
            alert('The Complaint submission is cancelled');
        }
    };

    return (
        <div className="flex w-full h-auto" style={{ backgroundColor: 'rgb(23, 37, 84)' }}>
            <div className="flex flex-col items-center justify-center w-full p-2 mb-16">
                <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">Complaint</div>

                {/* Complaint Form */}
                <div className="w-full flex flex-col items-center">
                    {/* Complaint Form Section */}
                    <div onClick={handleshowComplaintsForm} className="text-center font-semibold text-white bg-black rounded-lg text-md md:text-lg lg:text-2xl p-4 my-4 flex flex-row">Complaint Form <MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                    {showComplaintsForm ? (
                        <div className='w-full lg:w-1/2'>
                            <form className='text-white border-4 rounded-lg p-2'>
                                <div className='text-xl md:text-2xl font-bold text-center'>Fill and Confirm Details</div>
                                {/* Selected Game Dropdown */}
                                <div className='flex flex-col text-center font-semibold'>
                                    <label htmlFor="selected_game_name">Select Game</label>
                                    <select
                                        name="selected_game"
                                        value={selectedGame}
                                        onChange={(e) => setSelectedGame(e.target.value)}
                                        className='p-2 m-2 text-center font-semibold rounded-lg bg-black shadow-lg shadow-black'>
                                        <option value="Select Option">Select Option</option>
                                        <option value="Single Digit Lottery">Single Digit Lottery</option>
                                        <option value="Double Digit Lottery">Double Digit Lottery</option>
                                        <option value="Triple Digit Lottery">Triple Digit Lottery</option>
                                        <option value="ColourBall Number Game">ColourBall Number Game</option>
                                        <option value="ColourBall Colour Game">ColourBall Colour Game</option>
                                        <option value="ColourBall Game">ColourBall Game</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Complaint Type Dropdown */}
                                <div className='flex flex-col text-center font-semibold'>
                                    <label htmlFor="complaint_type">Complaint Type</label>
                                    <select
                                        name="complaint_type"
                                        value={complaintType}
                                        onChange={(e) => setComplaintType(e.target.value)}
                                        className='p-2 m-2 text-center font-semibold rounded-lg bg-black shadow-lg shadow-black'>
                                        <option value="Select Subject">Select Complaint Subject</option>
                                        <option value="Deposit">Deposit</option>
                                        <option value="Withdrawal">Withdrawal</option>
                                        <option value="Password">Password</option>
                                        <option value="Referral Code">Referral Code</option>
                                        <option value="Transactions">Transactions</option>
                                        <option value="Statements">Statements</option>
                                        <option value="Ledger">Ledger</option>
                                    </select>
                                </div>

                                {/* Description Text Input */}
                                <div className='text-center flex flex-col font-semibold'>
                                    <label htmlFor="complaint_description">Description Text</label>
                                    <textarea
                                        name="description_text"
                                        value={descriptionText}
                                        onChange={(e) => setDescriptionText(e.target.value)}
                                        rows={1}
                                        maxLength={100}
                                        placeholder="Describe in less than 50 words..."
                                        className="p-2 m-2 text-center shadow-lg font-semibold rounded-lg bg-black shadow-black"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className='flex justify-center'>
                                    <button onClick={(e) => handleSubmit(e)} className='w-auto h-auto bg-blue-500 font-bold rounded-lg p-2 m-2 hover-bg-white hover-text-blue-900 shadow-sm shadow-white'>Submit</button>
                                </div>

                                <div className='text-center text-xs md:text-sm'>Date and Time are autogenerated.</div>
                                <div className='text-center text-xs md:text-sm'>You can view Complaint Status and History as below.</div>
                            </form>
                        </div>
                    ) : (<></>)}
                </div>
                {/* Complaint Status */}
                <div className="w-full flex flex-col items-center">
                    {/* Complaint Status Section */}
                    <div onClick={handleshowComplaintsStatus} className="text-center font-semibold text-white bg-black rounded-lg text-md md:text-lg lg:text-xl p-4 my-4 flex flex-row">Complaint Status<MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                    {showComplaintsStatus ? (
                        <div className='w-[90%] mx-auto grid overflow-x-auto'>
                            <table className="border-collapse table-auto">
                                <thead className="bg-black text-white font-bold border-4">
                                    <tr className='border-4'>
                                        <th className="text-center border-4">ID</th>
                                        <th className="text-center border-4">Complaint-ID</th>
                                        <th className="text-center border-4">Date</th>
                                        <th className="text-center border-4">Time</th>
                                        <th className="text-center border-4">User-ID</th>
                                        <th className="text-center border-4">Mobile Number</th>
                                        <th className="text-center border-4">Game Name</th>
                                        <th className="text-center border-4">Complaint Type</th>
                                        <th className="text-center border-4">Description Text</th>
                                        <th className="text-center border-4">Admin Remarks</th>
                                        <th className="text-center border-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white font-semibold border-4">
                                    {filteredPendingComplaints.map((complaint, index) => (
                                        <tr key={complaint.id}>
                                            <td className="text-center border-4">{index + 1}</td>
                                            <td className="text-center border-4">{complaint.complaintID}</td>
                                            <td className="text-center border-4">{complaint.compDate}</td>
                                            <td className="text-center border-4">{complaint.compTime}</td>
                                            <td className="text-center border-4">{complaint.userId}</td>
                                            <td className="text-center border-4">{complaint.mobileNumber}</td>
                                            <td className="text-center border-4">{complaint.gameName}</td>
                                            <td className="text-center border-4">{complaint.compSubject}</td>
                                            <td className="text-center border-4">{complaint.compDescription}</td>
                                            <td className="text-center border-4">{complaint.adminRemarks}</td>
                                            <td className={`text-center border-4 bg-yellow-300 text-yellow-900`}>
                                                {complaint.compStatus}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className='bg-black'>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (<></>)}
                </div>

                {/* Complaint History */}
                <div className="w-full flex flex-col items-center">
                    {/* Complaints History Section */}
                    <div onClick={handleshowComplaintsHistory} className="text-center font-semibold text-white bg-black rounded-lg text-md md:text-lg lg:text-xl p-4 my-4 flex flex-row">Complaints History<MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                    {showComplaintsHistory ? (
                        <div className='w-[90%] grid mx-auto overflow-x-auto'>
                            <table className="border-collapse table-auto">
                                <thead className="bg-black text-white font-bold">
                                    <tr>
                                        <th className="text-center border-4">ID</th>
                                        <th className="text-center border-4">Complaint-ID</th>
                                        <th className="text-center border-4">Date</th>
                                        <th className="text-center border-4">Time</th>
                                        <th className="text-center border-4">User-ID</th>
                                        <th className="text-center border-4">Mobile Number</th>
                                        <th className="text-center border-4">Game Name</th>
                                        <th className="text-center border-4">Complaint Type</th>
                                        <th className="text-center border-4">Description Text</th>
                                        <th className="text-center border-4">Admin Remarks</th>
                                        <th className="text-center border-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white font-semibold">
                                    {filteredSolvedAndRejectedComplaints.map((complaint, index) => (
                                        <tr key={index} >
                                            <td className="text-center border-4">{index}</td>
                                            <td className="text-center border-4">{complaint.complaintID}</td>
                                            <td className="text-center border-4">{complaint.compDate}</td>
                                            <td className="text-center border-4">{complaint.compTime}</td>
                                            <td className="text-center border-4">{complaint.userId}</td>
                                            <td className="text-center border-4">{complaint.mobileNumber}</td>
                                            <td className="text-center border-4">{complaint.gameName}</td>
                                            <td className="text-center border-4">{complaint.compSubject}</td>
                                            <td className="text-center border-4">{complaint.compDescription}</td>
                                            <td className="text-center border-4">{complaint.adminRemarks}</td>
                                            <td className={`text-center border-4
                                           ${complaint.compStatus === 'Solved' ? 'bg-green-300 text-green-900' : 'bg-red-400 text-red-900'}`}>
                                                {complaint.compStatus}</td>
                                        </tr>
                                    ))}
                                    <tr className='bg-black'>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                        <td className="p-2 text-center border-4"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (<></>)}
                </div>
            </div>
            <button onClick={navigateToUserHomePage} className="absolute rounded-lg top-4 right-5 z-10">
                <FaWindowClose size={30} className='text-red-600 shadow-md shadow-slate-900 bg-white rounded-lg' />
            </button>
        </div >
    );
}

export default UserComplaintsForm;
