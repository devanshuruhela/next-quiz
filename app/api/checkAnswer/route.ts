// api/checkdAnswer.js
import { quiz } from "../../../data/dummyData"; // your dummy data

import { NextResponse } from "next/server";

export async function POST(req:Request) {

    const { questionId, answer }:any = await req.json();

    // Find the question by ID
    const question = quiz.questions.find((q) => q.id === questionId);

    if (!question) {
      return NextResponse.json({ message: "Question not found" });
    } else {
      // Check if the answer is correct
      const isCorrect = question.correctAnswer === answer;

      return NextResponse.json({ isCorrect , questionId });
    }
  }

