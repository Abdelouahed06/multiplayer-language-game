import { useState } from "react"



const OptionsNav = ({activeOp, setActiveOp, op1, op2}) => {


    const option = 'w-[50%] text-gray-400 text-center border-b border-solid border-gray-400 py-2 cursor-pointer hover:text-gray-200 hover:border-gray-200' 
    const activeOption = 'w-[50%] text-[#007acc] text-center font-bold border-b-2 border-solid border-[#007acc] py-2 cursor-pointer'


    return (
        <div className="flex w-full justify-center px-4 mb-4">
            <p onClick={() => setActiveOp('op1')} className={activeOp === 'op1' ? activeOption : option}>
                {op1}
            </p>
            <p onClick={() => setActiveOp('op2')} className={activeOp === 'op2' ? activeOption : option}>
                {op2}
            </p>
        </div>
    )
}

export default OptionsNav