import React, { useState } from 'react';
import './AdsSlider.css';

// Import your images here
import img3 from '../../assets/img3.webp';
import img4 from '../../assets/img4.webp';
import img7 from '../../assets/img7.webp';
import img8 from '../../assets/3DLottery.webp';
import lottery from '../../assets/lotteryBg.webp';
import ludo from '../../assets/ludoBgImg.webp';
import poker from '../../assets/pokerBg.webp';
import andarbahar from '../../assets/andarBaharBg.webp';
import teenpatti from '../../assets/teenpattiBg.webp';
import colorball from '../../assets/colorballBg.webp';
import { useNavigate } from 'react-router-dom';

const images = [img3, img4, lottery, ludo, poker, andarbahar, teenpatti, colorball, img3, img4, lottery, ludo, poker, andarbahar, teenpatti, colorball, img7, img8];

function LandingPageImagesMarquee() {
    const [image] = useState(null);
    const navigate = useNavigate()
    // const onImageChange = (event) => {
    //     if (event.target.files && event.target.files[0]) {
    //         setImage(URL.createObjectURL(event.target.files[0]));
    //     }
    // };
    const navigateToGames = () => {
        navigate('/games');
    }
    // const addImage = () => {
    //     if (image) {
    //         images.push(image);
    //         setImage(null);
    //     }
    // };

    return (
        <div className="marquee-container cursor-pointer my-3 mt-5 flex flex-col">
            <div className="marquee">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={navigateToGames}
                        alt={`Image ${index}`}
                        className="marquee-item image-container border-4 border-slate-900 rounded-lg hover:border-red-700"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                ))}
            </div>
            {/* <input type="file" onChange={onImageChange} className="filetype mt-10 z-50 text-white text-center fotn-bold" /> */}
            {image && (
                <div>
                    {/* <img
                        alt="preview image"
                        src={image}
                        className="image-container border-4 border-slate-900 rounded-lg hover:border-red-700"
                    />
                    <button onClick={addImage} className='z-50 bg-white text-black font-bold'>Add Image</button> */}
                </div>
            )}
        </div>
    );
}

export default LandingPageImagesMarquee;
