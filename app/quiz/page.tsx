'use client'
import AnswerSlector from '@/components/answerselector';
import Image from 'next/image';
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";


const page = () => {
  return (
    <div className="w-[320px] h-[640px] bg-violet-400 rounded-lg relative overflow-hidden">
      <div className="absolute -top-10 left-9">
        <Image
          src="/confetti.png"
          height={200}
          width={250}
          alt="confetti particales"
        />
      </div>
      <div
        className="w-[100px] h-[100px] absolute top-10 left-1/2 transform -translate-x-1/2 mb-5"
        style={{ zIndex: 5 }}
      >
        <CircularProgressbar
          value={20}
          text={`1/5`}
          background
          backgroundPadding={8}
          styles={buildStyles({
            backgroundColor: "#fff",
            textColor: "#000",
            pathColor: "#44B77B",
            trailColor: "#F3F4FA",
          })}
        />
      </div>
      <div className="w-[320px] h-[550px] bg-white bottom-0 absolute rounded-b-lg rounded-t-3xl overflow-hidden">
        <div className="font-black text-black text-[18px] mt-10 ml-5 mr-5 mb-5 break-words">
          How do you judge what should be added in the next version of the app?
        </div>
        <div className="flex flex-col gap-2">
          <AnswerSlector text={"sa"} />
          <AnswerSlector text={"sa"} />
          <AnswerSlector text={"sa"} />
          <AnswerSlector text={"sa"} />
        </div>
      </div>
    </div>
  );
}

export default page