import { CloseIcon, ProfileIcon } from "../assets/svg/Icons"
import coins from '../assets/images/coins.png'




const PlayModal = () => {


    return (
        <div className="flex z-50 md:w-auto w-[90%] items-center md:gap-8 justify-between absolute top-1 left-1/2 transform -translate-x-1/2 bg-[#252525] shadow-lg rounded-lg p-2 border border-solid border-gray-700">
            {/* the left part */}
            <div className="flex gap-2">
                <div className='flex items-center justify-center border border-gray-400 rounded-full cursor-pointer w-12 h-12'>
                        {/* if profile image exits */}
                    {/* <img  className='rounded-full object-contain' src={profileImage} alt='profile' /> */}
                        {/* if profile image does not exists */}
                    <ProfileIcon width="24" height="24" className="text-gray-400" />
                </div>
                <div>
                    <span className="text-gray-200 md:font-medium font-sm">Achraf Nori</span>
                    <div className="flex gap-1 items-center">
                        <span className="md:text-sm text-xs text-gray-300">wants to play Vocabulary 500</span>
                        <img className='z-99 md:w-3.5 md:h-3.5 w-[10px] h-[10px]' src={coins} alt="coins" />
                    </div>
                </div>
            </div>
            
            {/* the right part */}
            <div className="h-8 flex flex-center gap-2">
                <div className='bg-red-700 text-gray-200 p-1 rounded-md shadow-md cursor-pointer'>
                    <CloseIcon />
                </div>
                <button className='bg-green-600 text-gray-200 px-4 py-1 rounded-md shadow-md cursor-pointer'>
                    play
                </button>
            </div>
        </div>
    )
}

export default PlayModal