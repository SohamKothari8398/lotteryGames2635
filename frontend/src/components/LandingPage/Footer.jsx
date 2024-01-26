import React from 'react';
import { FaFacebookSquare, FaInstagram, FaTelegram } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';
import { TbSquareRoundedNumber0, TbSquareRoundedNumber3, TbSquareRoundedNumber6 } from 'react-icons/tb';
import upilogo from '../../assets/upi-logo.jpg';
import gpayLogo from '../../assets/g-pay_logo.jpg';
import paytmLogo from '../../assets/paytm_logo.jpg';
import whatsappPay from '../../assets/whatsappPay_logo.png';
import amazonPay_logo from '../../assets/amazonPay_logo.jpg';
import netBanking_Logo from '../../assets/netBanking_Logo.png';
import card_payments from '../../assets/Visa_Inc._logo.png';
import card_payments2 from '../../assets/MasterCard_Logo.png';
import card_payments3 from '../../assets/Discover-logo.png';
import phonepe from '../../assets/phonePe-logo.png';
import logo from '../../assets/up365Logo.jpeg';

const LandingPageFooter = () => {
  return (
    <div className='bg-slate-900 w-full mx-auto flex flex-col pt-8 pb-4 px-8 text-white'>
      {/** App Description, Social Media Links*/}
      <div>
        <div className="text-xl grid md:grid-cols-2 text-white items-center">
          <div className='flex'>
            <img src={logo} alt="logo not available" className='h-16 md:h-20 w-44 mr-4 rounded-xl' />
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
          <p className='text-sm py-4 lg:-ml-56 hover:scale-125'>We have a well established presence in the casino industry with successful establishments in India, Dubai, Malta and many more. And now we are setting our sights on the online gaming arena. We provide our services to the individuals, who seek excitement, entertainment, and pleasure of earning hefty through gaming and risks. </p>
        </div>
        <div className='flex justify-between md:w-[40%] my-6 mt-8'>
          <span className='font-bold'>Social Media :</span>
          <a href="https://www.facebook.com" target='_blank' rel="noreferrer"><FaFacebookSquare size={30} className=' cursor-pointer hover:scale-150 hover:text-blue-700' /></a>
          <a href="https://www.instagram.com" target='_blank' rel="noreferrer"><FaInstagram size={30} className=' cursor-pointer hover:scale-150 hover:text-pink-600' />     </a>
          <a href="https://web.whatsapp.com/" target='_blank' rel="noreferrer"><BsWhatsapp size={30} className=' cursor-pointer hover:scale-150 hover:text-green-700' />      </a>
          <a href="https://telegram.org/login" target='_blank' rel="noreferrer"> <FaTelegram size={30} className=' cursor-pointer hover:scale-150 hover:text-sky-400' />     </a>
        </div>
      </div>
      {/** Payment Methods Page*/}
      <div className='my-10'>
        <h1 className='w-full text-2xl flex flex-row gap-2 mb-10 font-bold italic text-white'> PAYMENT METHODS <span className='text-md font-thin ml-10'>Fiat, USD, INR, UPI, Wallets, etc.</span></h1>
        <div className='my-6 grid grid-cols-2 md:grid-cols-5 gap-1'>
          <img src={upilogo} alt='Upi Payments' className='mr-2  mb-2 border-2 rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={gpayLogo} alt='Upi Payments' className='mr-2 mb-2 bg-white border-2 rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={phonepe} alt='Upi Payments' className='mr-2 mb-2  border-2 rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={paytmLogo} alt='Upi Payments' className='mr-2 bg-white border-2 rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={amazonPay_logo} alt='Upi Payments' className='mr-2 border-2 rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={whatsappPay} alt='Upi Payments' className='mr-2 border-2 rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={netBanking_Logo} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={card_payments} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={card_payments2} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg' style={{ width: '10rem', height: '5rem' }} />
          <img src={card_payments3} alt='Upi Payments' className='mr-2 border-2 bg-white rounded-lg' style={{ width: '10rem', height: '5rem' }} />
        </div>
      </div>
      {/**All Important Links */}
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-col-1 bg-slate-700 rounded-lg justify-between mt-6'>
        {/* <div className='m-10'>
          <h6 className='italic  text-white font-semibold underline'>Features</h6>
          <ul>
            <li className='py-2 text-sm'>Analytics</li>
            <li className='py-2 text-sm'>Marketing</li>
            <li className='py-2 text-sm'>Commerce</li>
            <li className='py-2 text-sm'>Insights</li>
          </ul>
        </div> */}
        <div className='m-10'>
          <h6 className='italic text-white font-semibold underline'>Lottery Numbers and Colors</h6>
          <ul>
            <li className='py-2 text-sm flex flex-row gap-2'>Single Digit <TbSquareRoundedNumber0 size={20} /></li>
            <li className='py-2 text-sm flex flex-row gap-2'>Double Digit <TbSquareRoundedNumber0 size={20} /> <TbSquareRoundedNumber0 size={20} /> </li>
            <li className='py-2 text-sm flex flex-row gap-2'>Triple Digit <TbSquareRoundedNumber0 size={20} /> <TbSquareRoundedNumber0 size={20} /> <TbSquareRoundedNumber0 size={20} /></li>
            <li className='py-2 text-sm flex flex-row gap-2'>Color Balls 1 to 36 <TbSquareRoundedNumber3 size={20} /> <TbSquareRoundedNumber6 size={20} /> </li>
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
      {/** Copy-Right Us Information*/}
      <div className='m-auto mt-4'>
        <p className='italic'>@ Copyright-2023: UP365 Gaming created by <a href="https://www.xsavlab.com/" target="_blank" rel="noopener noreferrer" className='font-bold underline underline-offset-4 hover:text-blue-700'>XSAV Lab </a></p>
      </div>
    </div>
  );
};

export default LandingPageFooter;
