'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from 'next/navigation';

const ResultPage = ({response}:any) => {
  const [result , setResult] = useState({
    "correctAnswers": '',
    "wrongAnswers": '',
    "scorePercentage": '',
    "timelimiteexceeded":''
})


  const fetchResult = async()=>
  {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getResult`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers:response
      }),
    });
    const data = await res.json();
    setResult(data)
  }
  useEffect(() => {
    fetchResult()
  }, [])
  
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
            value={parseInt(result.scorePercentage)}
            text={`${result.scorePercentage}%`}
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
        <div className="absolute flex flex-col gap-2 w-[300px] top-[15rem]">
          <div className="flex flex-row gap-5 py-4 bg-[#44B77B]/10 text-black rounded-lg px-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 32 32"
              fill="none"
              className="mt-1"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                fill="#44B77B"
              />
            </svg>
            <h2 className="text-[12px]">{result.correctAnswers}</h2>
            <h2 className="text-[12px] text-gray-400">Correct</h2>
          </div>
          <div className="flex flex-row gap-5 py-4 px-10 bg-[#FF3B3F]/10 rounded-lg text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 32 32"
              fill="none"
              className="mt-1"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                fill="#FF3B3F"
              />
            </svg>
            <h2 className="text-[12px]">{result.wrongAnswers}</h2>
            <h2 className="text-[12px] text-gray-400">Incorrect</h2>
          </div>
          <div className="flex flex-row gap-5 px-10 py-4 text-black bg-gray-100 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 32 32"
              fill="none"
              className="mt-1"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                fill="#565656"
              />
            </svg>
            <h2 className="text-[12px]">{result.timelimiteexceeded}</h2>
            <h2 className="text-[12px] text-gray-400">Time limit exceeded</h2>
          </div>
        </div>
      </div>
      <button
        className="px-5 py-2 w-[200px] z-5 text-white bg-red-500 rounded-3xl mt-5 absolute bottom-4 left-1/2 transform -translate-x-1/2"
        onClick={() => router.push("/")}
      >
        Start Again
      </button>
    </div>
  );
}

export default ResultPage