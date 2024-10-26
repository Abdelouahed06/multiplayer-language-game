import { SearchIcon } from "../../assets/svg/Icons"
import Invitation from "./Invitation"
import avatar3 from '../../assets/avatars/avatar3.jpeg'




const AddPlayers = () => {



    return (
        <div className="px-4 max-h-[calc(100vh-130px)] overflow-y-auto">
            <div className="flex items-center gap-2">
                <input type='text' placeholder="Search By Player ID..."  
                    className="bg-[#282829] px-4 py-2 rounded-md outline-none text-gray-300 border border-solid border-gray-700 focus:border-gray-500" 
                />
                <div className='text-gray-400  border border-solid border-gray-400 p-2 rounded-md shadow-md cursor-pointer'>
                    <SearchIcon />
                </div>
            </div>
            <div className="flex flex-col gap-2 my-4">
                <Invitation invitation={{name: 'Mark Lee', avatar: avatar3, id: 'ID89127373', n: 'FR', g: 'EN'}} showDel={false}/>
                {/* <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/>
                <Invitation showDel={false}/> */}

            </div>
        </div>
    )
}


export default AddPlayers