'use client'
import AnswerSelector from '@/components/answerselector';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { quiz } from "../../data/dummyData"; // your dummy data
import { useRouter } from 'next/navigation';


const QuizPage = () => {
   const router = useRouter()
   const [quizData , setQuizData] = useState([])
   const [activeQuestion, setActiveQuestion] = useState(0);
   const [selectedAnswer, setSelectedAnswer] = useState('');
   const [checked, setChecked] = useState(false);
   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
   const [response , setResponse] =useState([])

    useEffect(() => {
      // Fetching quiz data when the component mounts
      fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/startQuiz`);
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
   
  const onAnswerSelected = (answer:any, idx:any) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer); 
  };
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (activeQuestion !== quiz.totalQuestions - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      router.push('result')
    }
    setChecked(false);
  };

  const {questions} = quiz
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
          value={((activeQuestion + 1) / quiz.totalQuestions) * 100}
          text={`${activeQuestion + 1}/${quiz.totalQuestions}`}
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
          {answers.map((answer, idx) => (
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
              className="px-5 py-2 w-[200px] z-5 text-white bg-red-500 rounded-3xl mt-5"
            >
              {activeQuestion === quiz.totalQuestions - 1 ? "Finish" : "Next"}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled
              className="px-5 py-2 w-[200px] z-5 text-white bg-gray-500 rounded-3xl mt-5"
            >
              {" "}
              {activeQuestion === quiz.totalQuestions - 1 ? "Finish" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage