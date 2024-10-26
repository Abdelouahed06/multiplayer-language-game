import { useEffect, useState } from "react"


const Personal = ({playerInfo, handleChange, setStep}) => {

    const [errorMsg, setErrorMsg] = useState({errorNo: 0, msg: ''})
    const [isNextDisabled, setIsNextDisabled] = useState(true)


    const handleNextClick = (e) => {
        e.preventDefault()
        if(!/^[a-zA-Z]{3,10}$/.test(playerInfo.fname)) {
            if(playerInfo.fname.length < 3) {
                setErrorMsg({errorNo: 1, msg: '*at least 3 letters.'})
            } else if(playerInfo.fname.length > 10) {
                setErrorMsg({errorNo: 1, msg: '*at most 10 letters.'})
            } else {
                setErrorMsg({errorNo: 1, msg: '*only letters allowed.'})
            }
        } else if(!/^[a-zA-Z]{3,10}$/.test(playerInfo.lname)) {
            if(playerInfo.lname.length < 3) {
                setErrorMsg({errorNo: 2, msg: '*at least 3 letters.'})
            } else if(playerInfo.lname.length > 10) {
                setErrorMsg({errorNo: 2, msg: '*at most 10 letters.'})
            } else {
                setErrorMsg({errorNo: 2, msg: '*only letters allowed.'})
            }
        } else {
            setErrorMsg({errorNo: 0, msg: ''})
            console.log('First Step Is Done!! => ', playerInfo)
            setStep(2)
        }
    }
    
    useEffect(() => {
        if(playerInfo.fname != '' && playerInfo.lname != '' && playerInfo.gender != '') {
            setIsNextDisabled(false)
        }
    }, [playerInfo])


    return (
        <form action="" className="flex flex-col">
            <div className={`w-full ${errorMsg.errorNo === 1 ? 'mb-1' : 'mb-4'}`}>
                <input onChange={handleChange} defaultValue={playerInfo.fname} className={`bg-[#3e3e42] text-white p-2 mt-8 rounded-xl border outline-none ${errorMsg.errorNo === 1 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`} type="text" name="fname" placeholder="First Name" />
                <br />
                { errorMsg.errorNo === 1 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }

            </div>
            <div className={`w-full ${errorMsg.errorNo === 2 ? 'mb-1' : 'mb-4'}`}>
                <input onChange={handleChange} defaultValue={playerInfo.lname} className={`bg-[#3e3e42] text-white p-2 rounded-xl border outline-none ${errorMsg.errorNo === 2 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`} type="text" name="lname" placeholder="Last Name" />
                <br />
                { errorMsg.errorNo === 2 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }

            </div>
            <div className={`w-[235px] ${errorMsg.errorNo === 3 ? 'mb-1' : 'mb-4'}`}> 
                <select onChange={handleChange} defaultValue={playerInfo.gender} name="gender" className={`w-[235px] bg-[#3e3e42] border border-gray-300 text-white outline-none rounded-xl block w-full p-2.5 ${errorMsg.errorNo === 3 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>  
                { errorMsg.errorNo === 3 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
            </div>
                      
            <div className="w-[235px] flex justify-between align-items gap-2 px-1">
                <button disabled className="bg-gray-500 rounded-xl w-1/2 text-white py-2 disabled:opacity-75">Previous</button>
                <button disabled={isNextDisabled} onClick={handleNextClick} className={`${isNextDisabled ? 'disabled:opacity-75 disabled:scale-100': ''} bg-[#007acc] rounded-xl w-1/2 text-white py-2 hover:scale-105 duration-300`}>
                    Next
                </button>
            </div>
        </form>
    )
}

export default Personal