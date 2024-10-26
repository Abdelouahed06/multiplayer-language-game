import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../pages/layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from "axios";


const Settings = ({admin}) => {
  const [editInfo, setEditInfo] = useState(true)


  // code to get admins info --------------------
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(admin)
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/Admins/${admin.id}/edit`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.admin);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // code to change full Name and email 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // email alredy exit 
  const [emailAlredyTaken, setEmailAlredyTaken] = useState(false);
  // inputs validat  
  const [inputError, setInputError] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/Admins/${admin.id}/editinfo`, data)
      .then((res) => {
        if (res.status === 200) {
          getData()
          setInputError({})
          setAddSucces(res.data.message)
          setAdd(true)
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
        }
        if (error.response.status === 500) {
          //  if email  alredy exit
          setEmailAlredyTaken(true)

        }if (error.response.status === 422) {
          // if input not entry 
          setInputError(error.response.data.error)

        }
      })
  }

  // code to change password 
  const [adminPass, setAdminPass] = useState({
    old_password: '',
    new_password: '',
  })

  const hundlDataInputs = (e) => {
    setAdminPass({ ...adminPass, [e.target.name]: e.target.value })
  }

  // Succes 
  const [isadd, setAdd] = useState(false);
  const [addSucces, setAddSucces] = useState({});

  // old password Incorect 
  const [addnotSucces, setAddnotSucces] = useState([]);

  const changePassword = (e) => {
    e.preventDefault();
    const data = {
      old_password: adminPass.old_password,
      new_password: adminPass.new_password,
    }
    axios.put(`http://127.0.0.1:8000/api/Admins/${admin.id}/editpass`, data)
      .then((res) => {
        console.log("done")
        setInputError({})
          setAddnotSucces([])
        setAdminPass({
          old_password: '',
          new_password: '',
        })
        setAddSucces(res.data.message)
        setAdd(true)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.message)
        } if (error.response.status === 401) {
          // Incorect old Password
          setInputError({})
          setAddnotSucces(error.response.data.message)
        }if (error.response.status === 422) {
          // if input not entry 
          setInputError(error.response.data.error)

        }
      })
  }


  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        {/* add not Succes Modale */}
        {/* add Succes Modale */}
        {isadd && (
          <div id="popup-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-4 md:p-5 text-center">
                  <span className='flex items-center justify-center w-full mb-4'>
                    <svg className='text-green-500' xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 14 14">
                      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m4 8l2.05 1.64a.48.48 0 0 0 .4.1a.5.5 0 0 0 .34-.24L10 4" />
                        <circle cx="7" cy="7" r="6.5" />
                      </g>
                    </svg></span>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{addSucces}</h3>
                  <button onClick={() => setAdd(false)} type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-1">
            <button onClick={() => setEditInfo(true)} className={`w-50 flex justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${editInfo && 'bg-blue-500'
              }`}
            >Edit information</button>
            <button onClick={() => setEditInfo(false)} className={`w-50 flex mt-4 justify-center rounded bg-black py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${!editInfo && 'bg-blue-500'
              }`}>Edit password</button>
          </div>
          <div className="col-span-5 xl:col-span-4">
            {editInfo ? (<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="full name"
                          value={data.name}
                          onChange={handleInputChange}
                          required
                        />
                        <span className='text-red-500 text-[14px]'>{inputError.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                        id="emailAddress"
                        placeholder="email"
                        value={data.email}
                        onChange={handleInputChange}
                        required
                      />
                      <span className='text-red-500 text-[14px]'>{inputError.email}</span>
                      {emailAlredyTaken ? (<span className='text-red-500 text-[14px]'>this email allredy exist!</span>) : ("")}
                    </div>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex mt-4 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>) : (<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Update Password
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={changePassword} action="#">
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Old Password
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="password"
                      value={adminPass.old_password}
                      onChange={hundlDataInputs}
                      name="old_password"
                      id="oldpassword"
                      required
                    />
                        <span className='text-red-500 text-[14px]'>{addnotSucces}</span>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      New Password
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="password"
                      value={adminPass.new_password}
                      onChange={hundlDataInputs}
                      name="new_password"
                      id="newpassword"
                      required
                    />
                      <span className='text-red-500 text-[14px]'>{inputError.new_password}</span>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex mt-4 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type='submit'
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
