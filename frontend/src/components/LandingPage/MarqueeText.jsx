import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarqueeText.css';

function LandingPageMarqueeText() {
    const [marqueeText, setMarqueeText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/promoLink');
                const sliderText = response.data.adsSliderText;
                setMarqueeText(sliderText);
                console.log(marqueeText);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [marqueeText]);

    return (
        <div className="cursor-pointer sticky bg-black font-bold text-xl w-full h-12 hover:scale-150">
            <div className="animate-marquee w-full h-full flex justify-items-center">
                <span className="marquee-content my-auto animate-color-change">
                    {marqueeText}
                </span>
            </div>
        </div>
    );
}

export default LandingPageMarqueeText;
