import profileImage from '../../assets/avatars/avatar2.jpeg'
import { CloseIcon, NextArrowIcon } from '../../assets/svg/Icons'


const Invitation = ({showDel, invitation}) => {



    return (
        <div className="flex items-center justify-between bg-[#252525] w-full shadow-lg rounded-lg p-2 border border-solid border-gray-700">
            {/* the right part */}
            <div className='flex gap-2'>
                <div className='flex items-center justify-center border border-gray-400 rounded-full cursor-pointer w-12 h-12'>
                        {/* if profile image exits */}
                    <img  className='rounded-full object-contain' src={invitation.avatar} alt='profile' />
                        {/* if profile image does not exists */}
                    {/* <ProfileIcon width="24" height="24" className="text-gray-400" /> */}
                </div>
                <div>
                    <div className='flex items-center gap-1'>
                        <span className="text-gray-200 font-medium">{invitation.name}</span>
                        <p className="border border-solid border-gray-400 text-gray-300 text-xs font-medium rounded-md px-1 flex items-center ml-1">{invitation.n}</p>
                        <NextArrowIcon className="text-gray-300" width="0.7em" height="0.7em" />
                        <p className="border border-solid border-gray-400 text-gray-300 text-xs font-medium rounded-md px-1 flex items-center">{invitation.g}</p>
                    </div>
                    <span className='text-gray-400 text-sm'>{invitation.id}</span>
                </div>
            </div>
            {/* the left part */}
            <div className='flex items-center gap-1'> 
                { showDel && 
                    <div className='bg-red-700 text-gray-200 p-1 rounded-md shadow-md cursor-pointer'>
                        <CloseIcon />
                    </div>
                }
                <button className='bg-[#007acc] text-gray-200 px-4 py-1 rounded-md shadow-md cursor-pointer'>
                    { showDel ? 'Accept' : 'Invite' }
                </button>
                
            </div>
        </div>
    )
}

export default Invitation