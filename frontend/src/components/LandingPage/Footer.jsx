import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';
import { LiaFacebook } from "react-icons/lia";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import upilogo from '../../assets/upiLogo.jpg';
import gpayLogo from '../../assets/gpayLogo.png';
import phonepe from '../../assets/phonePe-logo.png';
import paytmLogo from '../../assets/paytmLogo.png';
import netBanking_Logo from '../../assets/netBanking_Logo.png';
import card_payments from '../../assets/visaLogo.png';
import card_payments2 from '../../assets/masterCardLogo.png';
import card_payments3 from '../../assets/discoverLogo.png';

const LandingPageFooter = () => {
  return (
    <div className='w-full mx-auto flex flex-col pt-8 pb-4 px-8 text-white md:mb-96 lg:mb-0'>
      {/** App Description, Social Media Links*/}
      <div>
        <div className="text-xl grid md:grid-cols-2 text-white items-center">
          <div className='flex'>
            <div className='hover:text-yellow-600 flex italic font-bold mr-10'>
              <div className='text-3xl md:text-5xl lg:text-6xl'>UP</div>
              <div className='flex flex-col mt-2 ml-2 text-xs md:text-sm lg:text-lg'>
                <div>
                  365
                </div>
                <div className='-ml-4 lg:-ml-6'>
                  Gaming
                </div>
              </div>
            </div>
          </div>
          <p className='text-xs lg:text-base py-4 md:-ml-48 lg:-ml-96'>We have a well established presence in the casino industry with successful establishments in India, Dubai, Malta and many more. And now we are setting our sights on the online gaming arena. We provide our services to the individuals, who seek excitement, entertainment, and pleasure of earning hefty through gaming and risks. </p>
        </div>
        <div className='grid grid-cols-1 mt-10'>
          <div className='w-full text-2xl flex flex-row gap-2 mb-4 font-bold italic text-white'> SOCIAL MEDIA </div>
          <div className='grid grid-cols-4 w-full md:w-1/2 my-4'>
            <a href="https://www.facebook.com" target='_blank' rel="noreferrer"><LiaFacebook size={36} className=' cursor-pointer hover:scale-150 hover:text-blue-700' /></a>
            <a href="https://www.instagram.com" target='_blank' rel="noreferrer"><FaInstagram size={30} className=' cursor-pointer hover:scale-150  bg-gradient-to-r hover:from-violet-600  hover:via-red-500 hover:to-yellow-500 rounded-lg' />     </a>
            <a href="https://web.whatsapp.com/" target='_blank' rel="noreferrer"><BsWhatsapp size={30} className=' cursor-pointer hover:scale-150 hover:text-green-700' />      </a>
            <a href="https://telegram.org/login" target='_blank' rel="noreferrer"> <PiTelegramLogoDuotone size={30} className=' cursor-pointer hover:scale-150 hover:text-sky-500' />     </a>
          </div>
        </div>
      </div>
      {/** Payment Methods Page*/}
      <div className='mt-4'>
        <h1 className='w-full text-2xl flex flex-row gap-2 mb-10 font-bold italic text-white'> PAYMENT METHODS </h1>
        <div className='my-2 grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-10'>
          <img src={upilogo} alt='Upi Payments' className='mr-2  mb-2 border-2 rounded-lg w-full h-[3rem] hover:scale-125' />
          <img src={gpayLogo} alt='Upi Payments' className='mr-2 mb-2 bg-white border-2 rounded-lg w-full h-[3rem] hover:scale-125' />
          <img src={phonepe} alt='Upi Payments' className='mr-2 mb-2  border-2 rounded-lg w-full h-[3rem] hover:scale-125' />
          <img src={paytmLogo} alt='Upi Payments' className='mr-2 bg-white border-2 rounded-lg w-full h-[3rem] hover:scale-125' />
          <img src={netBanking_Logo} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg w-full h-[3rem] hover:scale-125' />
          <img src={card_payments} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg w-full h-[3rem] hover:scale-125' />
          <img src={card_payments2} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg w-full h-[3rem] hover:scale-125' />
          <img src={card_payments3} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg w-full h-[3rem] hover:scale-125' />
        </div>
      </div>
      {/**All Important Links */}
      <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 rounded-lg justify-between mt-6'>
        <div className='m-10'>
          <h6 className='italic text-white font-semibold underline'>Lottery Numbers and Colours</h6>
          <ul>
            <li className='py-2 text-sm flex flex-row gap-2'>Single Digit </li>
            <li className='py-2 text-sm flex flex-row gap-2'>Double Digit </li>
            <li className='py-2 text-sm flex flex-row gap-2'>Triple Digit </li>
            <li className='py-2 text-sm flex flex-row gap-2'>Colour Ball Lottery </li>
          </ul>
        </div>
        <div className='m-10'>
          <h6 className='italic text-white font-semibold underline'>Company</h6>
          <ul>
            <li className='py-2 text-sm'>About-Us</li>
            <li className='py-2 text-sm'>Blogs</li>
            <li className='py-2 text-sm'>Jobs & Career</li>
            <li className='py-2 text-sm'></li>
            <li className='py-2 text-sm'></li>
          </ul>
        </div>
        <div className='m-10'>
          <h6 className='italic text-white font-semibold underline'>Support</h6>
          <ul>
            <li className='py-2 text-sm'>Cookies Settings</li>
            <li className='py-2 text-sm'>Posts</li>
            <li className='py-2 text-sm'>Help Center</li>
            <li className='py-2 text-sm'>Customer Center</li>
          </ul>
        </div>
        <div className='m-10'>
          <h6 className='italic text-white mr-10 font-semibold underline'>Legal</h6>
          <ul>
            <li className='py-2 text-sm'>Regulations</li>
            <li className='py-2 text-sm'>Privacy Policy</li>
            <li className='py-2 text-sm'>Terms and Conditions</li>
            <li className='py-2 text-sm'>Responsible Data</li>
          </ul>
        </div>
      </div>
      {/** Copy-Right Information*/}
      <div className='m-auto mt-4'>
        <p className='italic'>@ Copyright-2023: UP365 Gaming created by <a href="https://www.xsavlab.com/" target="_blank" rel="noopener noreferrer" className='font-bold underline underline-offset-4 hover:text-blue-700'>XSAV Lab </a></p>
      </div>
    </div>
  );
};

export default LandingPageFooter;
