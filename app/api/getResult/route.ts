// api/showResult.js
import { NextResponse } from "next/server";
import { quiz } from "../../../data/dummyData"; // your dummy data


export async function POST(req:Request) {
  
    const { answers}  = await req.json();
    let correctAnswers = 0;

    // Calculate the number of correct answers
    answers.forEach((answer:any) => {
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      if (question && answer.isCorrect === true) {
        correctAnswers++;
      }
    });

    const totalQuestions = quiz.totalQuestions;
    const scorePercentage =Math.round((correctAnswers / totalQuestions) * 100);

    return NextResponse.json({
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers,
      scorePercentage,
    });
}
