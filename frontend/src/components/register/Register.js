import { Link } from 'react-router-dom'
import Language from './Language'
import Personal from './Personal'
import './Register.css'
import Security from './Security'
import { useState } from 'react'


const Register = () => {

    const [playerInfo, setPlayerInfo] = useState({
        fname: '', lname: '', gender: 'male', email: '', password: '', passwordC: '', nativeLang: '', goalLang: '', country: ''
    })
    const [step, setStep] = useState(1)

    const spanClass = "rounded-full h-8 w-8 text-gray-400 bg-gray-600 flex items-center justify-center z-0"
    const activeSpanClass = "rounded-full h-8 w-8 text-gray-100 bg-[#007acc] flex items-center justify-center z-0"


    const handleChange = (e) => {
        // console.log([e.target.value])
        setPlayerInfo({...playerInfo, [e.target.name]: e.target.value})
    }    

    return (
        <section className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
            {/* <!-- login container --> */}
            <div className="bg-[#252526] flex md:flex-row flex-col rounded-2xl shadow-lg max-w-3xl p-5 items-center">

                <div className="md:block w-80 w-1/2">
                    <ul className="md:h-64 flex md:flex-col flex-row items-center justify-between">
                        <li className={`${step >= 2 ? 'active-li-step' : 'li-step'} relative flex md:flex-row flex-col items-center`}>
                            <span className={activeSpanClass}>1</span>
                            <p className={`${step >= 1 ? 'text-gray-200' : 'text-gray-500'} md:ml-4`}>Personal</p>
                        </li>
                        <li className={`${step >= 3 ? 'active-li-step' : 'li-step'} relative flex md:flex-row flex-col items-center md:ml-1`}>
                            <span className={step >= 2 ? activeSpanClass : spanClass}>2</span>
                            <p className={`${step >= 2 ? 'text-gray-200' : 'text-gray-500'} md:ml-2`}>Language</p>
                        </li>
                        <li className="relative flex md:flex-row flex-col items-center md:ml-[-6px]">
                            <span className={step >= 3 ? activeSpanClass : spanClass}>3</span>
                            <p className={`${step >= 3 ? 'text-gray-200' : 'text-gray-500'} md:ml-2`}>Security</p>
                        </li>
                    </ul>
                </div>


                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="md:block hidden text-gray-200 font-bold text-2xl text-[#002D74] text-center">
                        Register
                    </h2>

                    {/* *Note: mb-1 for input with error & mb-4 for input without error */}
                    { step === 1 && <Personal setStep={setStep} playerInfo={playerInfo} handleChange={handleChange}/> }
                    { step === 2 && <Language setStep={setStep} playerInfo={playerInfo} handleChange={handleChange}/> }
                    { step === 3 && <Security setStep={setStep} playerInfo={playerInfo} handleChange={handleChange}/> }

                    
                    <div className="mt-5 text-xs flex justify-between items-center py-4">
                        <p className="text-gray-300">Already have an account?</p>
                        <Link to='/login'>
                            <button className="text-white py-2 px-5 border rounded-xl hover:scale-110 duration-300">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>

                
            </div>
        </section>
    )
}

export default Register