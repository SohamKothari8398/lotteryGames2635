import React, { useState } from 'react';
import { LuPhoneCall } from 'react-icons/lu';
import { TiThMenu } from 'react-icons/ti';
import { FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/up365Logo.jpeg';

function LandingPageNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const navigateToLoginForm = () => { navigate('/login'); };
    const handleRegisterClick = () => { navigate('/register'); };
    const handleMenuClick = () => { setIsMenuOpen(!isMenuOpen); };
    const handleHelpClick = () => { navigate('/helpCenter'); };

    const renderMenu = () => {
        if (!isMenuOpen) {
            return null;
        }
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex justify-center items-center">
                <div className="bg-slate-900 absolute w-[60vw] h-[65vh] m-auto rounded-lg top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                    <ul className="m-auto font-bold flex flex-col space-x-4">
                        {/* <li className="ml-4 mt-2 flex flex-row p-2 outline outline-2 hover:bg-white hover:text-slate-900 outline-white rounded-lg h-10" >
                            <CgGames size={30} /> <span className='p-1'> </span> Games
                        </li>
                        <li className="mt-2">
                            <a href="https://casino.mi.betmgm.com/en/games?wm=&btag=&tdpeh=&pid=" rel="noreferrer" className='flex p-2 flex-row hover:bg-white hover:text-slate-900 outline outline-2 outline-white rounded-lg h-10' target='_blank'>
                                <PiPokerChipBold size={30} /> <span className='p-1'> </span> Casino
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="https://casino.nj.partycasino.com/en/games" rel="noreferrer" className='flex flex-row hover:bg-white hover:text-slate-900  p-2 outline outline-2 outline-white rounded-lg h-10' target='_blank'>
                                <ImTicket size={25} /> <span className='p-1'> </span> Lottery
                            </a>
                        </li> */}
                        <li>
                            <button onClick={handleHelpClick} className="hover:bg-white hover:text-slate-900 mt-2 p-2 font-bold flex flex-row outline outline-2 outline-white rounded-lg h-10">
                                <LuPhoneCall size={25} /> <span className='p-1'> </span> Help Center
                            </button>
                        </li>
                        <li>
                            <button onClick={navigateToLoginForm} className="w-32  hover:bg-white hover:text-slate-900 mt-2 outline outline-2 outline-white  p-2 text-xl font-semibold rounded-lg h-10">
                                Log In
                            </button>
                        </li>
                        <li>
                            <button onClick={handleRegisterClick} className=" w-32 mt-2 hover:bg-white hover:text-slate-900 p-2 outline outline-2 outline-white font-semibold text-xl rounded-lg h-10">
                                Register
                            </button>
                        </li>
                    </ul>

                    <button onClick={handleMenuClick} className="absolute top-4 right-4 z-50">
                        <FaWindowClose size={30} style={{ color: 'red' }} />
                    </button>
                </div>
            </div>
        );
    };


    return (
        <nav className="bg-slate-900 text-white p-4 sticky top-0 z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl flex text-white items-center">
                    <div>
                        <img src={logo} alt="logo not available" className='h-16 md:h-20 w-44 mr-4 rounded-xl' />
                    </div>
                    <div className='hover:text-yellow-600 flex italic font-bold mr-10'>
                        <div className='text-3xl md:text-5xl lg:text-6xl'>UP</div>
                        <div className='flex flex-col mt-2 ml-2 text-xs md:text-sm lg:text-lg'>
                            <div>
                                365
                            </div>
                            <div className='-ml-4 lg:-ml-6'>
                                Gaming
                            </div>
                        </div>
                    </div>
                    {/* <div className='hover:text-yellow-800 border-none italic text-3xl md:text-5xl lg:text-7xl font-bold mr-10'>UP365</div> */}
                </div>

                {/* <div className="hidden lg:flex xl:flex">
                    <ul className="ml-4 font-semibold flex space-x-4">
                        <li className="hover:text-slate-500 flex flex-row border-b-4 hover:border-b-slate-500">
                            <CgGames size={30} /> <span className='p-1'> </span> Games
                        </li>
                        <li className="hover:text-slate-500  border-b-4 hover:border-b-slate-500">
                            <a href="https://casino.mi.betmgm.com/en/games?wm=&btag=&tdpeh=&pid=" rel="noreferrer" className='flex flex-row' target='_blank'>
                                <PiPokerChipBold size={30} /> <span className='p-1'> </span> Casino
                            </a>
                        </li>
                        <li className="hover:text-slate-500 border-b-4 hover:border-b-slate-500">
                            <a href="https://casino.nj.partycasino.com/en/games" rel="noreferrer" className='flex flex-row' target='_blank'>
                                <ImTicket size={25} /> <span className='p-1'> </span> Lottery
                            </a>
                        </li>
                    </ul>
                </div> */}
                <div className='hidden font-bold lg:flex xl:flex  space-x-4'>
                    <ul className="flex flex-row">
                        <li>
                            <button onClick={handleHelpClick} className=" w-32 mt-2 hover:bg-white hover:text-slate-900 p-2 outline outline-2 outline-white ml-4 font-semibold text-xl rounded-sm h-10 flex flex-ro">
                                <LuPhoneCall size={25} /> <span className='p-2'> </span> Help
                            </button>
                        </li>
                        <li>
                            <button onClick={navigateToLoginForm} className=" w-32 mt-2 hover:bg-white hover:text-slate-900 p-2 outline outline-2 outline-white ml-4 font-semibold text-xl rounded-lg h-10">
                                Log In
                            </button>
                        </li>
                        <li>
                            <button onClick={handleRegisterClick} className="  w-32 mt-2 hover:bg-white hover:text-slate-900 p-2 outline outline-2 outline-white ml-4 font-semibold text-xl rounded-lg h-10">
                                Register
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="flex lg:hidden xl:hidden">
                    <button onClick={handleMenuClick} className="w-10 h-10 rounded-full">
                        <TiThMenu size={30} />
                    </button>
                </div>
                {renderMenu()}
            </div>
        </nav>
    );
};
export default LandingPageNavbar;

