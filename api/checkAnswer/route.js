// api/checkdAnswer.js
import { quiz } from "../../data/dummyData"; // your dummy data
import { NextResponse } from "next/server";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { questionId, answer } = req.body;

    // Find the question by ID
    const question = quiz.questions.find((q) => q.id === questionId);

    if (!question) {
      NextResponse.json({ message: "Question not found" });
    } else {
      // Check if the answer is correct
      const isCorrect = question.correctAnswer === answer;

      NextResponse.json({ isCorrect });
    }
  } else {
   NextResponse.json({ message: "Method not allowed" });
  }
}
