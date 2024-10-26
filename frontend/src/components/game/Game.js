import { useState } from "react"
import QCM from "./games/QCM"
import GameHeader from "./header/GameHeader"



const Game = () => {

    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [listOfAnswers, setListOfAnswers] = useState([])


    return (
        <div className="bg-[#1c1c1c] h-screen">
            <GameHeader />
            <div className="flex justify-center py-4 mx-4 md:h-[calc(100vh-130px)]">
                <QCM correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} />
            </div>
        </div>
    )
}


export default Game