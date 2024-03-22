import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidOffer } from 'react-icons/bi';
import { FaHome } from "react-icons/fa";
import { useService } from '../../hooks/useService';

function OffersSettings() {
    const service = useService();
    const [showOfferSettings, setshowOfferSettings] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const navigate = useNavigate();
    const [deleteSubAdmin, setDeleteSubAdmin] = useState('');
    const handleDeleteAgentSubmit = () => {
        if (window.confirm(`Blocked Sub-Admin: ${deleteSubAdmin}`)) {
        } else {
            alert('Action Cancelled');
        }
    };
    // This will be for future
    const navigateToAdminPage = () => {
        navigate('/admin');
    }
    const handleshowOfferSettings = () => {
        setshowOfferSettings(!showOfferSettings);
    };

    return (
        <div className="p-4 rounded-lg shadow-lg w-auto lg:w-[90%] m-auto h-auto border-4 pb-20 flex flex-col text-white">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div onClick={handleshowOfferSettings} className="text-2xl flex items-center mx-auto md:text-4xl lg:text-6xl font-semibold w-auto p-4 m-4 text-white rounded-lg ">
                    <BiSolidOffer size={35} className='mr-10' /> Offers Settings </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8 text-center">
                    <div className='w-full md:w-2/3'>
                        <div> 1. Create Offer, </div>
                        <div> 2. Block / Lock Offer </div>
                        <div> 3. Delete Offer, </div>
                        <div> 4. Edit Offer, </div>
                        <div className="mt-8 w-auto p-4">
                            <div className="w-full flex flex-col items-center">
                                <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 font-bold border-2 mt-8 rounded-full my-8">Add Special Offers</div>
                                <div className="w-full flex flex-col items-center">
                                    <form action={`/admin/settings`} className='text-white border-4 rounded-lg p-2 w-full'>
                                        <div className='flex flex-col text-center font-semibold mt-10'>
                                            <label htmlFor="special_Offers_Code">Offer Name</label>
                                            <input type="text" name="special_Offers_Code" placeholder='E.g. Diwali10, NewYear15, etc.' className='mb-4 h-auto text-center md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white shadow-lg shadow-black' />
                                        </div>
                                        <div className='flex flex-col text-center font-semibold'>
                                            <label htmlFor="bonus_percent">Set Bonus Percent</label>
                                            <input type="number" maxLength={2} min={5} max={50} name="bonus_percent" placeholder='E.g. 5,10,15,20,25 etc.' className='mb-4 h-auto text-center md:h-14 font-semibold rounded-lg border-4 border-white bg-white shadow-lg shadow-black' />
                                        </div>
                                        <div className='flex flex-col text-center font-semibold'>
                                            <label htmlFor="selected_game_name">Select Game</label>
                                            <select name="selected_game_name" className='mb-4 h-auto text-center md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white shadow-lg shadow-black'>
                                                <option value="Select Option">Select Option</option>
                                                <option value="All Games">All Games</option>
                                                <option value="Single Digit Lottery">Single Digit Lottery</option>
                                                <option value="Double Digit Lottery">Double Digit Lottery</option>
                                                <option value="Triple Digit Lottery">Triple Digit Lottery</option>
                                                <option value="ColourBall Number Game">ColourBall Number Game</option>
                                                <option value="ColourBall Colour Game">ColourBall Colour Game</option>
                                                <option value="ColourBall Game">ColourBall Game</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className='flex justify-center'>
                                            <button type='submit' className='w-1/4 md:w-1/4 h-auto md:h-12 bg-blue-500 font-bold rounded-lg p-2 m-4 hover:bg-white hover:text-blue-900 shadow-sm shadow-white'>Submit</button>
                                        </div>
                                        <div className='text-center text-xs md:text-sm'>Instructions Text for the user setting discount percent.</div>
                                    </form>
                                </div>
                                <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 font-bold border-2 my-8 rounded-full">Edit Offer</div>
                                <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                    <div className='flex flex-col text-center font-semibold w-full mt-4'>
                                        <label htmlFor="special_Offers_Code" className='my-4'>Offer Name</label>
                                        <input type="text" name="special_Offers_Code" placeholder='E.g. Diwali10, NewYear15, etc.' className='text-center h-auto md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white shadow-lg shadow-black' />
                                    </div>
                                    <div className='flex flex-col w-full text-center font-semibold'>
                                        <label htmlFor="selected_game_name" className='my-4'>Select Game</label>
                                        <select name="selected_game_name" className='text-center w-full h-auto md:h-14 font-semibold rounded-lg border-4 border-white bg-white shadow-lg shadow-black'>
                                            <option value="Select Option">Select Option</option>
                                            <option value="All Games">All Games</option>
                                            <option value="Single Digit Lottery">Single Digit Lottery</option>
                                            <option value="Double Digit Lottery">Double Digit Lottery</option>
                                            <option value="Triple Digit Lottery">Triple Digit Lottery</option>
                                            <option value="ColourBall Game">ColourBall Game</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <label className="block my-4 text-center font-medium">Change Bonus Percent</label>
                                    <input type="number"
                                        className='p-2 m-4 text-center h-auto md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white shadow-lg shadow-black'
                                    />
                                    <button onClick={handleDeleteAgentSubmit} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:border-4 hover:bg-blue-900">
                                        Change
                                    </button>
                                </form>
                                <div className="text-xl md:text-2xl lg:text-4xl bg-black p-4 font-bold border-2 my-8 rounded-full">Remove Offer</div>
                                <form className='flex flex-col mx-auto items-center text-lg md:text-xl lg:text-2xl border-4 rounded-lg p-4 m-4 w-full'>
                                    <div className='flex flex-col text-center w-full font-semibold mt-10'>
                                        <label htmlFor="special_Offers_Code">Offer Name</label>
                                        <input type="text" name="special_Offers_Code" placeholder='E.g. Diwali10, NewYear15, etc.' className='text-center h-auto md:h-14 font-semibold rounded-lg border-4 border-white w-full bg-white shadow-lg shadow-black' />
                                    </div>
                                    <button onClick={handleDeleteAgentSubmit} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:border-4 hover:bg-red-700">
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
        </div >
    );
};

export default OffersSettings;
