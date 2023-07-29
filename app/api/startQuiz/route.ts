// api/startQuiz.js
import { NextResponse } from "next/server";
import { quiz } from "../../../data/dummyData"; // your dummy data

export async function GET() {
   const { totalQuestions, questions } = quiz;
   const data = { totalQuestions, questions }
   return NextResponse.json(data);
}