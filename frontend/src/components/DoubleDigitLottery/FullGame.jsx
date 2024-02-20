import React from 'react'
import Form from './Form'
import GameTable from './GameTable'
import BetsTable from './BetsTable'
import { useNavigate } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';
import History from './History';
import useScrollToTop from '../../hooks/useScrollToTop';

function Game() {
    useScrollToTop();
    const navigate = useNavigate();
    const navigateToBack = () => {
        navigate(-1);
    }
    return (
        <div className='bg-black text-white font-bold'>
            <Form />
            <GameTable />
            <BetsTable />
            <History />
            {/** <Analytics/> */}
            <button onClick={navigateToBack} className="fixed text-red-500 rounded-lg bg-white top-2 right-4 z-10 ">
                <FaWindowClose size={30} className='shadow-lg shadow-red-500' />
            </button>
        </div>
    )
}

export default Game;