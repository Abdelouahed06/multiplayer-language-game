import { Link, useNavigate } from "react-router-dom"
import { FriendsIcon, GamesIcon, InvitationsIcon, LogOutIcon, NextArrowIcon, NotificationIcon, ProfileIcon, SettingIcon, ShoppingIcon } from "../../assets/svg/Icons"
import { useEffect, useState } from "react"


const ContentNav = ({page, isNav, setIsModal}) => {

    const [activeLi, setActiveLi] = useState(page)

    const nonActiveClass = "flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4"
    const activeClass = "flex items-center justify-between mb-2 cursor-pointer bg-[#252526] p-4"
    
    useEffect(() => {
        setActiveLi(page)
    }, [page])

    return (
        <ul className="w-full">            
            { isNav && 
                <Link to='/'>
                    <li onClick={() => setActiveLi('games')} className="flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4">
                        <div className="flex items-center gap-2">
                            <GamesIcon className={ activeLi === 'games' ? 'text-[#007acc]' : 'text-gray-300' } />
                            <span className={ activeLi === 'games' ? 'text-[#007acc]' : 'text-gray-300' }>Games</span>
                        </div>               
                        <NextArrowIcon className={ activeLi === 'games' ? 'text-[#007acc]' : 'text-gray-300' } width="1em" height="1em"/>
                    </li> 
                </Link>
            }
            { !isNav && 
                <Link to='/profile'>
                    <li onClick={() => setActiveLi('profile')} className="flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4">
                        <div className="flex items-center gap-2">
                            <ProfileIcon width="1em" height="1em" className={ activeLi === 'profile' ? 'text-[#007acc]' : 'text-gray-300' }/>
                            <span className={ activeLi === 'profile' ? 'text-[#007acc]' : 'text-gray-300' }>Profile</span>
                        </div>               
                        <NextArrowIcon className={ activeLi === 'profile' ? 'text-[#007acc]' : 'text-gray-300' } width="1em" height="1em"/>
                    </li>
                </Link>
            }
            <Link to='/shop'>
                <li onClick={() => setActiveLi('shop')} className="flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4">
                    <div className="flex items-center gap-2">
                        <ShoppingIcon width="1em" height="1em" className={ activeLi === 'shop' ? 'text-[#007acc]' : 'text-gray-300' }/>
                        <span className={ activeLi === 'shop' ? 'text-[#007acc]' : 'text-gray-300' }>Shop</span>
                    </div>               
                    <NextArrowIcon className={ activeLi === 'shop' ? 'text-[#007acc]' : 'text-gray-300' } width="1em" height="1em"/>
                </li>
            </Link>

            <Link to='/notifications'>
                <li onClick={() => setActiveLi('notifications')} className="flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4">
                    <div className="flex items-center gap-2">
                        <NotificationIcon width="1em" height="1em" className={ activeLi === 'notifications' ? 'text-[#007acc]' : 'text-gray-300' }/>
                        <span className={ activeLi === 'notifications' ? 'text-[#007acc]' : 'text-gray-300' }>Notifications</span>
                    </div>               
                    <NextArrowIcon className={ activeLi === 'notifications' ? 'text-[#007acc]' : 'text-gray-300' } width="1em" height="1em"/>
                </li>
            </Link>

            <Link to='/friends'>
                <li onClick={() => setActiveLi('friends')} className="flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4">
                    <div className="flex items-center gap-2">
                        <FriendsIcon width="1em" height="1em" className={ activeLi === 'friends' ? 'text-[#007acc]' : 'text-gray-300' }/>
                        <span className={ activeLi === 'friends' ? 'text-[#007acc]' : 'text-gray-300' }>Friends</span>
                    </div>               
                    <NextArrowIcon className={ activeLi === 'friends' ? 'text-[#007acc]' : 'text-gray-300' } width="1em" height="1em"/>
                </li>
            </Link>

            <Link to='/invitations'>
                <li onClick={() => setActiveLi('invitations')} className="flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4">
                    <div className="flex items-center gap-2">
                        <InvitationsIcon className={ activeLi === 'invitations' ? 'text-[#007acc]' : 'text-gray-300' }/>
                        <span className={ activeLi === 'invitations' ? 'text-[#007acc]' : 'text-gray-300' }>Invitations</span>
                    </div>               
                    <NextArrowIcon className={ activeLi === 'invitations' ? 'text-[#007acc]' : 'text-gray-300' } width="1em" height="1em"/>
                </li>
            </Link>


            <Link to='/setting'>
                <li onClick={() => setActiveLi('setting')} className="flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4">
                    <div className="flex items-center gap-2">
                        <SettingIcon className={ activeLi === 'setting' ? 'text-[#007acc]' : 'text-gray-300' }/>
                        <span className={ activeLi === 'setting' ? 'text-[#007acc]' : 'text-gray-300' }>Setting</span>
                    </div>               
                    <NextArrowIcon className={ activeLi === 'setting' ? 'text-[#007acc]' : 'text-gray-300' } width="1em" height="1em"/>
                </li>
            </Link>

            <li onClick={() => setIsModal(true)} className="flex items-center justify-between mb-2 cursor-pointer hover:bg-[#252526] p-4">
                <div className="flex items-center gap-2">
                    <LogOutIcon className="text-gray-300"/>
                    <span className="text-gray-300">Log Out</span>
                </div>               
                <NextArrowIcon className="text-gray-300" width="1em" height="1em"/>
            </li>

            {/* <li className="flex items-center justify-between mb-2 cursor-pointer bg-[#252526] p-4">
                <div className="flex items-center gap-2">
                    <InvitationsIcon className="text-[#007acc]"/>
                    <span className="text-[#007acc]">Invitations</span>
                </div>               
                <NextArrowIcon className="text-[#007acc]"/>
            </li> */}
        </ul>
    )
}

export default ContentNav