import { NotificationIcon } from "../../assets/svg/Icons"
import Notification from "./Notification"



const Notifications = () => {



    return (
        <>
            <div className="p-4">
                <Notification />
                <Notification />
                <Notification />
                {/* <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification /> */}

            </div>

            {/* in case there is no notifications */}
            {/* <div className="flex items-center justify-center h-[calc(100vh-120px)]">
                <div className="flex gap-2 items-center">
                    <NotificationIcon width="24" height="24" className='text-gray-400' />
                    <p className="text-gray-400 text-xl font-md">No Notifications</p>
                </div>
            </div> */}
        </>
            
    )
}

export default Notifications