'use client'
import AnswerSelector from '@/components/answerselector';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

import ResultPage from '../result/page';

 interface ResponseItem {
     questionId: number; 
     isCorrect: string;
     isTimeOk: any
   }


   
const QuizPage = () => {

   const [totalTimeTaken, setTotalTimeTaken] = useState<number>(0);
   const [questionStartTime, setQuestionStartTime] = useState<number>(0);
   const [questionEndTime, setQuestionEndTime] = useState<number>(0);


   const [activeQuestion, setActiveQuestion] = useState(0);
   const [selectedAnswer, setSelectedAnswer] = useState('');
   const [showResult, setShowResult] = useState(false);
   const [checked, setChecked] = useState(false);
   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
   const [response, setResponse] = useState<ResponseItem[]>([]);
   const [quizData, setQuizData] = useState({
     totalQuestions: 0,
     questions: [
       {
         id: 0,
         question: "",
         answers: [],
         correctAnswer: "",
         imageLink: "",
       },
     ],
   });

   const fetchQuizData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/startQuiz`);
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
   
 useEffect(() => {
   // Fetching quiz data when the component mounts
   fetchQuizData();

   // Set the start time for the first question
   setQuestionStartTime(Date.now());

   // Clean up function to set the end time for the last question
   return () => {
     if (activeQuestion === quizData.totalQuestions - 1) {
       setQuestionEndTime(Date.now());

       // Calculate time taken for the last question and update the total time taken
       const timeTakenForLastQuestion = questionEndTime - questionStartTime;
       setTotalTimeTaken(
         (prevTotalTime) => prevTotalTime + timeTakenForLastQuestion
       );
     }
   };
 }, [activeQuestion, questionEndTime]);

   if (quizData.totalQuestions === 0) {
     return <div className=' border-2 border-black h-[200px] w-[200px]  text-black rounded-full text-[18px] flex flex-col justify-center items-center text-extrabold bg-slate-500/20'>
      <p>Loading...</p></div>; 
   }
    
   
  const onAnswerSelected = (answer:any, idx:any) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer); 
  }; 

  const nextQuestion = async() => {
    const currentTime = Date.now();
    const timeTakenForCurrentQuestion = currentTime - questionStartTime;
   
    const CurrentQuestionId = quizData?.questions[activeQuestion]?.id;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: CurrentQuestionId,
        answer: selectedAnswer,
        timetaken: timeTakenForCurrentQuestion / 1000,
      }),
    });
    const data =  await res.json()
    // console.log(data.isCorrect , data.isTimeOk);
    
    
    setResponse([
      ...response,
      {
        questionId: CurrentQuestionId,
        isCorrect: data?.isCorrect,
        isTimeOk: data?.isTimeOk
      },
    ]);
 
    setSelectedAnswerIndex(null);
    if (activeQuestion !== quizData.totalQuestions - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
    
  };

  const {questions} = quizData
  const { question, answers, imageLink } = questions[activeQuestion];
  // const timeTakenForCurrentQuestion = Date.now() - questionStartTime;
  
  
  return (
    <div>
    {!showResult ? (<div className="w-[320px] h-[640px] bg-violet-400 rounded-lg relative overflow-hidden">
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
      <div
        className="w-[100px] h-[100px] absolute top-10 left-1/2 transform -translate-x-1/2 mb-5"
        style={{ zIndex: 5 }}
      >
        <CircularProgressbar
          value={((activeQuestion + 1) / quizData.totalQuestions) * 100}
          text={`${activeQuestion + 1}/${quizData.totalQuestions}`}
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
      <div className="w-[320px] h-[550px] bg-white bottom-0 absolute rounded-b-lg rounded-t-3xl overflow-y-auto overflow-x-hidden">
        <div className="font-black text-black text-[18px] mt-10 ml-5 mr-5 mb-5 break-words">
          {question}
          
          {imageLink? <Image src={imageLink} alt='quimage' width={300} height={300}/>:null}
        </div>

        <div className="bottom-0 flex flex-col items-center justify-center gap-2">
          {answers.map((answer: any, idx: any) => (
            <div key={idx} onClick={() => onAnswerSelected(answer, idx)}>
              {selectedAnswerIndex === idx ? (
                <AnswerSelector text={answer} selected={true} />
              ) : (
                <AnswerSelector text={answer} />
              )}
            </div>
          ))}
          {checked ? (
            <button
              onClick={nextQuestion}
              className="px-5 py-2 w-[200px] z-5 text-white bg-red-500 rounded-3xl mt-5 fixed bottom-[60px]"
              style={{ zIndex: 10 }}
            >
              {activeQuestion === quizData.totalQuestions - 1
                ? "Finish"
                : "Next"}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled
              className="px-5 py-2 w-[200px] z-5 text-white bg-gray-500 rounded-3xl mt-5 fixed bottom-[60px]"
              style={{ zIndex: 10 }}
            >
              {" "}
              {activeQuestion === quizData.totalQuestions - 1
                ? "Finish"
                : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>):
  (
    <ResultPage response={response}/>
  )}</div>
  );
}

export default QuizPage