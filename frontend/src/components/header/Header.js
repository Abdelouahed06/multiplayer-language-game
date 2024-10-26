import { AddIcon, CloseIcon, NavIcon, NotificationIcon, ProfileIcon, ShoppingIcon } from '../../assets/svg/Icons'
import profileImage from '../../assets/images/v1.jpeg'
import coins from '../../assets/images/coins.png'
import ContentNav from '../content/ContentNav'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PlayModal from '../PlayModal'



const Header = ({player, isModal, setIsModal}) => {

    const [isNav, setIsNav] = useState(false)


    return (
        <div className="relative bg-[#1c1c1c] shadow-lg">
            {/* top header */}
            <div className="h-14 flex items-center justify-between px-4">

                {/* left padrt of the top header */}
                <div className="flex flex-row items-center gap-2">
                    <NavIcon onClick={() => setIsNav(!isNav)} className="md:hidden block text-gray-400 cursor-pointer"/>
                    {/* <CloseIcon className="md:hidden block text-gray-400 cursor-pointer"/> */}
                    <Link to='/'>
                        <h1 className="hidden md:block text-xl text-gray-100 cursor-pointer">QuiLang</h1>
                    </Link>
                </div>
                
                {/* center part of the top header */}
                <div className='md:w-40 w-32 flex flex-row-reverse items-center gap-1 border border-solid border-gray-200 md:h-6 h-5'>
                    <div className='flex justify-center items-center bg-green-600 text-white cursor-pointer h-[100%] md:px-2 px-1'>
                        <AddIcon />
                    </div>
                    <img className='z-50 md:w-4 md:h-4 w-[14px] h-[14px]' src={coins} alt="coins" />
                    <span className='text-white md:text-lg text-sm'>{player.coins}</span>
                    
                </div>

                {/* right part of the top header */}
                <div className="flex items-center gap-6">
                    <Link to='/shop'>
                        <div className='md:block hidden'>
                            <ShoppingIcon width="20" height="20" className="text-gray-400 cursor-pointer" />
                        </div>
                    </Link>
                    <Link to='/notifications'>
                        <div className='relative md:block hidden'>
                            <NotificationIcon width="20" height="20" className="text-gray-400 cursor-pointer" />
                            
                            <span className='text-[10px] w-4 h-4 text-center text-white absolute top-[-6px] right-[-6px] bg-red-600 rounded-full'>
                                3
                            </span>
                        </div>
                    </Link>
                    <Link to='/profile'>
                        <div className='flex items-center justify-center border-2 border-gray-400 rounded-full cursor-pointer w-9 h-9'>
                            {/* if profile image exits */}
                            { !player.avatar && 
                                <img  className='rounded-full object-contain' src={profileImage} alt='profile' />
                            }
                            {/* if profile image does not exists */}
                            { player.avatar && 
                                <ProfileIcon width="24" height="24" className="text-gray-400" /> 
                            }
                        </div>
                    </Link>
                </div>

            </div>

            {/* bottom header
            { isMain && <div className='w-full md:flex gap-1 md:block hidden'>
                    <p onClick={() => setActiveOp('mcq')} className={activeOp === 'mcq' ? activeOption : option}>
                        MCQ
                    </p>
                    <p onClick={() => setActiveOp('wtw')} className={activeOp === 'wtw' ? activeOption : option}>
                        WTW
                    </p>
                    <p onClick={() => setActiveOp('hangman')} className={activeOp === 'hangman' ? activeOption : option}>
                        HANGMAN
                    </p>
                    <p onClick={() => setActiveOp('cs')} className={activeOp === 'cs' ? activeOption : option}>
                        CS
                    </p>
                    <p onClick={() => setActiveOp('h&w')} className={activeOp === 'h&w' ? activeOption : option}>
                        H&W
                    </p>
                </div>
            } */}

            {/* Side Bar */}
            { isNav && 
                <div >
                    <div onClick={() => setIsNav(false)} className='md:hidden block absolute top-14 left-0 z-50 w-72 h-[calc(100vh-56px)] bg-[#1e1e1e] pt-4 shadow-lg'>
                        <ContentNav isNav={isNav} setIsModal={setIsModal} isModal={isModal} />
                    </div>
                    <div onClick={() => setIsNav(false)} className="md:hidden block fixed top-14 inset-0 bg-black opacity-50 z-49"></div>
                </div>
            }

            {/* <PlayModal /> */}
        </div>
    )
}

export default Header


