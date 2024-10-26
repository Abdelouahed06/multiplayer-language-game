import React from 'react'
// import { DolarIcon } from '../../assets/svg/Icons'
import coins from '../../assets/images/coins.png'
import { useNavigate } from 'react-router-dom'

const Category = ({name}) => {

    const navigate = useNavigate()

    const handlePlayClick = () => {
        navigate('/qcm')
    }


    return (
        <div className="rounded-xl bg-[#252526] p-8 md:w-[295px] w-full shrink-0 shadow-lg">
            <div className='text-center text-white text-xl'>{name}</div>
            <div className='flex mt-6 justify-center'>
                <select defaultValue={'50'} className="bg-[#212833] rounded-tl-lg  rounded-bl-md outline-none border-r-0 border border-gray-600 text-white text-sm w-1/4  px-2.5 py-1.5 placeholder-gray-400">
                    <option value='50'>50</option>
                    <option value="1000">100</option>
                    <option value="2000">500</option>
                    <option value="5000">1K</option>
                </select>
                <span className="inline-flex items-center border border-gray-600 border-l-0 bg-[#212833] rounded-tr-lg rounded-br-md px-3 text-sm text-gray-400">
                <img className='z-99 md:w-4 md:h-4 w-[16px] h-[16px]' src={coins} alt="coins" />
                </span>
            </div>
            <div className='flex mt-6 justify-center'>
            <button onClick={handlePlayClick} type="button" className="w-2/4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2">
                Play
            </button>

            </div>
        </div>
    )
}

export default Category
