import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../redux/AuthReducer';
import { useNavigate } from 'react-router-dom';


function LogoutModal({isModal, setIsModal}) {

  const toggleModal = () => {
    console.log(isModal)
    setIsModal(!isModal);
  };

  const token = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
      await dispatch(fetchLogout(token))
      setIsModal(!isModal);
      // navigate('/login')
  };

  return (
    <div className={` bg-white ${isModal ? '' : ''}`}>
        {/* <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            Toggle modal
        </button> */}
      
      {isModal && (
        <div className=''>
            {/* disable screen */}
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"></div>
            {/* modal div */}
            <div id="popup-modal" className="block overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={toggleModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Log Out?</h3>
                        <button onClick={toggleModal} type="button" className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        <button onClick={handleLogout} type="button" className="text-white ms-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                        Yes, I'm sure
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

      )}
    </div>
  );
}

export default LogoutModal;
