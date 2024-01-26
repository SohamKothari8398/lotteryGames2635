import React from 'react';
import Navbar from './Navbar';
import MarqueeText from './MarqueeText';
import Slider from './GamesSlider'
import LandingPageSubscriptions from './Subscriptions'
import GamesCards from '../Games/GamesCards'
import GamesResult from './MainResultsComponent'
import ResultGamesColorComponent from './ResultPageGamesColorChange'
import LandingPageImagesMarquee from './ImagesMarquee'
import MainBodyScroller from './MainBodyScroller'

function Home() {
    return (
        <div className='bg-slate-900'>
            <Navbar />
            <MarqueeText />
            <MainBodyScroller />
            <LandingPageImagesMarquee />
            <Slider />
            <GamesCards />
            <LandingPageSubscriptions />
            <ResultGamesColorComponent />
            {/* <GamesResult /> */}
        </div>
    );
}

export default Home;
