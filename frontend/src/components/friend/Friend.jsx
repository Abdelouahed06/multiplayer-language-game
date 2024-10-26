
import profileImage from '../../assets/images/v1.jpeg'
import { CloseIcon, NextArrowIcon } from '../../assets/svg/Icons'

const Friend = ({invitation}) => {



    return (
        <div className='flex flex-col items-center gap-4 bg-[#252525] shadow-lg rounded-md border border-solid border-gray-700 p-2'>
        {/* top part */ }
            <div className='flex gap-2'>
                <div className='flex gap-2'>
                    <div className='flex items-center justify-center border border-gray-400 rounded-full cursor-pointer w-10 h-10'>
                            {/* if profile image exits */}
                        <img  className='rounded-full object-contain' src={invitation.avatar} alt='profile' />
                            {/* if profile image does not exists */}
                        {/* <ProfileIcon width="24" height="24" className="text-gray-400" /> */}
                    </div>
                    <div>
                        <div className='flex items-center gap-1'>
                            <span className="text-gray-200 text-base font-medium">{invitation.name}</span>
                        </div>
                        <span className='text-gray-400 text-sm'>{invitation.level}</span>
                    </div>
                </div>
                <div className='text-gray-400 p-1 cursor-pointer'>
                    <CloseIcon />
                </div>
            </div>
            {/* center part */}
            <div className='bg-[#1c1c1c] border border-solid border-gray-400 px-2'>
                <span className="text-gray-200 font-sm">{invitation.m}</span>
                <span className="text-gray-200 font-sm mx-2">-</span>
                <span className="text-gray-200 font-sm">{invitation.o}</span>


            </div>
            {/* bottom part */}
            <button className='bg-green-600 text-gray-200 px-6 py-1 rounded-md shadow-md cursor-pointer'>
                Play
            </button>

        </div>
    )
}


export default Friend