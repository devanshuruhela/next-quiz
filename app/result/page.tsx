'use client'
import Image from 'next/image';
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from 'next/navigation';

const ResultPage = () => {
  const router = useRouter();
  return (
    <div className="w-[320px] h-[640px] bg-violet-400 rounded-lg relative overflow-hidden ">
      <div className="absolute flex flex-row -top-10 left-5">
        <Image
          src="/confetti.png"
          height={100}
          width={150}
          alt="confetti particales"
        />
        <Image
          src="/confetti.png"
          height={100}
          width={150}
          alt="confetti particales"
        />
      </div>
      <div className="w-[320px] h-[550px] bg-white bottom-0 absolute rounded-b-lg rounded-t-3xl overflow-hidden flex flex-col items-center justify-start">
        <p className="font-extrabold text-black text-[20px] mt-5">
          Your result
        </p>
        <div className="w-[150px] h-[150px] absolute top-[5rem] left-1/2 transform -translate-x-1/2">
          <CircularProgressbar
            value={20}
            text={`${20}%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              backgroundColor: "#fff",
              textColor: "#000",
              pathColor: "#44B77B",
              trailColor: "#F3F4FA",
            })}
          />
        </div>
      </div>
      <button className="px-5 py-2 w-[200px] z-5 text-white bg-red-500 rounded-3xl mt-5 absolute bottom-4 left-1/2 transform -translate-x-1/2" onClick={()=>router.push('/')}>
        Restart
      </button>
    </div>
  );
}

export default ResultPage