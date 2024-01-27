import React from 'react'
import Slider from './GamesSlider'
import LandingPageSubscriptions from './Subscriptions'
import GamesCards from '../UsersPanel/GamesCards'
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
            <ResultGamesColorComponent />\
        </div>
    )
}

export default MainBody;
