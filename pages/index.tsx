import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { numberWithCommas } from "../utils/dateUtils";
import Head from "next/head";
import NavBar from "../components/NavBar";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { Connect } from "../components/ConnectButton/ConnectButton";
import contract from "../TokenVesting.json";
import { useState } from "react";
type VestingSchedule = {
  amountTotal:bigint
beneficiary:string
cliff:bigint
duration:bigint
released:bigint
slicePeriodSeconds:bigint
start:bigint
}
const nullAddress = "0x0000000000000000000000000000000000000000"
const Home: NextPage = () => {
  const [schedule,setSchedule]=useState<VestingSchedule|null>(null)
  const { address } = useAccount();
  const { data: vestingSchedule } = useContractRead({
    watch:true,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: [...contract.abi],
    functionName: "getVestingSchedule",
    args: [address],
    onSuccess:(data)=>{
      setSchedule(data as VestingSchedule);
    }
  });
  const { data: availableAmount } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: [...contract.abi],
    functionName: "getAvailableVestingAmount",
    args: [address],
  });

  const { writeAsync: release } = useContractWrite({
    abi: [...contract.abi],
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "release",
  });

  const currentDate = new Date();
  const timestamp = Math.floor(currentDate.getTime()/1000)

  if(schedule&&schedule.beneficiary!==nullAddress)
  {
    console.log("TIMESTAMP",timestamp,schedule.start,schedule.cliff,schedule.slicePeriodSeconds)
    console.log("NEXT PERIOD")
  }

  
  console.log("VESTING", vestingSchedule);
  return (
    <div>
      <Head>
        <title>Rover Finance</title>
        <meta content="Vesting for Rover Contract" name="Rover Vesting" />
      </Head>
      <div className="flex flex-col bg-lightPurple min-h-[100vh] h-auto items-center w-full">
        <NavBar />
        <div className="flex grow flex-col w-[90%] h-[100%] my-[4vh] rounded-[10px]  bg-themePurple text-center ">
          <p className="text-[3.5vw] mt-4 text-white">Rover Finance Vesting And Claims</p>
          <div className="flex grow flex-col h-[100%] text-start p-4">
            {!address ? (
              <div className="flex flex-col mt-8 items-center text-black">
               
                <Connect />
                <p className="text-red-600 mt-2 text-[2.5vw]">
                  Please Connect Your Wallet
                </p>
              </div>
            ) : schedule&&schedule?.beneficiary!==nullAddress ? (
              <div className="text-[1.5vw] text-sky-200">
                <p className="font-bold text-[2vw]">Total Allocation: {numberWithCommas(Number(schedule.amountTotal))}</p>
                <p className="font-bold">Allocation Date: {(new Date(Number(schedule.start)*1000)).toLocaleDateString()}</p>
                <p className="font-bold">Initial Cliff:{(new Date(Number))} {"("+(new Date(Number(schedule.cliff)*1000)).toLocaleDateString()+")"}</p>
                <p className="font-bold">Vesting Frequency: {(Number(schedule.slicePeriodSeconds))}</p>
                <p className="font-bold">Vesting Duration: {(Number(schedule.duration))}</p>
                <p className="font-bold">Amount already claimed: {(Number(schedule.released))}</p>
                <p className="font-bold">Available to be claimed:{(Number(availableAmount))}</p>
                <p className="font-bold">Next Vesting On: {Number(schedule.slicePeriodSeconds)-Math.floor((timestamp-Number(schedule.cliff)))%Number(schedule.slicePeriodSeconds)}</p>
                <button className="border-blue-800 border-[1px] bg-yellow-400 text-black p-2 rounded-[10px] mt-4" onClick={()=>{release()}}>Claim Now</button>
              </div>
            ) : (
              <div className="flex flex-col text-black items-center">
                <p className="text-red-600 text-[3vw]">
                  Your wallet does not have a vesting schedule.
                </p>
                {!address&&(<Connect />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default dynamic(() => Promise.resolve(Home), { ssr: false });
{
  /**  <div className='flex flex-col items-center h-[100%] w-[90%] max-w-[90%]'>
        {
          !address && ( <div className='flex w-1/2 self-center rounded-[10px] text-center mt-10 p-4 text-[5vw] text-red-800 bg-gray-200'>
            <p>
            Please Connect your wallet to see your current vesting status 
            </p>
          </div>)
        }
        </div> */
}
