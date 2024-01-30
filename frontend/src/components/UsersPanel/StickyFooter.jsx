import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidOffer } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdHelp } from 'react-icons/md';
import { GiWallet } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

function UserStickyFooter() {

    const navigate = useNavigate();

    // Define a function to navigate to /afterLogin/home
    const navigateToHome = () => {
        navigate('/user/home');
    };
    const navigateToProfile = () => {
        navigate('/user/profile');
    };
    const navigateToGames = () => {
        navigate('/games');
    };
    const navigateToUserWallet = () => {
        navigate('/user/wallet');
    };
    const navigateToHelpCenter = () => {
        navigate('/helpCenter');
    };
    const navigateToUserResult = () => {
        navigate('/user/result');
    };
    const navigateToUserOffers = () => {
        navigate('/user/offers');
    };

    return (
        <nav className="fixed top-100 text-white left-0 right-0 w-full bottom-1 bg-slate-900 h-[12%] md:h-[8%] lg:h-[12%] justify-center items-center ">
            <div className="mx-auto flex font-bold items-center space-x-4 overflow-x-auto">
                <div className="w-full h-full text-sm md:text-lg lg:text-xl grid grid-cols-6 gap-20 md:gap-10">
                    <div onClick={navigateToHome} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white text-sm md:text-lg lg:text-xl w-10 h-30 md:w-24 lg:w-30 ">
                        <AiFillHome size={35} />
                        Home
                    </div>
                    <div onClick={navigateToGames} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white text-sm md:text-lg lg:text-xl w-10 h-30 md:w-24 lg:w-30 ">
                        <FaGamepad size={35} />
                        <span>Games</span>
                    </div>
                    <div onClick={navigateToProfile} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white text-sm md:text-lg lg:text-xl w-10 h-30 md:w-24 lg:w-30 ">
                        <CgProfile size={35} />
                        <span>Profile</span>
                    </div>
                    {/* <div onClick={navigateToUserResult} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white text-sm md:text-lg lg:text-xl w-10 h-30 md:w-24 lg:w-30 ">
                        <TbFileAnalytics size={35} />
                        <span>History</span>
                    </div> */}
                    <div onClick={navigateToUserOffers} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white text-sm md:text-lg lg:text-xl w-10 h-30 md:w-24 lg:w-30 ">
                        <BiSolidOffer size={35} />
                        <span>Offers</span>
                    </div>
                    <div onClick={navigateToUserWallet} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white text-sm md:text-lg lg:text-xl w-10 h-30 md:w-24 lg:w-30 ">
                        <GiWallet size={35} />
                        <span>Wallet</span>
                    </div>
                    <div onClick={navigateToHelpCenter} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white text-sm md:text-lg lg:text-xl w-10 h-30 md:w-24 lg:w-30 ">
                        <MdHelp size={35} />
                        <span>Help</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default UserStickyFooter;
