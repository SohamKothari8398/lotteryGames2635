import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillRightSquare, AiFillLeftSquare } from 'react-icons/ai';
import { RxDotFilled } from 'react-icons/rx';
import img3 from '../../assets/img3.webp';
import img4 from '../../assets/img4.webp';
import lottery from '../../assets/lotteryBg.webp';
import ludo from '../../assets/ludoBgImg.png';
import poker from '../../assets/pokerBg.webp';
import andarbahar from '../../assets/andarBaharBg.webp';
import teenpatti from '../../assets/teenpattiBg.webp';
import colorball from '../../assets/colorballBg.webp';

function LandingPageGamesSlider() {
    const imageArray = [img3, img4, lottery, ludo, poker, andarbahar, teenpatti, colorball];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const navigateGamesPage = () => {
        navigate("/games");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000); // Change image every 5 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const prevImage = () => {
        const newImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
        setCurrentImageIndex(newImageIndex);
    }

    const nextImage = () => {
        const newImageIndex = (currentImageIndex + 1) % imageArray.length;
        setCurrentImageIndex(newImageIndex);
    }

    const goToImage = (imageIndex) => {
        setCurrentImageIndex(imageIndex);
    }

    return (
        <div className='flex flex-col h-[70vh] w-full m-auto oy-16 px-4 relative group'>
            {/* Left Fade Effect */}
            <div className='absolute left-0 h-full w-[40%] bg-gradient-to-r from-black to-transparent'></div>

            {/* Right Fade Effect */}
            <div className='absolute right-0 h-full w-[40%] bg-gradient-to-l from-black to-transparent'></div>

            {/* <div className='absolute top-0 h-[7%] w-full bg-gradient-to-l from-black to-transparent'></div> */}
            <div
                className='w-[90%] h-[90%] m-auto rounded-lg bg-center bg-cover duration-500 grid grid-cols-2 gap-2'
                style={{ backgroundImage: `url(${imageArray[currentImageIndex]})` }}
            >
                {/*Fade Effect */}
                <div className='absolute left-0 h-[90%] w-[20%] bg-gradient-to-r from-black to-transparent'></div>
                <div className='absolute right-0 h-[90%] w-[20%] bg-gradient-to-l from-black to-transparent'></div>
                {/* Left Button */}
                <div className='  z-20 hidden group-hover:block absolute top-[50%] -translate-x-0 left-2 translate-y-[-50%] rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <AiFillLeftSquare onClick={prevImage} size={50} style={{ color: 'grey' }} />
                </div>
                {/* Right Button */}
                <div className=' z-20 hidden group-hover:block absolute top-[50%] -translate-x-0 right-2 translate-y-[-50%] rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <AiFillRightSquare onClick={nextImage} size={50} style={{ color: 'grey' }} />
                </div>
                {/* Play Now Button */}
                <div className='absolute inset-0 w-full flex h-full justify-center items-end  rounded-2xl text-white' style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <button onClick={navigateGamesPage} className='bg-slate-900 m-auto outline outline-2 mb-20  hover:bg-white hover:text-slate-900 text-white font-bold py-2 px-4 rounded'>
                        Play Now
                    </button>
                </div>
            </div>
            <div className='top-4 flex flex-row justify-center py-2'>
                {imageArray.map((image, imageIndex) => (
                    <div
                        key={image}
                        onClick={() => goToImage(imageIndex)}
                        className='text-2xl cursor-pointer'
                    >
                        <RxDotFilled style={{ color: 'white' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPageGamesSlider;
