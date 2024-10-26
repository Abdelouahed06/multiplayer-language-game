import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateInfo, fetchUpdatePassword } from '../../redux/PlayerReducer';
import Spinner from '../spinner/Spinner';



const Setting = ({player, capitalize}) => {

    const [playerInfo, setPlayerInfo] = useState(
        {
            email: player.email, fname: player.name.split(' ')[0], lname: player.name.split(' ')[1]

        }
    )
    const [playerPass, setPlayerPass] = useState({password: player.password, newPassword: '', confirmPassword: ''})
    const [errorMsg, setErrorMsg] = useState({errorNo: 0, msg: ''})

    const handleInfoChange = (e) => {
        setPlayerInfo({...playerInfo, [e.target.name]: e.target.value})
    }

    const handlePassChange = (e) => {
        setPlayerPass({...playerPass, [e.target.name]: e.target.value})
    }

    const token = JSON.parse(localStorage.getItem('token'));

    const loadingInfo = useSelector((state) => state.player?.loadingInfo);
    const loadingPass = useSelector((state) => state.player?.loadingPass);



    const dispatch = useDispatch()

    const handleInfoClick = async () => {
        console.log(playerInfo)
        if(!/^(?=.{8,20}@)[a-zA-Z][a-zA-Z0-9]*(_[a-zA-Z0-9]+)?[a-zA-Z0-9]*@[a-zA-Z]{3,8}(?:-[a-zA-Z]+)?\.[a-zA-Z]{2,5}$/.test(playerInfo.email)) {
            setErrorMsg({errorNo: 1, msg: 'invalid email.'})
        } else if(!/^[a-zA-Z]{3,10}$/.test(playerInfo.fname)) {
            if(playerInfo.fname.length < 3) {
                setErrorMsg({errorNo: 2, msg: '*at least 3 letters.'})
            } else if(playerInfo.fname.length > 10) {
                setErrorMsg({errorNo: 2, msg: '*at most 10 letters.'})
            } else {
                setErrorMsg({errorNo: 2, msg: '*only letters allowed.'})
            }
        } else if(!/^[a-zA-Z]{3,10}$/.test(playerInfo.lname)) {
            if(playerInfo.lname.length < 3) {
                setErrorMsg({errorNo: 3, msg: '*at least 3 letters.'})
            } else if(playerInfo.lname.length > 10) {
                setErrorMsg({errorNo: 3, msg: '*at most 10 letters.'})
            } else {
                setErrorMsg({errorNo: 3, msg: '*only letters allowed.'})
            }
        } else {
            setErrorMsg({errorNo: 0, msg: ''})
            await dispatch(fetchUpdateInfo({...playerInfo, token}))
        }
    }

    const handlePassClick = async () => {
        console.log(playerPass)
        await dispatch(fetchUpdatePassword({password: playerPass.password, newPassword: playerPass.newPassword, token}))

    }

    return (
        <div className='flex md:flex-row flex-col justify-center gap-4 md:mt-14 mt-4 rounded-lg'>
            {/* The left part */}
            {/* <Spinner /> */}
            <div className='md:w-[48%] w-[96%] flex flex-col items-center p-2 bg-[#252525] shadow-lg rounded-md'> 
                <h3 className='text-gray-300 text-xl font-medium '>Change Profile</h3>
                <div className={`mt-4 ${errorMsg.errorNo == 1 ? 'mb-1' : 'mb-4'}`}>
                    <input onChange={handleInfoChange} type="text" defaultValue={player.email} name='email'
                        className="bg-[#3e3e42] text-gray-200 p-2 rounded-xl border border-gray-400 outline-none focus:border-[#007acc]" placeholder="Email"
                    />
                    <br />
                    { errorMsg.errorNo === 1 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
                </div>
                <div className={errorMsg.errorNo == 2 ? 'mb-1' : 'mb-4'}>
                    <input onChange={handleInfoChange} type="text" defaultValue={capitalize(player.name.split(' ')[0])} name='fname'
                        className="bg-[#3e3e42] text-gray-200 p-2 rounded-xl border border-gray-400 outline-none focus:border-[#007acc]" placeholder="First Name"
                    />
                    <br />
                    { errorMsg.errorNo === 2 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
                </div>
                <div className={errorMsg.errorNo == 3 ? 'mb-7' : 'mb-12'}>
                    <input onChange={handleInfoChange} type="text" defaultValue={capitalize(player.name.split(' ')[1])} name='lname'
                        className="bg-[#3e3e42] text-gray-200 p-2 rounded-xl border border-gray-400 outline-none focus:border-[#007acc]" placeholder="Last Name"
                    />
                    <br />
                    { errorMsg.errorNo === 3 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
                </div>
                { !loadingInfo ? (
                        <button onClick={handleInfoClick} className='bg-[#007acc] text-gray-200 w-36 py-1 rounded-md shadow-md cursor-pointer py-2 mb-4'>
                            Update Profile
                        </button> 
                    ) : (
                        <button disabled type="button" className="text-gray-200 bg-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center">
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            Loading...
                        </button>
                    )
                }
            </div>
            {/* The right part */}
            <div className='md:w-[48%] w-[96%] flex flex-col items-center p-2 bg-[#252525] shadow-lg rounded-md'> 
                {/* <div className='flex flex-col gap-4'> */}
                <h3 className='text-gray-300 text-xl font-medium '>Change Password</h3>

                <div className={`mt-4 ${errorMsg.errorNo == 4 ? 'mb-1': 'mb-4'}`}>
                    <div className="relative">
                        <input onChange={handlePassChange} className="bg-[#3e3e42] text-gray-200 p-2 rounded-xl border border-gray-400 w-full outline-none focus:border-[#007acc]" type="password" name="password" placeholder="Password" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </div>
                    { errorMsg.errorNo === 4 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
                </div>
                <div className={errorMsg.errorNo == 5 ? 'mb-1' : 'mb-4'}>
                    <div className="relative">
                    <input onChange={handlePassChange} className="bg-[#3e3e42] text-gray-200 p-2 rounded-xl border border-gray-400 w-full outline-none focus:border-[#007acc]" type="password" name="newPassword" placeholder="Confirm Password" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </div>
                    { errorMsg.errorNo === 5 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
                </div>
                <div className={errorMsg.errorNo == 6 ? 'mb-7' : 'mb-12'}>
                    <div className="relative">
                        <input onChange={handlePassChange} className="bg-[#3e3e42] text-gray-200 p-2 rounded-xl border border-gray-400 w-full outline-none focus:border-[#007acc]" type="password" name="confirmPassword" placeholder="Confirm Password" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </div>
                    { errorMsg.errorNo === 6 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
                </div>


                   
                {/* </div> */}
                
                { !loadingPass ? (
                        <button onClick={handlePassClick} className='bg-blue-600 text-gray-200 w-36 py-1 rounded-md shadow-md cursor-pointer py-2 mb-4'>
                            Update Password
                        </button>
                    ) : (
                        <button disabled type="button" className="text-gray-200 bg-blue-600 font-medium rounded-lg text-sm mb-4 px-5 py-2.5 text-center me-2 inline-flex items-center">
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            Loading...
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Setting