import { NextArrowIcon, ProfileIcon } from "../../assets/svg/Icons"
import profileImage from '../../assets/images/v1.jpeg'
import coins from '../../assets/images/coins.png'
import { useEffect } from "react"
import { Link } from "react-router-dom"



const Profile = ({player, capitalize}) => {


    useEffect(() => {
        console.log(player)
    }, [])


    return (
        <div className=" flex md:flex-row flex-col gap-4 items-center md:items-stretch justify-center md:py-12 px-4 pt-4 pb-12">
            {/* the left part */}
            <div className="md:w-[38%] w-[96%] flex flex-col items-center gap-2 bg-[#252525] shadow-lg rounded-md">
                <div className='flex items-center justify-center border border-gray-400 rounded-full cursor-pointer w-32 h-32 mt-4'>
                        {/* if profile image exits */}
                    { !player.avatar && 
                        <img  className='rounded-full object-contain' src={profileImage} alt='profile' />
                    }
                        {/* if profile image does not exists */}
                    { player.avatar && 
                        <ProfileIcon width="64" height="64" className="text-gray-400" /> 
                    }
                </div>
                <span className="text-gray-300 text-2xl">{capitalize(player.name)}</span>
                <span className='text-gray-400 text-md'>ID{player.id}</span>
                <div className='flex items-center gap-1 mt-2 mb-8'>
                    <p className="border border-solid border-gray-400 text-gray-300 text-sm font-medium rounded-md px-1 flex items-center ml-1">
                        {player.native_language.short_form}
                    </p>
                    <NextArrowIcon className="text-gray-300" width="1em" height="1em" />
                    <p className="border border-solid border-gray-400 text-gray-300 text-sm font-medium rounded-md px-1 flex items-center">
                        {player.goal_language.short_form}
                    </p>
                </div>
                <Link to='/setting'>
                    <button className='bg-[#007acc] text-gray-200 w-32 py-1 rounded-md shadow-md cursor-pointer mb-4'>
                        Edit Info
                    </button>
                </Link>
            </div>
            {/* the right part */}
            <div className="md:w-[58%] w-[96%] flex flex-col gap-2 bg-[#252525] shadow-lg rounded-md px-8 py-6">
                <div className="flex gap-4 border px-4 py-2 rounded-md border-gray-700">
                    <p className="text-gray-300 w-[30%]">Country</p>
                    <p className="text-gray-400">Morocco</p>
                </div>
                <div className="flex gap-4 border px-4 py-2 rounded-md border-gray-700 mt-2">
                    <p className="text-gray-300 w-[30%]">Gender</p>
                    <p className="text-gray-400">{player.gender}</p>
                </div>
                <div className="flex gap-4 items-center border px-4 py-2 rounded-md border-gray-700 mt-2">
                    <span className="text-gray-300 w-[30%]">Coins</span>
                    <div className="flex items-center">
                        <span className="text-gray-400 mr-1">{player.coins}</span>
                        <img className='w-4 h-4' src={coins} alt="coins" />
                    </div>
                </div>
                <div className="flex gap-4 border px-4 py-2 rounded-md border-gray-700 mt-2">
                    <p className="text-gray-300 w-[30%]">Level</p>
                    <p className="text-gray-400">{player.level}</p>
                </div>
                <div className="flex gap-4 border px-4 py-2 rounded-md border-gray-700 mt-2">
                    <p className="text-gray-300 w-[30%]">Wins</p>
                    <p className="text-gray-400">{player.wins}</p>
                </div>
                <div className="flex gap-4 border px-4 py-2 rounded-md border-gray-700 mt-2">
                    <p className="text-gray-300 w-[30%]">Losses</p>
                    <p className="text-gray-400">{player.losses}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile