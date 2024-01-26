import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaYoutube } from 'react-icons/fa';
import { BsFileText } from 'react-icons/bs';
import { RiImageAddLine } from 'react-icons/ri';
import LandingPageMarqueeText from '../LandingPage/MarqueeText';
import LandingPageGamesSlider from '../LandingPage/GamesSlider';
import LandingPageImagesMarquee from '../LandingPage/ImagesMarquee';
import GamesCards from '../Games/GamesCards';
import axios from 'axios';


function AdminThemesPanel() {
    const [gameName, setGameName] = useState('');
    const [yotubeVideoLink, setYotubeVideoLink] = useState('');
    const [showMarqueeTextForm, setShowMarqueeTextForm] = useState(false);
    const [showMarqueeImageForm, setShowMarqueeImageForm] = useState(false);
    const [showSliderImageForm, setShowSliderImageForm] = useState(false);
    const [showYoutubeLinksForm, setShowYoutubeLinksForm] = useState(false);
    const navigate = useNavigate();
    const navigateToAdminPage = () => {
        navigate('/admin');
    }
    const gameNames = [
        'Single Digit Lottery',
        'Double Digit Lottery',
        'Triple Digit Lottery',
        'ColourBall Game',
    ];
    const handleShowMarqueeTextForm = () => {
        setShowMarqueeTextForm(!showMarqueeTextForm);
    }
    const handleShowMarqueeImageForm = () => {
        setShowMarqueeImageForm(!showMarqueeImageForm);
    }
    const handleShowSliderImageForm = () => {
        setShowSliderImageForm(!showSliderImageForm);
    }
    const handleShowYoutubeLinksForm = () => {
        setShowYoutubeLinksForm(!showYoutubeLinksForm);
    }
    const handleYoutubeLinkChange = async (e) => {
        e.preventDefault();
        if (!gameNames.includes(gameName)) {
            alert('Invalid!! Select a Game Name.');
            return;
        }
        try {
            const response = await axios.put("/admin/setThemes/link", { gameName, yotubeVideoLink });
            if (response.data.status === "Game Link Updated") {
                alert(`Youtube Link Changed for ${gameName}.\nLink = ${yotubeVideoLink}.`);
            } else {
                alert("Link Update Failed");
                throw new Error("Link Update Failed");
            }
        } catch (error) {
            console.log('Axios Error:', error);
        }
    }
    const [adsSliderText, setAdsSliderText] = useState('');
    const updateMarqueeText = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put("/admin/setThemes/text", { adsSliderText });
            if (response.data.status === "Updated Slider Text") {
                console.log(adsSliderText);
                alert(`The new slider text = ${adsSliderText}\nSlider Text Changed successfully!`);
                window.location = window.location;
            } else {
                alert("Failed to Update.");
                throw new Error("Failed to Update.");
            }
        } catch (error) {
            console.log('Axios Error:', error);
        }
    };
    return (
        <div className="bg-slate-600 flex w-full h-auto">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4 italic underline underline-offset-4">Theme Panel</div>
                <div className="text-center font-medium text-white text-sm md:text-md lg:text-lg my-4">Ads, Promotions, Videos, Links, Images, Text Offers, New Features</div>
                <div onClick={handleShowMarqueeTextForm} className="text-center font-semibold flex gap-4 text-white bg-black rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 border-4">Change Marquee Text <BsFileText size={30} /></div>
                {showMarqueeTextForm ? (<div className='w-full flex flex-col items-center border-4 p-4 m-8 rounded-xl'>
                    <LandingPageMarqueeText />
                    {/* Division for Marquee Text Change */}
                    <div className="w-4/5 flex flex-col items-center border-4 p-4 m-8 rounded-xl">
                        <label htmlFor="newMarquee" className='font-bold text-white'>Change Marquee Text Box</label>
                        <input
                            type="text"
                            value={adsSliderText}
                            placeholder='Write the marquee text here'
                            name='newMarquee'
                            id='newMarquee'
                            onChange={(e) => setAdsSliderText(e.target.value)}
                            className="text-center font-semibold text-slate-700 border-4 border-black rounded-xl bg-white w-[90%] text-md md:text-xl lg:text-2xl p-4 my-4"
                        />
                        <button onClick={updateMarqueeText} className='text-white bg-slate-900 p-2 font-bold rounded-lg border-4 hover:bg-green-500 hover:text-white '>Change</button>
                    </div>
                </div>) : (<></>)}
                {/* <div onClick={handleShowMarqueeImageForm} className="text-center font-semibold flex gap-4 text-white bg-black rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 border-4">Change Marquee Images <RiImageAddLine size={30} /></div>
                {showMarqueeImageForm ? (
                    <div className='w-full flex flex-col items-center border-4 p-4 m-8 rounded-xl'>
                        <LandingPageImagesMarquee />
                        <div className="w-full flex flex-col items-center m-4">
                            <label htmlFor="marqueeImage" className='font-bold text-white'>Add a new Marquee Image</label>
                            <input
                                type="file"
                                name='marqueeImage'
                                id='marqueeImage'
                                className="text-center font-semibold text-slate-700 border-4 border-black rounded-xl bg-white w-[90%] text-md md:text-xl lg:text-2xl p-2 my-4"
                            />
                            <button className='text-white bg-slate-900 p-2 font-bold rounded-lg border-4 hover:bg-green-500 hover:text-white '>Upload</button>
                        </div>
                        <div className="w-full flex flex-col items-center m-4">
                            <label htmlFor="removeMarqueeImage" className='font-bold text-white'>Remove a Marquee Image</label>
                            <input
                                type="number"
                                placeholder='Enter Image Number'
                                name='removeMarqueeImage'
                                id='removeMarqueeImage'
                                className="text-center font-semibold text-slate-700 border-4 border-black rounded-xl bg-white w-[90%] text-md md:text-xl lg:text-2xl p-2 my-4"
                            />
                            <button className='text-white bg-red-900 p-2 font-bold rounded-lg border-4 hover:bg-red-600 hover:text-white '>Remove</button>
                        </div>
                    </div>
                ) : (<></>)}
                <div onClick={handleShowSliderImageForm} className="text-center font-semibold flex gap-4 text-white bg-black rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 border-4">Change Slider Images <RiImageAddLine size={30} /></div>
                {showSliderImageForm ? (
                    <div className='w-full flex flex-col items-center border-4 p-4 m-8 rounded-xl'>
                        <LandingPageGamesSlider />
                        <div className="w-full flex flex-col items-center m-4">
                            <label htmlFor="marqueeImage" className='font-bold text-white'>Add a new Image</label>
                            <input
                                type="file"
                                name='marqueeImage'
                                id='marqueeImage'
                                className="text-center font-semibold text-slate-700 border-4 border-black rounded-xl bg-white w-[90%] text-md md:text-xl lg:text-2xl p-2 my-4"
                            />
                            <button className='text-white bg-slate-900 p-2 font-bold rounded-lg border-4 hover:bg-green-500 hover:text-white '>Upload</button>
                        </div>
                        <div className="w-full flex flex-col items-center m-4">
                            <label htmlFor="removeMarqueeImage" className='font-bold text-white'>Remove an Image</label>
                            <input
                                type="number"
                                placeholder='Enter Image Number'
                                name='removeMarqueeImage'
                                id='removeMarqueeImage'
                                className="text-center font-semibold text-slate-700 border-4 border-black rounded-xl bg-white w-[90%] text-md md:text-xl lg:text-2xl p-2 my-4"
                            />
                            <button className='text-white bg-red-900 p-2 font-bold rounded-lg border-4 hover:bg-red-600 hover:text-white '>Remove</button>
                        </div>
                    </div>) : (<></>)} */}
                <div onClick={handleShowYoutubeLinksForm} className="text-center font-semibold flex gap-4 text-white bg-black rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 border-4">Change Youtube Links <FaYoutube size={35} className='text-red-700' /> </div>
                {showYoutubeLinksForm ? (<div className='w-full flex flex-col items-center border-4 p-4 m-8 rounded-xl'>
                    <GamesCards />
                    <div className="w-full flex flex-col items-center m-4">
                        <label htmlFor="gamesYoutubeLink" className='font-bold text-white my-4 mb-8'>Select the Game Name and Upload a new Youtube Link</label>
                        <select
                            className="bg-black hover:bg-green-900 text-center border-2 mt-8 md:mt-0 lg:mt-0  text-white font-bold py-2 mr-5 rounded-xl"
                            value={gameName} name='gamesYoutubeLink' id='gamesYoutubeLink'
                            onChange={(e) => setGameName(e.target.value)}
                        >
                            <option defaultValue className='font-semibold'>Select Game Name</option>
                            {gameNames.map((name, index) => (
                                <option key={index} value={name} className='font-semibold'>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <input type="url" name='gamesYoutubeLink' id='gamesYoutubeLink' value={yotubeVideoLink} onChange={(e) => setYotubeVideoLink(e.target.value)}
                            placeholder='Paste a valid youtube Link here'
                            className="text-center font-semibold text-slate-700 border-4 border-black focus:border-green-600 outline-none rounded-xl bg-white w-[90%] text-md md:text-xl lg:text-2xl p-2 my-4" />
                        <button onClick={handleYoutubeLinkChange} className='text-white bg-slate-900 p-2 font-bold rounded-lg border-4 hover:bg-green-500 hover:text-white '>Change</button>
                    </div>
                </div>) : (<></>)}
                {/* Division for Promotional Ads Change */}
                {/* <div>
                    <div className="w-full md:w-[70%] lg:w-[60%] mx-auto bg-black text-white rounded-xl border-4">
                        <div className='flex flex-col items-center text-center'>
                            <div className="flex font-medium my-4">Theme Panel: </div>
                            <div className='text-sm'>Objective: Theme Panel is for Updating Images, graphics and videos in the website.</div>
                            <ol className='text-sm list-disc m-4 p-4'>
                                <li>Set Marquee Text</li>
                                <li>Set Marquee Images</li>
                                <li>Set Slider Images</li>
                                <li>Set Video Links</li>
                                <li>Updates and Notifications</li>
                            </ol>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="absolute top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToAdminPage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div >
    );
};


export default AdminThemesPanel;