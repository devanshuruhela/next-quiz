'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
   <div className="w-[320px] h-[640px] bg-gradient-to-b from-white to-violet-400 rounded-lg flex flex-col justify-between items-center">
    <div className="flex justify-center gap-2 mt-5">
      <Image src="/logo.svg" height={30} width={30} alt="mainlogo"/>
      <p className="text-[18px] text-neutral-800 font-[900]">Upraised</p>
    </div>
    <div className="h-[120px] w-[120px] bg-white flex flex-col justify-center items-center rounded-full shadow-md">
      <p className="text-red-500 font-extrabold text-[25px]">Quiz</p>
    </div>

    <button className="py-2 px-[100px] bg-red-500 text-white text-[18px] font-extrabold rounded-3xl mb-5 hover:bg-red-700" onClick={()=>router.push('/quiz')}>Start</button>
   </div>
  )
}
