import avatar1 from '../../assets/avatars/avatar1.jpeg'
import coins from '../../assets/images/coins.png'


const Avatar = () => {





    return (
        <div className='flex flex-col items-center gap-1 bg-[#252525] shadow-lg rounded-md border border-solid border-gray-700 p-2'>
            <p className='text-gray-200'>Avatar One</p>    
            <div className='w-32 '>
                <img className='shadow-lg rounded-md' src={avatar1} alt="avatar" />
            </div> 
            <div className='w-20 flex items-center justify-center shadow-lg rounded-md bg-green-600 py-1 gap-1 m-2 cursor-pointer'>
                <span className='text-sm text-gray-200'>500</span>
                <img className='z-99 w-4 h-4 ' src={coins} alt="coins" />
            </div>       
        </div>
    )
}

export default Avatar