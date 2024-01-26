import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function AgentsCreatePromo() {
    const [promoCode, setpromoCode] = useState('');
    const navigate = useNavigate();
    const navigateToAdminPage = () => {
        navigate('/agent/home');
    }

    const handlepromoCode = (e) => {
        setpromoCode(e.target.value);
        promoCode = e.target.value;
    }
    const handleOnSubmit = () => {
        alert(`Confirm the details of your promo code`);
    }

    return (
        <div className="bg-slate-500 flex w-full h-auto">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">Create Promo Code</div>
                <div className="w-full flex flex-col items-center">
                    <div className='w-full lg:w-1/2'>
                        <form className='text-white border-4 rounded-lg p-2'>
                            <div className='flex flex-col text-center font-semibold mt-10'>
                                <label htmlFor="promo_Code">Promo-Code Name</label>
                                <input type="text" name="promo_Code" onChange={handlepromoCode} placeholder='E.g. Diwali10, NewYear15, etc.' className='p-2 m-4 text-center h-auto md:h-14 font-semibold rounded-lg bg-black shadow-lg shadow-black' />
                            </div>
                            <div className='flex flex-col text-center font-semibold'>
                                <label htmlFor="bonus_percent">Set Bonus Percent</label>
                                <input type="number" maxLength={2} min={5} max={50} name="bonus_percent" placeholder='E.g. 5,10,15,20,25 etc.' className='p-2 m-4 h-auto md:h-14 text-center font-semibold rounded-lg bg-black shadow-lg shadow-black' />
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

export default AgentsCreatePromo;
