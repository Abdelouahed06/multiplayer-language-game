import { useState } from "react"
import Friend from "../friend/Friend"
import Friends from "../friend/Friends"
import Header from "../header/Header"
import Invitations from "../invitation/Invitations"
import Profile from "../profile/Profile"
import Setting from "../setting/Setting"
import Shop from "../shop/Shop"
import ContentNav from "./ContentNav"
import LogoutModal from "../LogoutModal"
import Notifications from "../notification/Notifications"

const Content = ({page, player}) => {

    const [isModal, setIsModal] = useState(false);


    const capitalize = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };


    return (
        <div className="h-screen">
            <Header player={player} setIsModal={setIsModal} isModal={isModal} />
            <div className="flex">
                <div className="bg-[#1c1c1c] w-1/3 h-[calc(100vh-56px)] z-50 p-4 md:block hidden">
                    <ContentNav page={page} isNav={false} setIsModal={setIsModal} isModal={isModal}/>
                </div> 
                <div className="bg-[#1f1f1f] md:w-2/3 w-full h-[calc(100vh-56px)] py-2 overflow-y-auto">
                    {/* pages go here */}
                    { page === 'profile' && <Profile player={player} capitalize={capitalize} /> }
                    { page === 'shop' && <Shop player={player} capitalize={capitalize} /> }
                    { page === 'notifications' && <Notifications player={player} capitalize={capitalize} /> }
                    { page === 'invitations' && <Invitations player={player} capitalize={capitalize} /> }
                    { page === 'friends' && <Friends player={player} capitalize={capitalize} /> }
                    { page === 'setting' && <Setting  player={player} capitalize={capitalize} /> }


                </div>
            </div>
            {isModal && <LogoutModal setIsModal={setIsModal} isModal={isModal}/> }

        </div>
    )
}

export default Content