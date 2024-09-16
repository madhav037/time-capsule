import React, { useEffect, useState } from 'react'
import Menu from '../Components/Menu'
import LetterCard from '../Components/LetterCard';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.data.id;
  const [letters, setLetters] = useState([]);
  const [selectType, setSelectType] = useState([true, false, false]);

  const fetchLetters = async () => {
    const response = await fetch(`http://localhost:5000/api/letters/get-user-letters/${userID}`);
    const data = await response.json();
    setLetters(data);
  }
  
  useEffect(() => {
    fetchLetters();
  }, [])
  
  const deliveredLetter = letters.filter((letter) => letter.sent == true)
  const timeTravellingLetter = letters.filter((letter) => letter.sent == false)
  // console.log(DeliveredLetter);

  const timeTravellingLetterCards = timeTravellingLetter.map((letter) => {
    // console.log(letter.body)
    return (
      <LetterCard key={letter.id} id={letter.id} dateWritten={letter.dateWritten} dateToRecieve={letter.dateToRecieve}  />
    )
  })


  const deliveredLetterCards = deliveredLetter.map((letter) => {
    // console.log(letter.body)
    return (
      <LetterCard key={letter.id} id={letter.id} body={letter.body} dateWritten={letter.dateWritten} dateToRecieve={letter.dateToRecieve}  />
    )
  })

  return (
    <div className='h-full bg-[#C8CFA0]'>
        <Menu />
        <div className='w-full h-1/4 flex gap-5 justify-between bg-[#a5ab82] p-5'>
            <div className='font-bold text-5xl text-left text-red-500 font-mono'>
            Your Letters
            </div>
            <div className='flex flex-row justify-center gap-5 '>
              <button className='bg-[#75795e] border border-green-950 font-semibold hover:border-red-800 hover:bg-red-400 p-2 rounded-lg' onClick={() => {setSelectType([true,false,false])}}>Delivered Letter</button>
              <button className='bg-[#75795e] border border-green-950 font-semibold hover:border-red-800 hover:bg-red-400 p-2 rounded-lg' onClick={() => {setSelectType([false,true,false])}}>Time Travelling</button>
              <button className='bg-[#75795e] border border-green-950 font-semibold hover:border-red-800 hover:bg-red-400 p-2 rounded-lg' onClick={() => {setSelectType([false,false,true])}}>Letters Recieved</button>
            </div>
        </div>
        <div className='h-screen'>
        {selectType[0] && deliveredLetterCards}
        {selectType[1] && timeTravellingLetterCards}
        {selectType[2] && <div className='text-5xl font-mono font-bold text-center mt-10'>Work in progress ⚒️</div>}
        </div>
    </div>
  )
}
//time travelling letters, delivered letters
//add multiple emails
//letters to you (sent, received) maybe