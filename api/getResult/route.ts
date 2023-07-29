// // api/showResult.js
// import { NextResponse } from "next/server";
// import { quiz } from "../../data/dummyData"; // your dummy data

// export default function handler(req, res) {
//   if (req.method === "POST") {
//     const { answers } = req.body;
//     let correctAnswers = 0;

//     // Calculate the number of correct answers
//     answers.forEach((answer) => {
//       const question = quiz.questions.find((q) => q.id === answer.questionId);
//       if (question && question.correctAnswer === answer.answer) {
//         correctAnswers++;
//       }
//     });

//     const totalQuestions = quiz.totalQuestions;
//     const scorePercentage = (correctAnswers / totalQuestions) * 100;

//     NextResponse.json({
//       correctAnswers,
//       wrongAnswers: totalQuestions - correctAnswers,
//       scorePercentage,
//     });
//   } else {
//     NextResponse.json({ message: "Method not allowed" });
//   }
// }
