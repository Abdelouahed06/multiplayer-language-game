import { useState } from "react"
import OptionsNav from "../content/OptionsNav"
import AddPlayers from "./AddPlayers"
import Invitation from "./Invitation"
import avatar3 from '../../assets/avatars/avatar3.jpeg'
import avatar5 from '../../assets/avatars/avatar5.jpeg'
import { FriendsIcon, InvitationsIcon, ProfileIcon } from "../../assets/svg/Icons"




const Invitations = () => {

    const [activeOp, setActiveOp] = useState('op1')
    const invitations = [
        {name: 'Mark Lee', avatar: avatar3, id: 'ID89127373', n: 'FR', g: 'EN'},
        {name: 'Lucas Scott', avatar: avatar5, id: 'ID72364521', n: 'ES', g: 'EN'},
    ]

    return (
        <div>
            <OptionsNav activeOp={activeOp} setActiveOp={setActiveOp} op1={'Add Players'} op2={'Invitations'} />
            { activeOp === 'op1' && 
                <>
                    <AddPlayers /> 
                    {/* in case there is no notifications */}
                    {/* <div className="flex items-center justify-center h-[calc(100vh-120px)]">
                        <div className="flex gap-2 items-center">
                            <FriendsIcon width="24" height="24" className='text-gray-400' />
                            <p className="text-gray-400 text-xl font-md">No Players Found</p>
                        </div>
                    </div> */}
                </>
            }
            { activeOp === 'op2' && 
                
                <>
                    <div  className="flex flex-col gap-2 px-4 max-h-[calc(100vh-130px)] overflow-y-auto pb-4">
                        { invitations && invitations.map((invitation, i) => (
                            <Invitation key={i} showDel={true} invitation={invitation}/> 
                        ))}
                        {/* // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/> 
                        // <Invitation showDel={true}/>  */}

                    </div>
                    {/* in case there is no notifications */}
                    {/* <div className="flex items-center justify-center h-[calc(100vh-120px)]">
                        <div className="flex gap-2 items-center">
                            <InvitationsIcon width="24" height="24" className='text-gray-400' />
                            <p className="text-gray-400 text-xl font-md">No Invitations</p>
                        </div>
                    </div> */}
                </>
            }
            
        </div>
    )
}


export default Invitations