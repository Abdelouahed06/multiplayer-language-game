import { FriendsIcon } from "../../assets/svg/Icons"
import Friend from "./Friend"
import avatar2 from '../../assets/avatars/avatar2.jpeg'
import avatar4 from '../../assets/avatars/avatar4.jpeg'
import avatar3 from '../../assets/avatars/avatar3.jpeg'
import avatar5 from '../../assets/avatars/avatar5.jpeg'


const Friends = () => {

    const invitations = [
        {name: 'Mark Lee', avatar: avatar3, level: 'A2', m: '2', o: '1'},
        {name: 'Adil Ben', avatar: avatar2, level: 'A2', m: '0', o: '1'},
        {name: 'Lucas Scott', avatar: avatar4, level: 'A2', m: '5', o: '6'},
        {name: 'John Doe', avatar: avatar5, level: 'A2', m: '3', o: '3'}

    ]

    return (
        <>
            <div className="flex justify-center px-4 py-4 flex-wrap gap-4 max-h-[calc(100vh-72px)] overflow-y-auto pb-16">
            { invitations && invitations.map((invitation, i) => (
                    <Friend key={i} invitation={invitation}/> 
                ))}
            </div>

            {/* in case there is no friends */}
            {/* <div className="flex items-center justify-center h-[calc(100vh-120px)]">
                <div className="flex gap-2 items-center">
                    <FriendsIcon width="24" height="24" className='text-gray-4s00' />
                    <p className="text-gray-400 text-xl font-md">No Friends</p>
                </div>
            </div> */}
            
        </>
    )
}


export default Friends