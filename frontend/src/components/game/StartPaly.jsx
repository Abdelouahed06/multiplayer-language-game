import React,{useState, useEffect} from 'react'
import profileImage from '../../assets/images/v1.jpeg'
import profilePlayerImage from '../../assets/images/v1.jpeg'
import coins from '../../assets/images/coins.png'

export default function StartPaly() {

    // this code for [.....] Animation lmohim chat li 3tah lya hhhh

    const [visibleCount, setVisibleCount] = useState(1);
    const [direction, setDirection] = useState('up'); 
    const elements = ["•", "•", "•", "•"]; 

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleCount((prevCount) => {
                if (direction === 'up') {
                    if (prevCount === elements.length) {
                        setDirection('down');
                        return prevCount - 1;
                    } else {
                        return prevCount + 1;
                    }
                } else {
                    if (prevCount === 1) {
                        setDirection('up');
                        return prevCount + 1;
                    } else {
                        return prevCount - 1;
                    }
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, [direction, elements.length]);

    return (
        <div className='flex items-center justify-center min-h-screen bg-[#1c1c1c] p-2'>
            {/*this is your profil icon and U name */}
            <div className='flex flex-col items-center text-center md:w-[120px] w-[100px] md:h-[150px] h-[130px] mr-4'>
                {/* <div className='bg-[#202020] md:w-[120px] w-[100px] md:h-[120px] h-[100px] p-2 shadow-lg rounded-xl'>
                    <img className='rounded-full object-contain' src={profileImage} alt='profile' />
                </div> */}
                <div className='flex items-center justify-center border border-gray-400 rounded-full cursor-pointer w-24 h-24'>
                        {/* if profile image exits */}
                    <img  className='rounded-full object-contain' src={profileImage} alt='profile' />
                        {/* if profile image does not exists */}
                    {/* <ProfileIcon width="24" height="24" className="text-gray-400" /> */}
                </div>
                <p className='text-[#fff] pt-2'>Youssef Zer</p>
            </div>
            {/* this is how mush coins U playing with */}
            <div className='w-[100px] flex items-center justify-center gap-1 border border-solid border-gray-200 md:h-6 h-5'>
                <img className='z-99 md:w-4 md:h-4 w-[14px] h-[14px]' src={coins} alt="coins" />
                <span className='text-white md:text-lg text-sm'>500</span>
            </div>
            {/* this is ather player profil */} 
            <div className='flex flex-col items-center text-center md:w-[120px] w-[100px] md:h-[150px] h-[130px] ml-4'>
            <div className='flex items-center justify-center border border-gray-400 rounded-full cursor-pointer w-24 h-24'>
            {/* <img className='rounded-full object-contain' src={profilePlayerImage} alt='profile' /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" >
                        <path fill="white" d="M16 4c-4.328 0-8 3.055-8 7v3h6v-3c0-.148.09-.363.438-.594c.347-.23.914-.406 1.562-.406c.652 0 1.219.176 1.563.406c.343.23.437.43.437.594c0 .578-.188.98-.563 1.438c-.375.457-.957.93-1.593 1.468C14.566 14.988 13 16.496 13 19v1h6v-1c0-.34.125-.578.5-.969c.375-.39.996-.851 1.656-1.406C22.476 15.515 24 13.816 24 11c0-3.91-3.664-7-8-7zm0 2c3.395 0 6 2.367 6 5c0 2.145-.977 3.102-2.156 4.094c-.59.496-1.219.98-1.782 1.562c-.347.36-.617.828-.812 1.344h-1.938c.313-1.012.922-1.781 1.844-2.563c.614-.515 1.282-1.054 1.844-1.75c.563-.695 1-1.605 1-2.687c0-.96-.57-1.758-1.313-2.25C17.945 8.258 17.005 8 16 8c-1.008 0-1.95.258-2.688.75C12.575 9.242 12 10.043 12 11v1h-2v-1c0-2.684 2.598-5 6-5zm-3 16v6h6v-6zm2 2h2v2h-2z"></path>
                    </svg>
                    
                </div>
                {/* her U find the animation */} 
                <p className='flex flex-row items-center justify-center space-x-2 text-[#fff] pt-2'>
                    {elements.slice(0, visibleCount).map((element, index) => (
                        <div
                            key={index}
                            className="transition-opacity duration-500 opacity-100"
                        >
                            {element}
                        </div>
                    ))}
                </p>
            </div>
        </div>
    )
}
