// api/startQuiz.js
import { NextResponse } from "next/server";
import { quiz } from "../../data/dummyData"; // your dummy data

export async function GET(req:any) {
   const { totalQuestions, questions } = quiz;
   return NextResponse.json({ totalQuestions, questions });
}