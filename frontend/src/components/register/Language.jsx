import { useEffect, useState } from "react"
import { fetchLanguages } from "../../redux/AuthReducer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const Language = ({playerInfo, handleChange, setStep}) => {

    const [errorMsg, setErrorMsg] = useState({errorNo: 0, msg: ''})

    const [isNextDisabled, setIsNextDisabled] = useState(true)

    const handlePrevClick = (e) => {
        e.preventDefault()
        setStep(1)
    }

    const handleNextClick = async (e) => {
        e.preventDefault()
        if(playerInfo.nativeLang === playerInfo.goalLang) {
            setErrorMsg({errorNo: 3, msg: "chose another languagae."})
        } else {
            setStep(3)
        }
    }

    useEffect(() => {
        console.log(playerInfo)
        if(playerInfo.country != '' && playerInfo.nativeLang != '' && playerInfo.goalLang != '') {
            setIsNextDisabled(false)
        }
    }, [playerInfo])

    // backend code here

    const languages = useSelector(i => i.auth.languages) || []

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchLangs = async () => {
        await dispatch(fetchLanguages())
    }

    useEffect(() => {
        fetchLangs()
    }, [])

    useEffect(() => {
        console.log(languages)
    }, [languages])


    return (
        <form action="" className="flex flex-col">
            <div className={`w-[235px] mt-8 ${errorMsg.errorNo === 1 ? 'mb-1' : 'mb-4'}`}>
                <select onChange={handleChange} defaultValue={playerInfo.country} name="country" className={`bg-[#3e3e42] border border-gray-300 text-white outline-none rounded-xl w-full block px-2 py-2.5 ${errorMsg.errorNo === 1 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`}>
                    <option disabled value="">Country</option>
                    <option value="morocco">Morocco</option>
                    <option value="england">England</option>
                    <option value="united state">United State</option>
                    <option value="spain">Spain</option>

                </select>   
                { errorMsg.errorNo === 1 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
            </div>
            <div className={`w-[235px] ${errorMsg.errorNo === 2 ? 'mb-1' : 'mb-4'}`}>
                <select onChange={handleChange} defaultValue={playerInfo.nativeLang} name="nativeLang" className={`bg-[#3e3e42] border border-gray-300 text-white outline-none rounded-xl w-full block px-2 py-2.5 ${errorMsg.errorNo === 2 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`}>
                    <option disabled value="">Native language</option>
                    { languages && languages.map((language, i) => (
                        language.native_state === 1 && <option key={i} value={language.id}>{language.language}</option> 
                    ))} 
                </select>   
                { errorMsg.errorNo === 2 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
            </div>
            <div className={`w-[235px] ${errorMsg.errorNo === 3 ? 'mb-1' : 'mb-4'}`}>
                <select onChange={handleChange} defaultValue={playerInfo.goalLang} name="goalLang" className={`bg-[#3e3e42] border border-gray-300 text-white outline-none rounded-xl w-full block px-2 p-2.5 ${errorMsg.errorNo === 3 ? 'border-red-800 focus:border-red-800' : 'focus:border-[#007acc]'}`}>
                    <option disabled value="">Goal language</option>
                    { languages && languages.map((language, i) => (
                        language.goal_state === 1 && <option key={i} value={language.id}>{language.language}</option> 
                    ))}           
                </select>   
                { errorMsg.errorNo === 3 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
            </div>
            
                 
            <div className="w-[235px] flex justify-between align-items gap-2 px-1">
                <button onClick={handlePrevClick} className={`bg-gray-500 rounded-xl w-1/2 text-white py-2 hover:scale-105 duration-300 cursor-pointer`}>
                    Previous
                </button>
                <button disabled={isNextDisabled} onClick={handleNextClick} className={`${isNextDisabled ? 'disabled:opacity-75 disabled:scale-100': ''} bg-[#007acc] rounded-xl w-1/2 text-white py-2 hover:scale-105 duration-300`}>
                    Next
                </button>
            </div>
        </form>
    )
}

export default Language