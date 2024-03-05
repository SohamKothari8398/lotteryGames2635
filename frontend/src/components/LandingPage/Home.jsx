import React from 'react';
import Navbar from './Navbar';
import MarqueeText from './MarqueeText';
import Slider from './GamesSlider'
import LandingPageSubscriptions from './Subscriptions'
import GamesCards from '../Games/GamesCards'
import ResultGamesColorComponent from './ResultPageGamesColorChange'
import LandingPageImagesMarquee from './ImagesMarquee'
import MainBodyScroller from './MainBodyScroller'
import { BsWhatsapp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';

function Home() {
    useScrollToTop();
    const navigate = useNavigate();
    const handleHelpClick = () => { navigate('/helpCenter'); };
    return (
        <div className=''>
            <Navbar />
            <MarqueeText />
            <MainBodyScroller />
            <LandingPageImagesMarquee />
            <Slider />
            <GamesCards />
            <LandingPageSubscriptions />
            <ResultGamesColorComponent />
            <div className='w-full bg-white h-full'>
                <button onClick={handleHelpClick} className="fixed  flex flex-row z-50 w-auto h-auto bottom-8 md:left-4 bg-green-600 hover:bg-white hover:text-black p-1 outline sm:outline-4 outline-white ml-4 font-bold text-xl rounded-full">
                    <BsWhatsapp className='h-8 w-8 sm:h-10 sm:w-10' />
                </button>
            </div>
            {/* <GamesResult /> */}
        </div>
    );
}

export default Home;
