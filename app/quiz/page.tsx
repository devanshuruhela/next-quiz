'use client'
import AnswerSelector from '@/components/answerselector';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
// import { quiz } from "../../data/dummyData"; // your dummy data
import { useRouter } from 'next/navigation';

 interface ResponseItem {
     questionId: string; 
     answer: string;
   }


   
const QuizPage = () => {
   const router = useRouter()
  
  
   const [activeQuestion, setActiveQuestion] = useState(0);
   const [selectedAnswer, setSelectedAnswer] = useState('');
   const [checked, setChecked] = useState(false);
   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
   const [response, setResponse] = useState<ResponseItem[]>([]);
   const [quizData , setQuizData] = useState({
  totalQuestions: 6,
  questions: [
    ]})
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
    }, []);
    
   if (quizData.questions.length === 0) {
     return <div className=' border-2 border-black h-[200px] w-[200px]  text-black rounded-full text-[18px] flex flex-col justify-center items-center text-extrabold bg-slate-500/20'>
      <p>Loading...</p></div>; 
   }
    
   
  const onAnswerSelected = (answer:any, idx:any) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer); 
  };
  const nextQuestion = () => {
    const currentQuestionId = quizData?.questions[activeQuestion]?.id;
    setResponse([
      ...response,
      {
        questionId: currentQuestionId,
        answer: selectedAnswer,
      },
    ]);
 
    setSelectedAnswerIndex(null);
    if (activeQuestion !== quizData.totalQuestions - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      router.push('result')
    }
    setChecked(false);
  };

  const {questions} = quizData
  const { question, answers } = questions[activeQuestion];
  return (
    <div className="w-[320px] h-[640px] bg-violet-400 rounded-lg relative overflow-hidden">
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
      <div className="w-[320px] h-[550px] bg-white bottom-0 absolute rounded-b-lg rounded-t-3xl overflow-hidden">
        <div className="font-black text-black text-[18px] mt-10 ml-5 mr-5 mb-5 break-words">
          {question}
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
              className="px-5 py-2 w-[200px] z-5 text-white bg-red-500 rounded-3xl mt-5 fixed bottom-[50px]"
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
              className="px-5 py-2 w-[200px] z-5 text-white bg-gray-500 rounded-3xl mt-5 fixed bottom-[50px]"
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
    </div>
  );
}

export default QuizPage