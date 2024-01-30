import React, { useEffect, useState } from 'react';
import lottery from '../../assets/lotteryBg.jpg';
import ludo from '../../assets/ludoBgImg.png';
import poker from '../../assets/pokerBg.jpg';
import andarBahar from '../../assets/andarBaharBg.jpg';
import teenpatti from '../../assets/teenpattiBg.jpg';
import colorball from '../../assets/colorballBg.jpg';
import { ImYoutube } from 'react-icons/im';
import { FaWindowClose, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useService } from '../../hooks/useService';


const GamesCards = () => {
    const { user } = useAuthContext();
    const service = useService();
    const [showVideo, setShowVideo] = useState(false);
    const [showVideo2, setShowVideo2] = useState(false);
    const [showVideo3, setShowVideo3] = useState(false);
    const [showVideo4, setShowVideo4] = useState(false);
    const [videoLink, setVideoLink] = useState("");
    const [videoLink2, setVideoLink2] = useState("");
    const [videoLink3, setVideoLink3] = useState("");
    const [videoLink4, setVideoLink4] = useState("");

    // Navigators
    const navigate = useNavigate();

    const navigateToBack = () => {
        navigate(-1);
    }
    const navigateToSingleDigitLotteryGame = () => {
        if (user) { navigate('/games/singleDigitLottery') } else navigate('/login');
    }
    const navigateToDoubleDigitLotteryGame = () => {
        if (user) { navigate('/games/doubleDigitLottery'); } else navigate('/login');
    }
    const navigateToTripleDigitLotteryGame = () => {
        if (user) { navigate('/games/tripleDigitLottery'); } else navigate('/login');
    }
    const navigateToColorBallLotteryGame = () => {
        if (user) { navigate('/games/colorBallLottery'); } else navigate('/login');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await service.get('/promoLinks'); // Assuming your backend route is /api/promoLinks
                // Axios automatically parses JSON, so you can directly access the data property
                const data = response.data;
                // Update the videoLink states based on the fetched promoLinks
                if (data) {
                    setVideoLink(data.singleDigitLottery);
                    setVideoLink2(data.doubleDigitLottery);
                    setVideoLink3(data.tripleDigitLottery);
                    setVideoLink4(data.colorballGame);
                }
            } catch (error) {
                console.error('Error fetching promo links:', error);
            }
        };

        fetchData();
    }, []);    // Empty dependency array ensures the effect runs only once on component mount


    const handleShowVideoClick = () => {
        setShowVideo(!showVideo);
    }
    const renderShowVideo = () => {
        if (!showVideo) {
            return null;
        }
        return (
            <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-auto bg-black/40 flex justify-center items-center z-20'>
                <div className='border-4 border-white mt-10 w-[90%] h-[90%]'>
                    <iframe title='video_1' className='w-full h-full'
                        src={videoLink} >
                    </iframe>
                </div>
                <button onClick={handleShowVideoClick} className="absolute rounded-lg top-4 right-5 z-10">
                    <FaWindowClose size={30} className='text-red-600 shadow-md shadow-slate-900 bg-white rounded-lg' />
                </button>
            </div>
        );
    }
    const handleShowVideo2Click = () => {
        setShowVideo2(!showVideo2);
    }
    const renderShowVideo2 = () => {
        if (!showVideo2) {
            return null;
        }
        return (
            <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-auto bg-black/40 flex justify-center items-center z-20'>
                <div className='border-4 border-white mt-10 w-[90%] h-[90%]'>
                    <iframe title='video_2' className='w-full h-full'
                        src={videoLink2}>
                    </iframe>
                </div>
                <button onClick={handleShowVideo2Click} className="absolute rounded-lg top-4 right-5 z-10">
                    <FaWindowClose size={30} className='text-red-600 shadow-md shadow-slate-900 bg-white rounded-lg' />
                </button>
            </div>
        );
    }
    const handleShowVideo3Click = () => {
        setShowVideo3(!showVideo3);
    }
    const renderShowVideo3 = () => {
        if (!showVideo3) {
            return null;
        }
        return (
            <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-auto bg-black/40 flex justify-center items-center z-20'>
                <div className='border-4 border-white mt-10 w-[90%] h-[90%]'>
                    <iframe title='video_2' className='w-full h-full'
                        src={videoLink3}>
                    </iframe>
                </div>
                <button onClick={handleShowVideo3Click} className="absolute rounded-lg top-4 right-5 z-10">
                    <FaWindowClose size={30} className='text-red-600 shadow-md shadow-slate-900 bg-white rounded-lg' />
                </button>
            </div>
        );
    }
    const handleShowVideo4Click = () => {
        setShowVideo4(!showVideo4);
    }
    const renderShowVideo4 = () => {
        if (!showVideo4) {
            return null;
        }
        return (
            <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-auto bg-black/40 flex justify-center items-center z-20'>
                <div className='border-4 border-white mt-10 w-[90%] h-[90%]'>
                    <iframe title='video_2' className='w-full h-full'
                        src={videoLink4}>
                    </iframe>
                </div>
                <button onClick={handleShowVideo4Click} className="absolute rounded-lg top-4 right-5 z-10">
                    <FaWindowClose size={30} className='text-red-600 shadow-md shadow-slate-900 bg-white rounded-lg' />
                </button>
            </div>
        );
    }

    return (
        <div className='w-full py-[5rem] flex flex-col'>
            <div className='text-7xl italic font-bold m-auto'>
                Games
            </div>
            <div className='text-2xl italic mt-10 w-[70%] text-start font-medium m-auto'>
                Lottery Games
            </div>
            <div className='w-[94%] mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <div className='w-[90%] m-auto  h-[25rem] shadow-white shadow-lg cursor-pointer text-white flex flex-col p-4 my-4 rounded-lg hover:scale-110 duration-300 border-4 '
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${lottery})`,
                    }}>
                    <div className='text-2xl md:text-3xl font-bold text-center  underline underline-offset-2 py-8'>Single Digit Lottery</div>
                    <div onClick={handleShowVideoClick} className='text-md md:text-md lg:text-xl mb-12  font-bold underline text-center flex flex-row justify-center'>
                        How to Play?<ImYoutube size={25} className='ml-4' />
                    </div>
                    <button onClick={navigateToSingleDigitLotteryGame} className='bg-white text-slate-900 hover:bg-green-400 w-[8rem] text-sm rounded-md font-bold m-2 mx-auto p-2'>Play Now</button>
                </div>
                <div className='w-[90%] m-auto  h-[25rem] shadow-white shadow-lg cursor-pointer text-white flex flex-col p-4 my-4 rounded-lg hover:scale-110 duration-300 border-4 '
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${lottery})`,
                    }}>
                    <div className='text-2xl md:text-3xl font-bold text-center  underline underline-offset-2 py-8'>Double Digit Lottery</div>
                    <div onClick={handleShowVideo2Click} className='text-md md:text-md lg:text-xl mb-12  font-bold underline text-center flex flex-row justify-center'>
                        How to Play?<ImYoutube size={25} className='ml-4' />
                    </div>
                    {/* <ul className='text-xs lg:text-md list-decimal ml-10 lg:mt-4'>
                                    <li className='py-1  mx-auto mt-1'>Select a number between range 00 to 99</li>
                                    <li className='py-1  mx-auto'>Enter Bet Amount</li>
                                    <li className='py-1  mx-auto'>Check the Results Section</li>
                                    <li className='py-1  mx-auto'>Winner 88x Bet Amount</li>
                                </ul> */}
                    <button onClick={navigateToDoubleDigitLotteryGame} className='bg-white text-slate-900 hover:bg-green-400 w-[8rem] text-sm rounded-md font-bold m-2 mx-auto p-2'>Play Now</button>
                    {/* <div className='flex bg-slate-900 w-[90%] rounded-lg text-xs font-bold md:text-md lg:text-lg m-auto'>
                        <p className='py-2 mx-8'>Players 4000 </p>
                        <p className='py-2 mx-8'>Prize 1000000 </p>
                    </div> */}
                </div>
                <div className='w-[90%] m-auto  h-[25rem] shadow-white shadow-lg cursor-pointer text-white flex flex-col p-4 my-4 rounded-lg hover:scale-110 duration-300 border-4 '
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${lottery})`,
                    }}>
                    <div className='text-2xl md:text-3xl font-bold text-center  underline underline-offset-2 py-8'>Triple Digit Lottery</div>
                    <div onClick={handleShowVideo3Click} className='text-md md:text-md lg:text-xl mb-12  font-bold underline text-center flex flex-row justify-center'>
                        How to Play?<ImYoutube size={25} className='ml-4' />
                    </div>
                    {/* <ul className='text-xs lg:text-md list-decimal ml-10 lg:mt-4'>
                                <li className='py-1  mx-auto mt-1'>Select a number between range 000 to 999</li>
                                <li className='py-1  mx-auto'>Enter Bet Amount</li>
                                <li className='py-1  mx-auto'>Check the Results Section</li>
                                <li className='py-1  mx-auto'>Winner 888x Bet Amount</li>
                            </ul> */}
                    <button onClick={navigateToTripleDigitLotteryGame} className='bg-white text-slate-900 hover:bg-green-400 w-[8rem] text-sm rounded-md font-bold m-2 mx-auto p-2'>Play Now</button>
                    {/* <div className='flex bg-slate-900 w-[90%] rounded-lg text-xs font-bold md:text-md lg:text-lg m-auto'>
                        <p className='py-2 mx-8'>Players 4000 </p>
                        <p className='py-2 mx-8'>Prize 1000000 </p>
                    </div> */}
                </div>
                <div className='w-[90%] m-auto  h-[25rem] shadow-white shadow-lg cursor-pointer text-white flex flex-col p-4 my-4 rounded-lg hover:scale-110 duration-300 border-4 '
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${colorball})`,
                    }}>
                    <div className='text-2xl md:text-3xl font-bold text-center  underline underline-offset-2 py-8'>Colour Ball Game</div>
                    <div onClick={handleShowVideo4Click} className='text-md md:text-md lg:text-xl mb-12  font-bold underline text-center flex flex-row justify-center'>
                        How to Play?<ImYoutube size={25} className='ml-4' />
                    </div>
                    <button onClick={navigateToColorBallLotteryGame} className='bg-white text-slate-900 hover:bg-green-400 w-[8rem] text-sm rounded-md font-bold m-2 mx-auto p-2'>Play Now</button>
                </div>
            </div>

            <div className='text-2xl italic text-white mt-10 w-[70%] text-start font-medium m-auto'>
                Other Games
            </div>
            <div className='w-[94%] mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <div className='w-[90%] m-auto  h-[25rem] shadow-white shadow-lg cursor-pointer text-white flex flex-col p-4 my-4 rounded-lg hover:scale-110 duration-300 border-4 '
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${ludo})`,
                    }}>
                    <div className='text-2xl md:text-3xl font-bold text-center  underline underline-offset-2 py-8'>Ludo : Multiplayer </div>
                    <div onClick={handleShowVideoClick} className='text-md md:text-md lg:text-xl mb-12  font-bold underline text-center flex flex-row justify-center'>
                        How to Play?<ImYoutube size={35} className='ml-4' />
                    </div>
                    <button onClick={navigateToSingleDigitLotteryGame} className='bg-white text-slate-900 hover:bg-green-400 w-[8rem] text-sm rounded-md font-bold m-2 mx-auto p-2'>Play Now</button>
                </div>
                <div className='w-[90%] m-auto  h-[25rem] shadow-white shadow-lg cursor-pointer text-white flex flex-col p-4 my-4 rounded-lg hover:scale-110 duration-300 border-4 '
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${poker})`,
                    }}>
                    <div className='text-2xl md:text-3xl font-bold text-center  underline underline-offset-2 py-8'>Poker</div>
                    <div onClick={handleShowVideoClick} className='text-xs md:text-sm lg:text-xl mb-12  font-bold underline text-center flex flex-row justify-center'>
                        How to Play?<ImYoutube size={25} className='ml-4' />
                    </div>
                    <button onClick={navigateToSingleDigitLotteryGame} className='bg-white text-slate-900 hover:bg-green-400 w-[8rem] text-sm rounded-md font-bold m-2 mx-auto p-2'>Play Now</button>
                </div>
                <div className='w-[90%] m-auto  h-[25rem] shadow-white shadow-lg cursor-pointer text-white flex flex-col p-4 my-4 rounded-lg hover:scale-110 duration-300 border-4 '
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${andarBahar})`,
                    }}>
                    <div className='text-2xl md:text-3xl font-bold text-center  underline underline-offset-2 py-8'>Andar Bahar</div>
                    <div onClick={handleShowVideoClick} className='text-xs md:text-sm lg:text-xl mb-12  font-bold underline text-center flex flex-row justify-center'>
                        How to Play?<ImYoutube size={25} className='ml-4' />
                    </div>
                    <button onClick={navigateToSingleDigitLotteryGame} className='bg-white text-slate-900 hover:bg-green-400 w-[8rem] text-sm rounded-md font-bold m-2 mx-auto p-2'>Play Now</button>
                </div>
                <div className='w-[90%] m-auto  h-[25rem] shadow-white shadow-lg cursor-pointer text-white flex flex-col p-4 my-4 rounded-lg hover:scale-110 duration-300 border-4 '
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${teenpatti})`,
                    }}>
                    <div className='text-2xl md:text-3xl font-bold text-center  underline underline-offset-2 py-8'>Teenpatti</div>
                    <div onClick={handleShowVideoClick} className='text-xs md:text-sm lg:text-xl mb-12  font-bold underline text-center flex flex-row justify-center'>
                        How to Play?<ImYoutube size={25} className='ml-4' />
                    </div>
                    <button onClick={navigateToSingleDigitLotteryGame} className='bg-white text-slate-900 hover:bg-green-400 w-[8rem] text-sm rounded-md font-bold m-2 mx-auto p-2'>Play Now</button>
                </div>
            </div >
            <div className="fixed top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToBack}>
                    <FaHome size={30} />
                </button>
            </div>
            {renderShowVideo()}
            {renderShowVideo2()}
            {renderShowVideo3()}
            {renderShowVideo4()}
        </div >
    );
};

export default GamesCards;
