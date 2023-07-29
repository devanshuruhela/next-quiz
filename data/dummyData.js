export const quiz = {
  totalQuestions: 6,
  questions: [
    {
      id: 1,
      question: "What is the critical path in project management?",
      answers: [
        "The shortest duration to complete the project",
        "The longest duration to complete the project",
        "The path that involves the most resources",
        "The path that has the highest risk",
      ],
      correctAnswer: "The longest duration to complete the project",
      imageLink: "", // Add image link here if there is an image related to this question
    },
    {
      id: 2,
      question: "Which of the following is NOT a project constraint?",
      answers: ["Scope", "Cost", "Time", "Quality"],
      correctAnswer: "Quality",
      imageLink: "", // Add image link here if there is an image related to this question
    },
    {
      id: 3,
      question: "What is the purpose of a Gantt chart in project management?",
      answers: [
        "To visualize resource allocation",
        "To identify project risks",
        "To manage project scope",
        "To calculate project ROI",
      ],
      correctAnswer: "To visualize resource allocation",
      imageLink: "", // Add image link here if there is an image related to this question
    },
    {
      id: 6,
      question:
        "How do you judge what should be added in the next version of the app?",
      answers: [
        "Data Analysis",
        "User’s feedback",
        "Copy from similar product",
        "Personal feeling",
      ],
      correctAnswer: "User’s feedback",
      imageLink:
        "/qimage.png",
    },
    {
      id: 4,
      question: "What does RACI stand for in project management?",
      answers: [
        "Resource Allocation, Costing, and Integration",
        "Responsible, Accountable, Consulted, and Informed",
        "Risk Assessment and Control Information",
        "Resource Analysis and Continuous Improvement",
      ],
      correctAnswer: "Responsible, Accountable, Consulted, and Informed",
      imageLink: "", // Add image link here if there is an image related to this question
    },
    {
      id: 5,
      question:
        "Which type of project organization structure involves the least amount of hierarchy?",
      answers: ["Functional", "Matrix", "Projectized", "Composite"],
      correctAnswer: "Projectized",
      imageLink: "", // Add image link here if there is an image related to this question
    },
  ],
};
