import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { useService } from '../../hooks/useService';
// import axios from 'axios';

function AgentSettings() {
  const navigate = useNavigate();
  const [deleteAgent, setDeleteAgent] = useState('');
  const [agentDetails, setAgentDetails] = useState({
    userID: '',
    mobileNumber: '',
    password: '',
    promoCode: '',
    upiID: '',
    commission: '',
    share: '',
  });
  const service = useService();

  const handleAgentCredentialsSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!agentDetails.userID || !agentDetails.mobileNumber || !agentDetails.password) {
        alert('Please fill out all required fields');
        return;
      }

      const response = await service.post('/admin/settings/createAgent', agentDetails);
      if (response.status === 200) {
        alert('Agent created successfully');
        setAgentDetails({
          userID: '',
          mobileNumber: '',
          password: '',
          promoCode: '',
          upiID: '',
          commission: '',
          share: '',
        });
      } else {
        alert('Failed to create agent. Please try again.');
      }

      /* const response = await axios.post('/admin/settings/createAgent', agentDetails);
      if (response.status === 200) {
          alert('Agent created successfully');
          setAgentDetails({
              userID: '',
              mobileNumber: '',
              password: '',
              promoCode: '',
              upiID: '',
              commission: '',
              share: '',
          });
      } else {
          alert('Failed to create agent. Please try again.');
      } */
    } catch (error) {
      console.error('Error creating agent:', error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleDeleteAgentSubmit = () => {
    if (window.confirm(`Blocked Sub-Admin: ${deleteAgent}`)) {
    } else {
      alert('Action Cancelled');
    }
  };
  const handleAgentInputChange = (e) => {
    const { name, value } = e.target;
    setAgentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const navigateToAdminPage = () => {
    navigate(-1);
  }

  return (
    <div className="p-4 rounded-lg shadow-lg w-auto lg:w-[90%] m-auto h-auto border-4 pb-20 flex flex-col text-white">
      <div className="flex flex-col items-center justify-center w-full p-2">
        <div className="text-center font-bold text-2xl md:text-4xl lg:text-6xl my-4">Agent Settings</div>
        <div className="flex flex-col w-[90%]  mx-auto items-center mt-8 text-center"><div className='w-full h-auto'>
          <div> 1. Create Agent Credential, </div>
          <div> 2. User Settings Access Block, Lock</div>
          <div> 3. Mobile, Password, UPI, </div>
          <div> 4. Delete Sub-Admin, </div>
          <div> 5. Commission and Share Window. </div>
          <div className="flex-col md:flex-row w-full md:w-3/5 mx-auto items-center mt-8 p-4">
            <div className="text-xl md:text-2xl lg:text-4xl p-4 underline underline-offset-4 font-bold">Create Agent</div>
            <form className='flex flex-col mx-auto bg-black items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
              <label className="block my-4 text-center font-medium">Agent-ID</label>
              <input
                type="text" name="userID" value={agentDetails.userID} onChange={handleAgentInputChange}
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
              />
              <label className="block my-4 text-center font-medium">Mobile Number</label>
              <input
                type="number"
                name='mobileNumber'
                value={agentDetails.mobileNumber}
                maxLength={10}
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                onChange={handleAgentInputChange}
              />
              <label className="block my-4 text-center font-medium">Password</label>
              <input
                type="password"
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                name='password'
                value={agentDetails.password}
                onChange={handleAgentInputChange}
              />
              <label className="block my-4 text-center font-medium">PromoCode</label>
              <input
                type="text" name='promoCode' value={agentDetails.promoCode} onChange={handleAgentInputChange}
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
              />
              <label className="block my-4 text-center font-medium">UPI-ID</label>
              <input
                type="text" name='upiID' value={agentDetails.upiID} onChange={handleAgentInputChange}
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
              />
              <label className="block my-4 text-center font-medium">Commission (%)</label>
              <input
                type="number"
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                name='commission'
                value={agentDetails.commission}
                onChange={handleAgentInputChange}
              />
              <label className="block my-4 text-center font-medium">Share (%)</label>
              <input
                type="number"
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
                name='share'
                value={agentDetails.share}
                onChange={handleAgentInputChange}
              />
              <button onClick={handleAgentCredentialsSubmit} className=" hover:bg-blue-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                Submit
              </button>
            </form>
          </div>
          <div className="flex-col md:flex-row w-full md:w-3/5 mx-auto items-center mt-8 p-4">
            <div className="text-xl md:text-2xl lg:text-4xl p-4 underline underline-offset-4 font-bold">Reset Password</div>
            <form className='flex flex-col mx-auto bg-black items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
              <label className="block my-4 text-center font-medium">Agent Mobile Number</label>
              <input
                type="number"
                maxLength={10}
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
              />
              <label className="block my-4 text-center font-medium">Agent Password</label>
              <input
                type="password"
                maxLength={16}
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
              />
              <button onClick={handleDeleteAgentSubmit} className=" hover:bg-green-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                Reset
              </button>
            </form>
          </div>
          <div className="flex-col md:flex-row w-full md:w-3/5 mx-auto items-center mt-8 p-4">
            <div className="text-xl md:text-2xl lg:text-4xl p-4 underline underline-offset-4 font-bold">Remove Agent</div>
            <form className='flex flex-col mx-auto bg-black items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
              <label className="block my-4 text-center font-medium">Agent-ID</label>
              <input
                type="number"
                maxLength={10}
                className="mt-1 p-2 text-black font-bold rounded-md w-full shadow-md shadow-white bg-white text-center focus:border-4 focus:border-blue-500"
              />
              <button onClick={handleDeleteAgentSubmit} className=" hover:bg-green-700 border-4 text-white px-4 mt-8 py-2 rounded-lg">
                Remove
              </button>
            </form>
          </div>
        </div>
        </div>

        <div className="fixed top-10 right-2 md:top-10 md:right-24 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
          <button onClick={navigateToAdminPage}>
            <FaHome size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentSettings;

