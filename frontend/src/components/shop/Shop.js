import { useState } from "react"
import Avatar from "./Avatar"
import Message from "./Message"
import OptionsNav from "../content/OptionsNav"


const Shop = () => {

    const [activeOp, setActiveOp] = useState('op1')

    return (
        <div>
            <OptionsNav activeOp={activeOp} setActiveOp={setActiveOp} op1={'Avatars'} op2={'Messages'} />
            { activeOp === 'op1' && 
                <div className="flex justify-center flex-wrap gap-4 max-h-[calc(100vh-130px)] overflow-y-auto px-4 pb-16">
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 
                    <Avatar /> 

                </div>
            }
            { activeOp === 'op2' && 
                <div className="flex justify-center flex-wrap gap-4 max-h-[calc(100vh-130px)] overflow-y-auto px-4 pb-16">
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 
                    <Message /> 


                </div>
            }
            
        </div>
    )
}

export default Shop