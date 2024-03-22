import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";

function GamesSetting() {
    const [gameDuration, setgameDuration] = useState(null);
    const [rewardAmount, setRewardAmount] = useState(null);
    // const [confirmation, setConfirmation] = useState(false);
    const navigate = useNavigate();

    const navigateToAdminPage = () => {
        navigate('/admin');
    }

    return (
        <div className="p-4 rounded-lg shadow-lg w-auto lg:w-[90%] m-auto h-auto border-4 pb-20 flex flex-col text-white">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className=" flex items-center mx-auto text-2xl md:text-4xl lg:text-6xl font-semibold w-auto p-4 m-4 text-white rounded-lg ">
                    Games Settings </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8">
                    <div className='w-full text-center mt-8  p-4 text-white'>
                        <form className="flex flex-col mb-4 text-lg md:text-xl lg:text-2xl font-bold items-center">
                            <div className="my-4 flex flex-col w-full md:w-[70%] lg:w-[60%]">
                                <label htmlFor="selected_game_name">Select Game</label>
                                <select name="selected_game_name" className='p-2 m-2 text-center font-bold rounded-lg bg-black shadow-md shadow-white '>
                                    <option value="Select Option">Select Option</option>
                                    <option value="Single Digit Lottery">Single Digit Lottery</option>
                                    <option value="Double Digit Lottery">Double Digit Lottery</option>
                                    <option value="Triple Digit Lottery">Triple Digit Lottery</option>
                                    <option value="ColourBall Game">ColourBall Game</option>
                                </select>
                            </div>
                            <div className="my-4 flex flex-col w-full md:w-[70%] lg:w-[60%]">
                                <label htmlFor="game_duration" className="mb-2 text-center">Set Duration <span className='font-medium text-sm'>(minutes)</span></label>
                                <input
                                    type="number" id="game_duration" name="game_duration"
                                    value={gameDuration} onChange={(e) => setgameDuration(e.target.value)}
                                    min={0} max={59} maxLength={2}
                                    placeholder="Set your game duration here"
                                    className='p-2 m-2 text-center rounded-lg font-bold bg-black shadow-md shadow-white '
                                />
                            </div>
                            <div className="my-4 flex flex-col w-full md:w-[70%] lg:w-[60%]">
                                <label htmlFor="reward_amount" className="mb-2 text-center">Reward Amount</label>
                                <input type="number" id="reward_amount" name="reward_amount" value={rewardAmount}
                                    onChange={(e) => setRewardAmount(e.target.value)}
                                    min={0} maxLength={4}
                                    placeholder="Reward Multiplier e.g. 1,2,3,4,5"
                                    className='p-2 m-2 text-center rounded-lg font-bold bg-black shadow-md shadow-white '
                                />
                            </div>
                            {/* <div className="my-4 flex flex-col w-full md:w-[70%] lg:w-[60%] bg-black font-bold rounded-xl border-4">
                                    <div className='my-4 flex flex-col items-center text-center'>
                                        <div className="flex font-medium my-4">Game Status: </div>
                                        <div className="grid lg:grid-cols-3">
                                            <div className="flex items-center mx-4 justify-center">
                                                <input
                                                    type="checkbox"
                                                    id="gameLocked"
                                                    name="gameLocked"
                                                    className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                                <label htmlFor="gameLocked" className="font-medium">Locked</label>
                                            </div>
                                            <div className="flex items-center mx-4 justify-center">
                                                <input
                                                    type="checkbox"
                                                    id="gameActive"
                                                    name="gameActive"
                                                    className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                                <label htmlFor="gameActive" className="font-medium">Active</label>
                                            </div>
                                            <div className="flex items-center mx-4 justify-center">
                                                <input
                                                    type="checkbox"
                                                    id="gameNA"
                                                    name="gameNA"
                                                    className="border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
                                                />
                                                <label htmlFor="gameNA" className="font-medium">Coming Soon</label>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            <div className="flex mt-12 justify-center">
                                <button type="button" className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded`}>
                                    Submit
                                </button>
                            </div>
                        </form>
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

export default GamesSetting;
