import coins from '../../assets/images/coins.png'


const Message = () => {


    return (
        <div className='w-full md:w-[48%] bg-[#212121] shadow-lg rounded-md border border-gray-700 p-2'>
            <div className="bg-[#323232] flex flex-col items-center gap-2 p-2 rounded-lg">
                <span className="w-full bg-gray-200 text-gray-800 text-center rounded-xl py-1">Beat ya!</span>
                <span className="w-full bg-gray-200 text-gray-800 text-center rounded-xl py-1">hi: How are you!</span>
                <span className="w-full bg-gray-200 text-gray-800 text-center rounded-xl py-1">stop messing around</span>
                <span className="w-full bg-gray-200 text-gray-800 text-center rounded-xl py-1">play seriously</span>
                <span className="w-full bg-gray-200 text-gray-800 text-center rounded-xl py-1">Beat ya!</span>
                <span className="w-full bg-gray-200 text-gray-800 text-center rounded-xl py-1">is that all you got ya!</span>
                <span className="w-full bg-gray-200 text-gray-800 text-center rounded-xl py-1">Beat ya!</span>
                <span className="w-full bg-gray-200 text-gray-800 text-center rounded-xl py-1">Beat ya!</span>


            </div>
            <div className="flex items-center justify-center">
                <div className='w-28 flex items-center justify-center shadow-lg rounded-md bg-green-600 py-1 gap-1 m-2 cursor-pointer'>
                    <span className='text-sm text-gray-200'>500</span>
                    <img className='z-99 w-4 h-4 ' src={coins} alt="coins" />
                </div> 
            </div>
        </div>
    )
}

export default Message
