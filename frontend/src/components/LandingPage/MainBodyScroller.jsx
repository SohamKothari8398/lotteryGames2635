import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidOffer } from 'react-icons/bi';
import { MdFiberNew } from 'react-icons/md';
import { GiWallet, GiCoins } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

function MainBodyScroller() {
    const navigate = useNavigate();
    const navigateGamesPage = () => {
        navigate('/games');
    }
    return (
        <nav className="bg-slate-900 text-white p-2 pt-4 sticky top-24 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4 overflow-x-auto max-w-screen-md">
                    <div className="flex space-x-5">
                        <div className="flex flex-col ml-2 items-center border-b-2 border-transparent hover:border-white cursor-pointer">
                            <AiFillHome size={25} />
                            <span>Home</span>
                        </div>
                        <div onClick={navigateGamesPage} className="flex flex-col ml-2 items-center border-b-2 border-transparent hover:border-white cursor-pointer">
                            <FaGamepad size={25} />
                            <span>Games</span>
                        </div>
                        <div className="flex flex-col ml-2 items-center border-b-2 border-transparent hover:border-white cursor-pointer">
                            <GiCoins size={25} />
                            <span>Casino</span>
                        </div>
                        <div className="flex flex-col ml-2 items-center border-b-2 border-transparent hover:border-white cursor-pointer">
                            <MdFiberNew size={25} />
                            <span>New</span>
                        </div>
                        <div className="flex flex-col ml-2 items-center border-b-2 border-transparent hover:border-white cursor-pointer">
                            <BiSolidOffer size={25} />
                            <span>Offers</span>
                        </div>
                        <div className="flex flex-col ml-2 items-center border-b-2 border-transparent hover:border-white cursor-pointer">
                            <GiWallet size={25} />
                            <span>Wallet</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default MainBodyScroller;
