import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import ResultGamesColorComponent from '../LandingPage/ResultPageGamesColorChange';
import AdminUserRecordTable from './UsersRecord';
import DepositRecords from './DepositApprovals';
import WithdrawRecords from './WithdrawalApprovals';
import ComplaintRecords from './UsersComplaints';

// Component
const AdminAllRecords = () => {
    const navigate = useNavigate();
    const navigateToAdminPage = () => {
        navigate(-1);
    }

    // Use States
    const [showDepositRecord, setshowDepositRecord] = useState('');
    const [showWithdrawRecord, setshowWithdrawRecord] = useState('');
    const [showUserRecords, setshowUserRecords] = useState('');
    const [showAllGamesRecords, setshowAllGamesRecords] = useState('');
    const [showComplaintsRecords, setshowComplaintsRecords] = useState('');

    // Show Handlers
    const handleShowDepositRecord = () => {
        setshowDepositRecord(!showDepositRecord);
    };

    const handleshowWithdrawRecord = () => {
        setshowWithdrawRecord(!showWithdrawRecord);
    };

    const handleshowUserRecords = () => {
        setshowUserRecords(!showUserRecords);
    };

    const handleshowComplaintsRecords = () => {
        setshowComplaintsRecords(!showComplaintsRecords);
    };

    const handleshowAllGamesRecords = () => {
        setshowAllGamesRecords(!showAllGamesRecords);
    };

    return (
        <div className="bg-slate-600 flex w-full h-auto">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">All Records</div>

                <div className="w-full flex flex-col items-center">
                    <div onClick={handleShowDepositRecord} className="text-center font-semibold text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 flex flex-row">Deposit Approvals Records <MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                    {showDepositRecord ? (<div> <DepositRecords /> </div>
                    ) : (<></>)}
                </div>

                <div onClick={handleshowWithdrawRecord} className="text-center font-semibold text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 flex flex-row">Withdrawal Approvals Records <MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                {showWithdrawRecord ? (<div> <WithdrawRecords /> </div>) : (<></>)}
                <div onClick={handleshowUserRecords} className="text-center font-semibold text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 flex flex-row">Users Records <MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                {showUserRecords ? (<div>
                    <AdminUserRecordTable />
                </div>) : (<></>)}
                <div onClick={handleshowComplaintsRecords} className="text-center font-semibold text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 flex flex-row">Complaints Records <MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                {showComplaintsRecords ? (<div> <ComplaintRecords /> </div>) : (<></>)}
                <div onClick={handleshowAllGamesRecords} className="text-center font-semibold h-auto text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 flex flex-row">All Games Records <MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                {showAllGamesRecords ? (<div className='w-full h-auto'>
                    <ResultGamesColorComponent />
                </div>) : (<></>)}
            </div>
            <div className="absolute top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToAdminPage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div >
    );
};

export default AdminAllRecords;
