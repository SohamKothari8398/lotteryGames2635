import React, { useState } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { FaWindowClose, FaPowerOff } from 'react-icons/fa';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import logo from '../../assets/up365Logo.webp';
import { useLogout } from '../../hooks/useLogout';


// Comonent
function AdminNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useLogout();
    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const handleLogout = () => {
        logout();
    };

    const renderMenu = () => {
        if (!isMenuOpen) {
            return null;
        }
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center">
                <div className="bg-slate-500 absolute w-[65vw] h-[65vh] m-auto rounded-lg top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                    <ul className="flex flex-col">
                        {/* <li className="border-b-2 p-2"> USERID : ABCD1234xyz!@#</li>
                        <li className="border-b-2 p-2"> Referal Code :  ABCD1234</li> */}
                        <li>
                            <button onClick={handleLogout} className="w-auto ml-2 mt-2 border-transparent text-sm underline underline-offset-2 hover:border-red-600 flex text-red-600 font-bold flex-row p-2 rounded-lg transition duration-300 ease-in-out">
                                <FaPowerOff size={25} style={{ color: 'red' }} /> <span className="p-1"> </span> Logout
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
        <nav className="text-white p-4 sticky top-0 z-20">
            < div className="container mx-auto flex justify-between items-center" >
                <div className="text-xl flex text-white items-center">
                    <div>
                        <img src={logo} alt="logo not available" className='h-16 md:h-20 w-40 lg:w-44 mr-4 rounded-xl' />
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
                </div>

                <div className="hidden font-bold md:flex lg:flex xl:flex  space-x-4">
                    <ul className="ml-4 font-semibold text-xs md:text-xl lg:text-xl flex space-x-4">
                        <li className="flex flex-row border-b-4 pb-2">
                            Welcome Home Admin
                        </li>
                        <li>
                            <div className=" flex flex-col text-white items-center">
                                <button className=" w-auto mt-2 hover:bg-white hover:text-slate-900 p-2 ml-4 font-semibold text-sm lg:text-xl rounded-lg flex flex-row   focus:outline-none  transition duration-300 ease-in-out">
                                    <BiSolidMessageSquareEdit size={25} /> <span className='p-1'></span> Notifications
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='hidden font-bold md:flex lg:flex xl:flex'>
                    <ul className="flex flex-row">
                        <li>
                            <button onClick={handleLogout} className="w-auto ml-2 mt-2 border-transparent text-sm underline underline-offset-2 hover:border-red-600 flex text-red-600 font-bold flex-row p-2 rounded-lg transition duration-300 ease-in-out">
                                <FaPowerOff size={25} style={{ color: 'red' }} /> <span className="p-1"> </span> Logout
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="flex md:hidden lg:hidden">
                    <button onClick={handleMenuClick} className="w-10 h-10 rounded-full">
                        <TiThMenu size={30} />
                    </button>
                </div>
                {renderMenu()}
            </div >
        </nav >
    );
};
export default AdminNavbar;

