import { Connect } from "../ConnectButton/ConnectButton";
import type { NextPage } from "next";
import Head from "next/head";

const NavBar: NextPage = () => {
  return (
    <div className="flex flex-row bg-black w-full px-[2vw] py-[1.5vw] items-center h-max-[20vh]">
      <div >
        <img
          src="https://assets-global.website-files.com/64c24833e7b1addd2272198d/64c24afdbaea6378ed77a2c7_rover_logo.svg"
          loading="lazy"
          width="150"
          height="Auto"
          alt=""
        />
      </div>
      <div className="flex w-full flex-row-reverse">
        <Connect />
      </div>
    </div>
  );
};

export default NavBar;
