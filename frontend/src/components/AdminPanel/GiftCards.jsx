import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useService } from '../../hooks/useService';

function AgentsGiftCard() {
    const service = useService();
    const { user } = useAuthContext();
    const [userID, setUserID] = useState('');
    const [amount, setAmount] = useState(null);
    const navigate = useNavigate();
    const navigateToAdminPage = () => {
        navigate(-1);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userID || !amount)
                alert(`Fill all fields`);
            else {
                const confirmation = window.confirm(`Confirm the details of your gift card: \n${userID} \n${amount}`);
                if (confirmation) {
                    const response = await service.post("/admin/createGiftCard", {
                        fromUser: user.userID,
                        toUser: userID,
                        amount: amount
                    });
                    setAmount(null);
                    setUserID("");
                    console.log(response);
                } else {
                    alert("Gift Card Creation Request Cancelled");
                    setUserID("");
                    setAmount(null);
                }
            }
        } catch (error) {
            console.log(error, error.message);
            alert("Error Creating Gift Card", error);
        }
    }

    return (
        <div className="bg-slate-500 flex w-full h-auto">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">Gift Card</div>
                <div className="w-full flex flex-col items-center">
                    <div className='w-full lg:w-1/2'>
                        <form className='text-white border-4 rounded-lg p-2'>
                            <div className='flex flex-col text-center font-semibold mt-10'>
                                <label htmlFor="userID">Gift Card For</label>
                                <input type="text" name="userID" onChange={(e) => setUserID(e.target.value)} placeholder='E.g. User@1234, SohamK@1234, etc.' className='p-2 m-4 text-center h-auto md:h-14 font-semibold rounded-lg bg-black shadow-lg shadow-black' />
                            </div>
                            {/* <div className='flex flex-col text-center font-semibold'>
                                <label htmlFor="promo_Code">Receiver's Mobile Number</label>
                                <input type="text" name="promo_Code" onChange={handlepromoCode} placeholder='E.g. User@1234, SohamK@1234, etc.' className='p-2 m-4 text-center h-auto md:h-14 font-semibold rounded-lg bg-black shadow-lg shadow-black' />
                            </div> */}
                            {/* <div className='flex flex-col text-center font-semibold'>
                                <label htmlFor="giftCard">Gift Card ID</label>
                                <input type="text" name="giftCard" value={giftCard} onChange={handleGiftCardChange} placeholder='E.g. GC10, GC15, APGC15, etc.' className='p-2 m-4 text-center h-auto md:h-14 font-semibold rounded-lg bg-black shadow-lg shadow-black' />
                            </div> */}
                            <div className='flex flex-col text-center font-semibold'>
                                <label htmlFor="gift_Card_Amount">Amount</label>
                                <input type="number" id='gift_Card_Amount' name="gift_Card_Amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='E.g. 100, 1000, 10000, 100000, etc.' className='p-2 m-4 h-auto md:h-14 text-center font-semibold rounded-lg bg-black shadow-lg shadow-black' />
                            </div>
                            <div className='flex justify-center'>
                                <button type='submit' onClick={handleOnSubmit} className='w-1/4 md:w-1/4 h-auto md:h-12 bg-blue-500 font-bold rounded-lg p-2 m-4 hover:bg-white hover:text-blue-900 shadow-sm shadow-white'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="absolute top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToAdminPage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div >
    );
}

export default AgentsGiftCard;
