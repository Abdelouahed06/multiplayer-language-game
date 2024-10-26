import pic from '../../../assets/images/apple.png'
import { useEffect, useState } from 'react';
import { TimerIcon } from '../../../assets/svg/Icons';
import { useNavigate } from 'react-router-dom';
const QCM = ({correctAnswers, setCorrectAnswers}) => {

  const data = [
    {question: 'Someone who is eager to explore, discover, or understand more about a topic, situation, or object.',
       op1: 'Apple', op2: 'Orange',op3: 'Tomato', op4: 'Onion'},
    {question: 'quest 2', op1: 'op1', op2: 'op2',op3: 'op3', op4: 'op4'},
    {question: 'quest 3', op1: 'op1', op2: 'op2',op3: 'op3', op4: 'op4'}
  ]

  const [questions, setQuestions] = useState(data)
  const [questNo, setQuestNo] = useState(0)
  const [optionsOrder, setOptionsOrder] = useState([])
  const [timer, setTimer] = useState(0)
  const [isOptionDisabled, setIsOptionDisabled] = useState(false)

  const navigate = useNavigate()

  // option one click
  const handleOption1Click = (e) => {
    setIsOptionDisabled(true)
    if(!isOptionDisabled) {
      let bgColor = 'bg-red-700'
      if(questions[questNo].op1 === optionsOrder[0]) {
        bgColor = 'bg-green-700'
        setCorrectAnswers(correctAnswers+1)
      }

      e.target.classList.add(bgColor)
      setTimer(5)
      setTimeout(() => {
        e.target.classList.remove(bgColor)
        setQuestNo(questNo+1)
        setIsOptionDisabled(false)
      }, 5000)
    }
  }

  // option two click
  const handleOption2Click = () => {
    setQuestNo(questNo+1)
  }

  const handleOption3Click = () => {
    setQuestNo(questNo+1)
  }

  const handleOption4Click = () => {
    setQuestNo(questNo+1)
  }

  useEffect(() => {
    if(timer > 0) {
    const time = setTimeout(() => {
      setTimer(timer - 1)
    }, 1000);

    return () => clearTimeout(time); }
  }, [timer]);

  useEffect(() => {
    let initialArr = [questions[questNo].op1, questions[questNo].op2, questions[questNo].op3, questions[questNo].op4]
    let newArr = []

    let random = Math.floor(Math.random() * 4)
    newArr.push(initialArr[random])
    initialArr.splice(random, 1)

    random = Math.floor(Math.random() * 3)
    newArr.push(initialArr[random])
    initialArr.splice(random, 1)

    random = Math.floor(Math.random() * 2)
    newArr.push(initialArr[random])
    initialArr.splice(random, 1)

    newArr.push(initialArr[0])
    setOptionsOrder(newArr)

  }, [questNo])



  return ( 
    <div className="rounded-xl bg-[#202020] px-8 py-4 md:w-[400px] w-full shadow-lg">
      { timer !== 0 && <p className='flex justify-center items-center text-white mb-4'>
          <TimerIcon/> :<span className='pr-5 pl-5 text-base'>{ timer } s</span>
        </p>
      }
      <div className=" flex justify-center items-center rounded border border-gray-400" style={{ height: "180px"}}>
        {/* <h1 className="text-lg font-bold text-white p-4 text-center">
          { questions[questNo].question }
        </h1> */}
        <img className='object-cover w-full h-full' src={pic} alt="pic"/>
      </div>
      <div className="my-8 grid grid-cols-1 gap-2">
        <button onClick={handleOption1Click} className={'p-2 text-white font-bold rounded-lg bg-[#1C1C1C] border border-gray-400'}>
        { optionsOrder[0] }
        </button>
        <button onClick={handleOption2Click} className={'p-2 text-white font-bold rounded-lg bg-[#1C1C1C] border border-gray-400'}>
        { optionsOrder[1] }
        </button>
        <button onClick={handleOption3Click} className={'p-2 text-white font-bold rounded-lg bg-[#1C1C1C] border border-gray-400'}>
        { optionsOrder[2] }
        </button>
        <button onClick={handleOption4Click} className={'p-2 text-white font-bold rounded-lg bg-[#1C1C1C] border border-gray-400'}>
        { optionsOrder[3] }
        </button>
      </div>
    </div>
  );
}

export default QCM