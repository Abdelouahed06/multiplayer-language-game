import { useState } from "react";
import Header from "../header/Header"
import Category from "./Category"
import LogoutModal from "../LogoutModal";


const Main = ({player}) => {

    const [isModal, setIsModal] = useState(false);


    return (
        <div className="h-screen bg-[#1f1f1f] pb-8">
            <Header player={player} setIsModal={setIsModal} isModal={isModal} />
            {/* <QCM /> */}
            <div className="w-[100%] h-[calc(100vh-76px)] mt-4 pb-8 overflow-x-auto flex md:flex-row flex-col items-center gap-4 px-8 flex-nowrap">
                <Category name={'Vocabulary'} />
                <Category name={'Grammar'} />
                <Category name={'Listening'} />
                <Category name={'Writing'} />
            </div>
            {isModal && <LogoutModal setIsModal={setIsModal} isModal={isModal}/> }
        </div>

    )
}

export default Main