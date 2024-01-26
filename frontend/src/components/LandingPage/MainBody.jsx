import React from 'react'
import Slider from './GamesSlider'
import MainBodyScroller from './MainBodyScroller'
import LandingPageSubscriptions from './Subscriptions'
import GamesCards from '../UsersPanel/GamesCards'
import GamesResult from './MainResultsComponent'
import ResultGamesColorComponent from './ResultPageGamesColorChange'
import LandingPageImagesMarquee from './ImagesMarquee'

function MainBody() {
    return (
        <div className='bg-slate-900'>
            {/* <MainBodyScroller /> */}
            <LandingPageImagesMarquee />
            <Slider />
            <GamesCards />
            <LandingPageSubscriptions />
            <ResultGamesColorComponent />
            <GamesResult />
        </div>
    )
}

export default MainBody;
