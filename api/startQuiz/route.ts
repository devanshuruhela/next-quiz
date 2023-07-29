// api/startQuiz.js
import { NextResponse } from "next/server";
import { quiz } from "../../data/dummyData"; // your dummy data
console.log(quiz);

export async function GET(req:any) {
   const { totalQuestions, questions } = quiz;
   const data = { totalQuestions, questions }
   return NextResponse.json(data);
}