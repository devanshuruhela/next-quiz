import React from 'react'
interface AnswerSlectorProps {
  text: string,
  selected?:boolean
}
const AnswerSelector: React.FC<AnswerSlectorProps> = ({ text , selected }) => {
  return (
    <label
      className={`flex flex-row items-center justify-start gap-2 p-3 ml-5 mr-5 rounded-md checkbox-container w-[300px] bg-slate-100 hover:bg-slate-300 ${
        selected ? `bg-white border-2 border-green-500` : `border-slate-100`
      }`}
    >
      {text}
    </label>
  );
};

export default AnswerSelector