import { Connect } from '../ConnectButton/ConnectButton';
import type { NextPage } from 'next';
import Head from 'next/head';


const NavBar: NextPage = () => {
  return (
    <div className='flex flex-row-reverse h-[50px] bg-sky-200 w-full px-[2vw] items-center h-max-[50px]'>
      <Connect/>
    </div>
  );
};

export default NavBar;
