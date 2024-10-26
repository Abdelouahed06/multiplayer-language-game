import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { fetchLogin } from "../../redux/AuthReducer"
import login from '../../images/login.svg'


const Login = () => {

    const [playerInfo, setPlayerInfo] = useState({
        email: '', password: ''
    })
    const [isLoginDisabled, setIsLoginDisabled] = useState(true)
    const [errorMsg, setErrorMsg] = useState({ errorNo: 0, msg: '' })
    const [isLogin, setIsLogin] = useState(false)



    const handleChange = (e) => {
        setPlayerInfo({ ...playerInfo, [e.target.name]: e.target.value })
    }

    const handleLoginClick = async (e) => {
        e.preventDefault() 
        if (!/^(?=.{10,})([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(playerInfo.email)) {
            setErrorMsg({ errorNo: 1, msg: 'invalid email.' })
        } else if (!/^[\W\w]{8,20}$/.test(playerInfo.password)) {
            if (playerInfo.password.length < 8) {
                setErrorMsg({ errorNo: 2, msg: 'at least 8 letters.' })
            } else if (playerInfo.password.length > 20) {
                setErrorMsg({ errorNo: 2, msg: 'at most 20 letters.' })
            }
        } else {
            setIsLoginDisabled(true)
            setErrorMsg({ errorNo: 0, msg: '' })
            setIsLogin(true)
            await dispatch(fetchLogin(playerInfo))

        }
    }

    const resp = useSelector(i => i.auth.resp)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (playerInfo.email != '' && playerInfo.password != '') {
            setIsLoginDisabled(false)
        }
    }, [playerInfo])

    useEffect(() => {
        if (isLogin) {
            if (resp.status === 422) {
                if (resp.error.email) {
                    setErrorMsg({ errorNo: 1, msg: resp.error.email })
                } else if (resp.status.password) {
                    setErrorMsg({ errorNo: 2, msg: resp.error.password })
                } else {
                    console.log('something went wrong!! try again')
                }
                setIsLoginDisabled(false)
                setIsLogin(false)
            }
            if (resp.status === 401) {
                setErrorMsg({ errorNo: 3, msg: 'Invalid Credentials' })
            }
        }


    }, [resp])


    return (
        <section className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
            {/* <!-- login container --> */}
            <div className="bg-[#252526] flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                {/* <!-- form --> */}
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="text-gray-200 font-bold text-2xl text-[#fff]">Login</h2>
                    {errorMsg.errorNo === 3 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span>}


                    <form action="" className="flex flex-col">
                        <div className="mt-8 mb-2">
                            <input onChange={handleChange} className="bg-[#3e3e42] text-white p-2 rounded-xl border outline-none w-full" type="email" name="email" placeholder="Email" />
                            <br />
                            {errorMsg.errorNo === 1 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span>}
                        </div>
                        <div className="">
                            <div className="relative">
                                <input onChange={handleChange} className="bg-[#3e3e42] text-white p-2 rounded-xl border w-full outline-none" type="password" name="password" placeholder="Password" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>
                            <br />
                            {errorMsg.errorNo === 2 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span>}

                        </div>

                        <button onClick={handleLoginClick} className="bg-[#6C63FF] rounded-xl text-white py-2 hover:scale-105 duration-300">
                            Login
                        </button>
                    </form>
                </div>

                {/* <!-- image --> */}
                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src={login} />
                </div>
            </div>
        </section>
    )
}

export default Login