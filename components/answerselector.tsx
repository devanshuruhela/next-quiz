import React from 'react'
interface AnswerSlectorProps {
  text: string;
}
const AnswerSlector: React.FC<AnswerSlectorProps> = ({ text }) => {
  return (
 
      <label className="flex flex-row items-center justify-start gap-2 p-4 ml-5 mr-5 rounded-md checkbox-container bg-slate-100 hover:bg-slate-300">
        <input type="checkbox" className="hidden" />
        <span className="flex items-center justify-center flex-shrink-0 w-4 h-4 bg-gray-100 border-2 border-gray-200 rounded-full checkmark">
          <svg
            className="hidden w-4 h-4 text-white tick-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </span>
        {text}
      </label>

  );
};

export default AnswerSlector