import profileImage from '../../assets/images/v1.jpeg'
import coins from '../../assets/images/coins.png'



const Notification = () => {



    return (
        <div className="flex gap-2 items-center bg-[#252525] w-full shadow-lg rounded-lg p-2 mt-2 border border-solid border-gray-700">
            <div className='flex items-center justify-center border border-gray-400 rounded-full cursor-pointer w-12 h-12'>
                    {/* if profile image exits */}
                <img  className='rounded-full object-contain' src={profileImage} alt='profile' />
                    {/* if profile image does not exists */}
                {/* <ProfileIcon width="24" height="24" className="text-gray-400" /> */}
            </div>
            {/* <div className="flex flex-row items-center gap-1 flex-wrap"> */}
            
            <span className="text-gray-200">
                <b className="text-gray-200 font-medium">Abdo Ess </b>
                sent you a request to play in vocabulary.
            </span>

              
                
                
        </div>
    )
}

export default Notification