import React, { useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';

const LandingPageSubscriptions = () => {
  const [mobile, setMobile] = useState(0);
  return (
    <div className='w-full bg-slate-900 text-white px-4'>
      <div className='mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            To Recieve Updates and Notifications
          </h1>
          <p>Sign up to our newsletter and stay up to date.</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='number'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder='Enter your whatsapp number'
              min={1000000000}
              max={9999999999}
              maxLength={10}
              required
            />
            <a href={`https://api.whatsapp.com/send?phone=917988145538&text=Your number ${mobile} is subscribed to the whatsapp group.`} target='_blank' className='bg-[black] text-white flex hover:bg-green-500 rounded-md font-medium ml-4 my-6 px-6 py-3'>
              <BsWhatsapp size={20} className='mr-2' /> Subscribe
            </a>
          </div>
          {/* <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='number'
              placeholder='Enter your telegram number'
              maxLength={10}
            />
            <button className='bg-[black] text-white hover:bg-sky-500 rounded-md font-medium ml-4 my-6 px-6 py-3'>
              <FaTelegram size={30} />
            </button>
          </div> */}
          <p>
            Your email will be used on for sending offers and notifications{' '}
            <span className='text-white underline font-bold hover:text-green-700'>
              <a href="/">Privacy Policy.
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSubscriptions;
