import React, { useState } from 'react';
// import { LuPhoneCall } from 'react-icons/lu';
import { TiThMenu } from 'react-icons/ti';
import { FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/up365LogoDark.webp';

function LandingPageNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const navigateNull = () => { navigate(0) };
    const navigateToLoginForm = () => { navigate('/login'); };
    const handleRegisterClick = () => { navigate('/register'); };
    const handleMenuClick = () => { setIsMenuOpen(!isMenuOpen); };
    // const handleHelpClick = () => { navigate('/helpCenter'); };

    const renderMenu = () => {
        if (!isMenuOpen) {
            return null;
        }
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center">
                <div onClick={navigateNull} className='absolute top-8'>
                    <img src={logo} alt="logo not available" className='h-[4rem] w-[10rem] 2xs:h-[6rem] ml-8 cursor-pointer 2xs:w-[13rem] mr-4 rounded-xl' />
                </div>
                <div className="absolute w-full h-[65vh] m-auto rounded-lg top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                    <ul className="m-auto font-bold flex flex-col">
                        <li>
                            <button onClick={navigateToLoginForm} className=" w-32 mt-2 mb-6 hover:bg-white hover:text-slate-900 p-2 outline outline-2 outline-white font-semibold text-xl rounded-sm h-10">
                                Log In
                            </button>
                        </li>
                        <li>
                            <button onClick={handleRegisterClick} className=" w-32 mt-2 hover:bg-white hover:text-slate-900 p-2 outline outline-2 outline-white font-semibold text-xl rounded-sm h-10">
                                Register
                            </button>
                        </li>
                    </ul>
                </div>
                <button onClick={handleMenuClick} className="absolute top-4 right-4 z-50 bg-white rounded-sm shadow-sm shadow-white">
                    <FaWindowClose className=' text-red-600  h-[1.5rem] w-[1.5rem]' />
                </button>
            </div>
        );
    };


    return (
        <nav className="bg-black sticky text-white p-4 top-0 z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl flex w-full text-white items-center justify-center align-items-center py-2 md:justify-start md:align-items-start">
                    <div onClick={navigateNull} className='ml-10 sm:ml-0'>
                        <img src={logo} alt="logo not available" className='h-[6rem] w-[10rem] 2xs:h-[7rem] 2xs:w-[14rem] sm:h-[7.5rem] sm:w-[16rem] cursor-pointer  mr-4 rounded-xl' />
                    </div>
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
                <div className='hidden font-bold sm:flex space-x-4'>
                    <ul className="flex flex-row">
                        <li>
                            <button onClick={navigateToLoginForm} className=" w-32 mt-2 hover:bg-white hover:text-slate-900 p-2 outline outline-2 outline-white ml-4 font-semibold text-xl rounded-sm h-10">
                                Log In
                            </button>
                        </li>
                        <li>
                            <button onClick={handleRegisterClick} className="  w-32 mt-2 hover:bg-white hover:text-slate-900 p-2 outline outline-2 outline-white ml-4 font-semibold text-xl rounded-sm h-10">
                                Register
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="flex left-8 absolute sm:hidden">
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

