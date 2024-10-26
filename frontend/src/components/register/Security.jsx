import { useEffect, useState } from "react"
import { fetchRegister } from "../../redux/AuthReducer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



const Security = ({playerInfo, handleChange, setStep}) => {

    const [errorMsg, setErrorMsg] = useState({errorNo: 0, msg: ''})

    const [isNextDisabled, setIsNextDisabled] = useState(true)
    const [isPrevDisabled, setIsPrevDisabled] = useState(false)

    // backend code here
    const [isRegister, setIsRegister] = useState(false)

    const resp = useSelector(i => i.auth.resp)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlePrevClick = (e) => {
        e.preventDefault()
        setStep(2)
    }

    const handleNextClick = async (e) => {
        e.preventDefault()
        console.log(playerInfo.email)
        if(!/^(?=.{8,20}@)[a-zA-Z][a-zA-Z0-9]*(_[a-zA-Z0-9]+)?[a-zA-Z0-9]*@[a-zA-Z]{3,8}(?:-[a-zA-Z]+)?\.[a-zA-Z]{2,5}$/.test(playerInfo.email)) {
            setErrorMsg({errorNo: 1, msg: 'invalid email.'})
        }  else if(!/^[\W\w]{8,20}$/.test(playerInfo.password)) {
            if(playerInfo.password.length < 8) {
                setErrorMsg({errorNo: 2, msg: 'at least 8 letters.'})
            } else if(playerInfo.password.length > 20) {
                setErrorMsg({errorNo: 2, msg: 'at most 20 letters.'})
            }
        } else if(playerInfo.passwordC !== playerInfo.password) {
                setErrorMsg({errorNo: 3, msg: 'passwords are not similar.'})
        } else {
            // make an request to laravel to check of the email doesn't exists!
            // if the email already exists give an error if not procede to the next page!
            setIsNextDisabled(true)
            setIsPrevDisabled(true)
            setErrorMsg({errorNo: 0, msg: ''})
            // setStep(3)
            setIsRegister(true)
            await dispatch(fetchRegister(playerInfo))
            
        }
    }

    useEffect(() => {
        if(playerInfo.email != '' && playerInfo.password != '' && playerInfo.passwordC != '') {
            setIsNextDisabled(false)
        }
    }, [playerInfo])

    useEffect(() => {
        console.log('resp is changed!!')
        if(isRegister) {
            console.log('inside is register!!')
            if(resp.status === 422) {
                console.log('inside if 422')
                if(resp.error.email) {
                    console.log('email is already exist!!')
                    setErrorMsg({errorNo: 1, msg: resp.error.email})
                } else if (resp.status.password) {
                    setErrorMsg({errorNo: 2, msg: resp.error.password})
                } else {
                    console.log('something went wrong!! try again')
                    navigate('/login')
                }
                setIsNextDisabled(false)
                setIsPrevDisabled(false)
                setIsRegister(false)
            }
        }

        
    }, [resp])

    return (
        <form action="" className="flex flex-col">
            <div className={`w-full  mt-8 ${errorMsg.errorNo === 1 ? 'mb-1' : 'mb-4'}`}>
                <input onChange={handleChange} defaultValue={playerInfo.email} className={`bg-[#3e3e42] text-white p-2 rounded-xl border outline-none ${errorMsg.errorNo === 1 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`} type="email" name="email" placeholder="Email" />
                <br />
                { errorMsg.errorNo === 1 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
            </div>
            <div className={`w-full ${errorMsg.errorNo === 2 ? 'mb-1' : 'mb-4'}`}>
                <div className="w-[235px] relative">
                    <input onChange={handleChange} defaultValue={playerInfo.password} className={`bg-[#3e3e42] text-white p-2 rounded-xl border outline-none ${errorMsg.errorNo === 2 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`} type="password" name="password" placeholder="Password" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                </div>
                { errorMsg.errorNo === 2 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
            </div>
            <div className={`w-full ${errorMsg.errorNo === 3 ? 'mb-1' : 'mb-4'}`}>
                <div className="w-[235px] relative">
                    <input onChange={handleChange} defaultValue={playerInfo.passwordC} className={`bg-[#3e3e42] text-white p-2 rounded-xl border outline-none ${errorMsg.errorNo === 3 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`} type="password" name="passwordC" placeholder="Confirm Password" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                </div>
                { errorMsg.errorNo === 3 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
            </div>
            
            
            
            <div className="w-[235px] flex justify-between align-items gap-2 px-1">
                <button disabled={isPrevDisabled} onClick={handlePrevClick} className={`${isPrevDisabled ? 'disabled:opacity-75 disabled:scale-100' : ''} bg-gray-500 rounded-xl w-1/2 text-white py-2 hover:scale-105 duration-300 cursor-pointer`}>
                    Previous
                </button>
                <button disabled={isNextDisabled} onClick={handleNextClick} className={`${isNextDisabled ? 'disabled:opacity-75 disabled:scale-100': ''} bg-[#007acc] rounded-xl w-1/2 text-white py-2 hover:scale-105 duration-300`}>
                    Next
                </button>
            </div>
        </form> 
    )
}

export default Security