import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { FaPowerOff, FaHome } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidBank } from "react-icons/bi";
import { useService } from '../../hooks/useService';

function AgentsSettings() {
  const service = useService();
  const [showForm, setShowForm] = useState(false);
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [otp, setOtp] = useState("");
  const [otp2, setOtp2] = useState("");
  const [newUpiID, setNewUpiID] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPromo, setNewPromo] = useState("");
  const [recaptcha, setRecaptcha] = useState(false);
  const [recaptcha2, setRecaptcha2] = useState(false);
  const [recaptcha3, setRecaptcha3] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      if (newPassword.length < 8) {
        throw new Error('Frontend Error: Password should be a minimum of 8 characters long.');
      }
      const response = await service.put('/login', {
        mobileNumber: mobile2,
        otp: otp2,
        newPassword: newPassword,
      });
      if (response.data.status === 'Password updated successfully') {
        alert('Password Changed successfully');
      } else {
        throw new Error(response.data.error || 'Failed to update password. Please check your inputs.');
      }
    } catch (error) {
      console.error('Password change failed:', error);
      alert(error.message || 'Failed to update password. Please try again.');
    }
  };

  const handleUpiChange = async (e) => {
    e.preventDefault();
    try {
      if (newUpiID.length < 13) {
        throw new Error('Frontend Error: UPI-ID should be a minimum of 14 characters long.');
      }
      const response = await service.put('/agent/settings', {
        mobileNumber: mobile,
        otp: otp,
        newUpiID: newUpiID,
      });
      if (response.data.status === "UPI Details Updated") {
        alert("Bank Details changed successfully!");
      } else {
        throw new Error(response.data.error || 'Failed to update UPI details. Please try again.');
      }
    } catch (error) {
      console.error('UPI-ID change failed:', error);
      console.log('service Response:', error.response);
      alert(error.response?.data?.error || error.message || 'Failed to update UPI details. Please try again.');
    }
  };

  // const handlePromoChange = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await service.patch("/agent/settings", {
  //       mobileNumber: mobile,
  //       otp,
  //       newPromoCode: newPromo,
  //     });
  //     if (response.data.status === "Promo Code Updated") {
  //       alert("Promo Code Updated");
  //     }
  //     else {
  //       alert("PromoCode Change Failed");
  //       throw new Error(response.data.error || 'Failed to update PromoCode');
  //     }
  //   } catch (error) {
  //     console.error('PromoCode change failed:', error);
  //     console.log('service Response:', error.response);
  //     alert(error.response?.data?.error || error.message || 'Failed to update UPI details. Please try again.');
  //   }
  // };

  // Navigator
  const navigate = useNavigate();

  // The handler for the logout button click
  const handleLogoutClick = () => {
    alert("Logged out successfully!");
    navigate('/');
  };

  const navigateToAdminPage = () => {
    navigate('/agent/home');
  }

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTogglePromoForm = () => {
    setShowPromoForm(!showPromoForm);
  };

  const handleTogglebBankForm = () => {
    setShowBankForm(!showBankForm);
  };

  const handleToggleMobileForm = () => {
    setShowMobileForm(!showMobileForm);
  };


  return (
    <div className="bg-slate-600 flex w-full text-white h-auto">
      <div className="flex flex-col items-center justify-center w-full p-2">
        <div className="text-center font-bold text-2xl md:text-4xl lg:text-6xl my-4">Settings</div>
        <div className="w-[80%] m-auto">
          <div className="text-xl md:text-2xl flex justify-center lg:text-4xl font-semibold w-full mt-4">
            Stats
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-start text-white font-bold mt-8">
            <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
              <div>Account Balance</div>
              <div className="bg-black rounded-lg text-white p-4 m-2  ">1,000,000</div>
            </div>
            <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
              <div>Users</div>
              <div className="bg-black rounded-lg text-white p-4 m-2  ">10,000,000,000</div>
            </div>
            <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
              <div>Active Games</div>
              <div className="bg-black rounded-lg text-white p-4 m-2  ">6</div>
            </div>
            <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
              <div>Highest Bet</div>
              <div className="bg-black rounded-lg text-white p-4 m-2  ">50000</div>
            </div>
            <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
              <div>Referal Earned</div>
              <div className="bg-black rounded-lg text-white p-4 m-2  ">1000000</div>
            </div>
            <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
              <div>Feature</div>
              <div className="bg-black rounded-lg text-white p-4 m-2">Value</div>
            </div>
            <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
              <div>Option</div>
              <div className="bg-black rounded-lg text-white p-4 m-2">Value</div>
            </div>
            <div className="bg-white text-black hover:scale-125 hover:bg-yellow-700 hover:border-4 m-2 p-2 rounded-lg w-auto h-auto flex flex-col">
              <div>Attribute</div>
              <div className="bg-black rounded-lg text-white p-4 m-2">Value</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col w-[90%]  mx-auto">
          <div className="w-full">
            <button onClick={handleTogglebBankForm} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
              <BiSolidBank size={35} className="mr-10" />
              Change UPI Details
              <MdOutlineArrowDropDownCircle size={35} className="ml-10" />
            </button>
          </div>
          {showBankForm ? (<form className="mt-8 border-4 p-4 text-white">
            <div className="flex flex-col mb-4">
              <label htmlFor="mobile" className="mb-2 font-bold text-lg text-center">Mobile Number</label>
              <input type="tel" id="mobile" name="mobile" value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="otp2" className="mb-2 font-bold text-lg text-center">OTP</label>
              <input type="number" id="otp2" name="otp2" value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP received on your mobile number" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="new_upi_ID" className="mb-2 font-bold text-lg text-center">New UPI Details</label>
              <input type="text" id="new_upi_ID" name="new_upi_ID"
                value={newUpiID} onChange={(e) => setNewUpiID(e.target.value)}
                placeholder="Enter new bank details"
                className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="confirm_new_upi_ID" className="mb-2 font-bold text-lg text-center">Confirm UPI Details</label>
              <input type="text" id="confirm_new_upi_ID" name="confirm_new_upi_ID"
                value={newUpiID} onChange={(e) => setNewUpiID(e.target.value)}
                placeholder="Confirm your new bank details"
                className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
            </div>
            <div className="flex items-center mb-4  justify-center">
              <input
                type="checkbox"
                id="recaptcha2"
                name="recaptcha2"
                checked={recaptcha2}
                onChange={(e) => setRecaptcha2(e.target.checked)}
                className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <label htmlFor="recaptcha2" className="font-medium text-blue-500 underline underline-offset-2">I'm not a robot</label>
            </div>
            <div className="flex justify-center">
              <button type="button" onClick={handleUpiChange} disabled={!mobile || !otp || !recaptcha2}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded ${!mobile || !otp || !recaptcha2 ? "opacity-50 cursor-not-allowed" : ""}`}>
                Submit
              </button>
            </div>
          </form>) : (<></>)}
        </div>
        <div className="mt-8 text-white w-[90%] flex flex-col  mx-auto">
          <div className="w-full">
            <button onClick={handleToggleForm} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
              <RiLockPasswordFill size={35} className="mr-10" />
              Change Password
              <MdOutlineArrowDropDownCircle size={35} className="ml-10" />
            </button>
          </div>
          {showForm ? (<form className="mt-8 border-4 p-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="mobile" className="mb-2 font-bold text-lg text-center">Mobile Number</label>
              <input type="tel" id="mobile" name="mobile" value={mobile2}
                onChange={(e) => setMobile2(e.target.value)}
                placeholder="Enter registered mobile number"
                className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="otp3" className="mb-2 font-bold text-lg text-center">OTP</label>
              <input type="number" id="otp3" name="otp3" value={otp2}
                onChange={(e) => setOtp2(e.target.value)}
                placeholder="Enter the OTP received on your mobile number" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="new_password" className="mb-2 font-bold text-lg text-center">New Password</label>
              <input type="password" id="new_password" name="new_password" value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                placeholder="Enter new password" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="confirm_new_password" className="mb-2 font-bold text-lg text-center">Confirm New Password</label>
              <input type="text" id="confirm_new_password" name="confirm_new_password" value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                placeholder="Confirm new password" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
            </div>
            <div className="flex items-center mb-4  justify-center">
              <input
                type="checkbox"
                id="recaptcha3"
                name="recaptcha3"
                checked={recaptcha3}
                onChange={(e) => setRecaptcha3(e.target.checked)}
                className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <label htmlFor="recaptcha3" className="font-medium text-blue-500 underline underline-offset-2">I'm not a robot</label>
            </div>
            <div className="flex justify-center">
              <button type="button" onClick={handlePasswordChange} disabled={!mobile2 || !otp2 || !newPassword || !recaptcha3}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded ${!mobile2 || !otp2 || !newPassword || !recaptcha3 ? "opacity-50 cursor-not-allowed" : ""}`}>
                Submit
              </button>
            </div>
          </form>) : (<></>)}
        </div>
        {/* <div className="mt-8 text-white w-[90%] flex flex-col  mx-auto">
          <div className="w-full">
            <button onClick={handleTogglePromoForm} className="text-xl flex items-center mx-auto border-4 md:text-2xl lg:text-4xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
              <SiPluscodes size={35} className="mr-10" />
              Change Promo Code
              <MdOutlineArrowDropDownCircle size={35} className="ml-10" />
            </button>
          </div>
          {showPromoForm ? (<form className="mt-8 border-4 p-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="mobile" className="mb-2 font-bold text-lg text-center">Mobile Number</label>
              <input type="tel" id="mobile" name="mobile" value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter registered mobile number"
                className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="otp3" className="mb-2 font-bold text-lg text-center">OTP</label>
              <input type="number" id="otp3" name="otp3" value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP received on your mobile number" className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="new_Promo_Code" className="mb-2 font-bold text-lg text-center">New Promo Code</label>
              <input type="text" id="new_Promo_Code" name="new_Promo_Code" value={newPromo}
                onChange={(e) => setNewPromo(e.target.value)}
                placeholder="AgentX12, ..." className="border border-white bg-black text-white font-semibold w-full md:w-[70%] lg:w-[60%] mx-auto rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 text-center" />
            </div>
            <div className="flex items-center mb-4  justify-center">
              <input
                type="checkbox"
                id="recaptcha"
                name="recaptcha"
                checked={recaptcha}
                onChange={(e) => setRecaptcha(e.target.checked)}
                className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <label htmlFor="recaptcha3" className="font-medium text-blue-500 underline underline-offset-2">I'm not a robot</label>
            </div>
            <div className="flex justify-center">
              <button type="button" onClick={handlePromoChange} disabled={!mobile || !otp || !recaptcha}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded ${!mobile || !otp || !recaptcha ? "opacity-50 cursor-not-allowed" : ""}`}>
                Submit
              </button>
            </div>
          </form>) : (<></>)}
        </div> */}
        <div className="mt-8">
          <button type="button" onClick={handleLogoutClick} className="bg-red-600 w-auto hover:bg-red-700 hover:border-4 text-white font-bold p-4 m-4 rounded-xl flex items-center">
            <FaPowerOff className="mr-2" /> Logout
          </button>
        </div>
      </div>
      <div className="fixed top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
        <button onClick={navigateToAdminPage}>
          <FaHome size={30} />
        </button>
      </div>
    </div>
  );
};

export default AgentsSettings;