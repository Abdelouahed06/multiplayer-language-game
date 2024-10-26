import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useState, useEffect } from 'react';
import axios from "axios";



const Messages = () => {
  // open add modal 
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // open show modal 
  const [openshow, setOpenshow] = useState(false);

  const openModalshow = () => {
    setOpenshow(true);
  };

  const closeModalshow = () => {
    setOpenshow(false);
  };

  // code to get Message  --------------------
  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/Messages")
      .then((response) => {
        if (response.status === 200) {
          setMessagesList(response.data.messages);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
        if (messagesList.length === 0) {
          setTimeout(() => {
            setShowNoData(true);
          }, 500);
        }
      });
  };


  //  code to add Message --------------------
  const [messagelist, setMessagelist] = useState({
    group: '',
    price: 0,
    msg1: '',
    msg2: '',
    msg3: '',
    msg4: '',
    msg5: '',
    msg6: '',
    msg7: '',
    msg8: '',

  })

  // inputs validat  
  const [inputError, setInputError] = useState({});
  // add Succes message
  const [addSucces, setAddSucces] = useState({});
  // group alredy exit 
  const [groupeAlredyTaken, setGroupeAlredyTaken] = useState(false);
  // to open add Succes modael 
  const [isadd, setAdd] = useState(false);


  const hundInput = (e) => {
    setMessagelist({ ...messagelist, [e.target.name]: e.target.value })
  }

  const savMessage = (e) => {
    e.preventDefault();
    const data = {
      group: messagelist.group,
      price: messagelist.price,
      msg1: messagelist.msg1,
      msg2: messagelist.msg2,
      msg3: messagelist.msg3,
      msg4: messagelist.msg4,
      msg5: messagelist.msg5,
      msg6: messagelist.msg6,
      msg7: messagelist.msg7,
      msg8: messagelist.msg8
    }
    axios.post('http://127.0.0.1:8000/api/Messages', data)
      .then((res) => {
        // if add admin Succes 
        setGroupeAlredyTaken(false)
        setAddSucces(res.data.message)
        setIsOpen(false)
        setAdd(true)
        setMessagelist("")
        getData();

      })
      .catch(function (error) {
        if (error.response) {
        }
        if (error.response.status === 422) {
          // if input not entry 
          setInputError(error.response.data.errors)
        }
        if (error.response.status === 500) {
          // if email alredy exit
          setGroupeAlredyTaken(true)
        }
      })
  }


  // delete Message using id --------------------

  // to open add Succes modael 
  const [isdelete, setIsdelete] = useState(0);
  // delete ok

  const [iddelete, setiddelete] = useState(0)
  const deletemodale = (e, id) => {
    e.preventDefault();
    setiddelete(id)
    setIsdelete(1)
  }

  const deleteAdmin = () => {
    axios.delete(`http://127.0.0.1:8000/api/Messages/${iddelete}/delete`)
      .then((res) => {
        // if delete Succes
        setIsdelete(0)
        setiddelete(0)
        getData();
      })
  }

  
  
  // pagenation 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalItems = messagesList.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const dataPag = messagesList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (indexOfLastItem < messagesList.length) {
      setCurrentPage(currentPage + 1);
    }
  };


  {/*his code for edit Message*/}
  const [isEdit, setIsEdit] = useState(false)
  const openEditModal = () => {
    setIsEdit(true);
  };
  const closeEditModal = () => {
    setIsEdit(false);
  };
  const [idEdit, setIdEdit] = useState(0);
  const [message, setMessage] = useState({});
  const hundInput01 = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }
  const editmodale = (e, id) => {
    setGroupeAlredyTaken(false)
    e.preventDefault();
    setIsEdit(true)
    setIdEdit(id)
      axios
        .get(`http://127.0.0.1:8000/api/Messages/${id}/edit`)
        .then((response) => {
          if (response.status === 200) {
            setMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  const [editeSucces, setEditeSucces] = useState({});
  const [iseditSuc, setIseditSuc] = useState(false);

  const editMessage = (e) => {
    e.preventDefault();
    const dataUp = {
      group: message.group,
      price: message.price,
      msg1: message.msg1,
      msg2: message.msg2,
      msg3: message.msg3,
      msg4: message.msg4,
      msg5: message.msg5,
      msg6: message.msg6,
      msg7: message.msg7,
      msg8: message.msg8
    }
    axios.put(`http://127.0.0.1:8000/api/Messages/${idEdit}/edit`, dataUp)
      .then((res) => {
        // if Edit Lang Succes 
        setEditeSucces(res.data.message)
        setIsEdit(false)
        setIseditSuc(true)
        getData();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
        }
        if (error.response.status === 500) {
          // if Message group alredy exit
          setGroupeAlredyTaken(true)

        }
      })
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Messages" />
      {/* add Modale */}
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

      {/* delete Modale */}
      {isdelete === 1 ? (
        <div id="popup-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="p-2 relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <span className='flex items-center justify-center w-full mb-4'>
                  <svg className='text-red-500' xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 14 14">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7.89 1.05a1 1 0 0 0-1.78 0l-5.5 11a1 1 0 0 0 .89 1.45h11a1 1 0 0 0 .89-1.45zM7 5v3.25"></path>
                      <path d="M7 11a.25.25 0 1 1 0-.5m0 .5a.25.25 0 1 0 0-.5"></path>
                    </g>
                  </svg></span>
                <h1 className='mb-4 text-[#000]'>are you Sure you want to delete this ?</h1>
                <button onClick={() => setIsdelete(0)} type="button" className="mr-5 text-green-500 bg-white hover:bg-green-800 hover:text-white border border-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Annule
                </button>
                <button onClick={() => deleteAdmin()} type="button" className="text-red-500 bg-white hover:bg-red-500  hover:text-white border border-red-500 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : ("")}

      {/* this is Modale show when edit Succes*/}
      {iseditSuc && (
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
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{editeSucces}</h3>
                <button onClick={() => setIseditSuc(false)} type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 text-xl font-semibold text-black dark:text-white">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add Messages
            </button>
            {/* this is modal to add a new message  */}
            {isOpen && (
              <div id="popup-modal" className="fixed top-10 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-blue-100 rounded-t">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Add New Message
                      </h3>
                    </div>
                    <div className="p-4 md:p-5">
                      <form onSubmit={savMessage} className="space-y-4" action="#">
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="Me_Group"
                            >
                              Message Group
                            </label>
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                type="text"
                                name="group"
                                id="group"
                                value={messagelist.group}
                                onChange={hundInput}
                                required
                              />
                              <span className='text-red-500 text-[14px]'>{inputError.group}</span>
                              {groupeAlredyTaken ? (<span className='text-red-500 text-[14px]'>this group allredy exist!</span>) : ("")}
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="Me_Price"
                            >
                              Message Price
                            </label>
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="number"
                              name="price"
                              id="price"
                              value={messagelist.price}
                              onChange={hundInput}
                              required
                            />
                          </div>
                        </div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Messages
                        </label>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                type="text"
                                name="msg1"
                                id="msg1"
                                placeholder='Message 01'
                                value={messagelist.msg1}
                                onChange={hundInput}
                                required
                              />
                              <span className='text-red-500 text-[14px]'>{inputError.msg1}</span>

                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="text"
                              name="msg2"
                              id="msg2"
                              placeholder='Message 02'
                              value={messagelist.msg2}
                              onChange={hundInput}
                              required
                            />
                            <span className='text-red-500 text-[14px]'>{inputError.msg2}</span>

                          </div>
                        </div>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                type="text"
                                name="msg3"
                                id="msg3"
                                placeholder='Message 03'
                                value={messagelist.msg3}
                                onChange={hundInput}
                                required
                              />
                              <span className='text-red-500 text-[14px]'>{inputError.msg3}</span>

                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="text"
                              name="msg4"
                              id="msg4"
                              placeholder='Message 04'
                              value={messagelist.msg4}
                              onChange={hundInput}
                              required
                            />
                            <span className='text-red-500 text-[14px]'>{inputError.msg4}</span>

                          </div>
                        </div>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                name="msg5"
                                id="msg5"
                                placeholder='Message 05'
                                value={messagelist.msg5}
                                onChange={hundInput}
                                required
                              />
                              <span className='text-red-500 text-[14px]'>{inputError.msg5}</span>

                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="text"
                              name="msg6"
                              id="msg6"
                              placeholder='Message 06'
                              value={messagelist.msg6}
                              onChange={hundInput}
                              required
                            />
                            <span className='text-red-500 text-[14px]'>{inputError.msg6}</span>

                          </div>
                        </div>
                        <div className="mb-7.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                type="text"
                                name="msg7"
                                id="msg7"
                                placeholder='Message 07'
                                value={messagelist.msg7}
                                onChange={hundInput}
                                required
                              />
                              <span className='text-red-500 text-[14px]'>{inputError.msg7}</span>

                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="text"
                              name="msg8"
                              id="msg8"
                              placeholder='Message 08'
                              value={messagelist.msg8}
                              onChange={hundInput}
                              required
                            />
                            <span className='text-red-500 text-[14px]'>{inputError.msg8}</span>

                          </div>
                        </div>
                        <div className="mb-7.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <button
                                className="mt-5 w-full text-yellow-800 border border-yellow-700 bg-red-100 hover:bg-yellow-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={closeModal}
                              >Cancel</button>
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <button
                              type='submit'
                              className="mt-5 w-full text-blue-800 border border-blue-700 bg-blue-100 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >Add</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* this is modal to updat message */}
            {isEdit && (
              <div id="popup-modal" className="fixed top-10 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-blue-100 rounded-t">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Edit Message
                      </h3>
                    </div>
                    <div className="p-4 md:p-5">
                      <form onSubmit={editMessage} className="space-y-4" action="#">
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="Me_Group"
                            >
                              Message Group
                            </label>
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                type="text"
                                name="group"
                                id="group"
                                value={message.group}
                                onChange={hundInput01}
                                required
                              />
                              <span className='text-red-500 text-[14px]'>{inputError.group}</span>
                              {groupeAlredyTaken ? (<span className='text-red-500 text-[14px]'>this group allredy exist!</span>) : ("")}
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="Me_Price"
                            >
                              Message Price
                            </label>
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="number"
                              name="price"
                              id="price"
                              value={message.price}
                              onChange={hundInput01}
                              required
                            />
                          </div>
                        </div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Messages
                        </label>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                type="text"
                                name="msg1"
                                id="msg1"
                                placeholder='Message 01'
                                value={message.msg1}
                                onChange={hundInput01}
                                required
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="text"
                              name="msg2"
                              id="msg2"
                              placeholder='Message 02'
                              value={message.msg2}
                              onChange={hundInput01}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                type="text"
                                name="msg3"
                                id="msg3"
                                placeholder='Message 03'
                                value={message.msg3}
                                onChange={hundInput01}
                                required
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="text"
                              name="msg4"
                              id="msg4"
                              placeholder='Message 04'
                              value={message.msg4}
                              onChange={hundInput01}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                name="msg5"
                                id="msg5"
                                placeholder='Message 05'
                                value={message.msg5}
                                onChange={hundInput01}
                                required
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="text"
                              name="msg6"
                              id="msg6"
                              placeholder='Message 06'
                              value={message.msg6}
                              onChange={hundInput01}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-7.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <input
                                className="w-full text-sm rounded border border-blue-300 py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
                                type="text"
                                name="msg7"
                                id="msg7"
                                placeholder='Message 07'
                                value={message.msg7}
                                onChange={hundInput01}
                                required
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <input
                              className="w-full text-sm rounded border border-blue-300 py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                              type="text"
                              name="msg8"
                              id="msg8"
                              placeholder='Message 08'
                              value={message.msg8}
                              onChange={hundInput01}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-7.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <button
                                className="mt-5 w-full text-yellow-800 border border-yellow-700 bg-red-100 hover:bg-yellow-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={closeEditModal}
                              >Cancel</button>
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <button
                              type='submit'
                              className="mt-5 w-full text-blue-800 border border-blue-700 bg-blue-100 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-center dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    N
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Group
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Price
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className='p-5' colSpan='5'>
                      <div className="w-full flex items-center justify-center bg-white">
                        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                      </div>
                    </td>
                  </tr>
                ) : messagesList.length > 0 ? (dataPag.map((packageItem, key) => (
                  <tr key={key} className='text-center'>
                  <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black dark:text-white">
                        {String(indexOfFirstItem + key + 1).padStart(2, '0')}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black dark:text-white">
                        {packageItem.group}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black dark:text-white">
                        {packageItem.price}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 flex items-center justify-center">
                      <div className="flex items-center space-x-3.5">
                        <button onClick={(e) => editmodale(e, packageItem.id)} className="hover:text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-green-400 hover:text-green-600" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1ZM9.71 17.18a2.587 2.587 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.788 1.788 0 0 0-2.47 0l-9.54 9.53a2.473 2.473 0 0 0-.64 1.12L6.04 17a.737.737 0 0 0 .19.72a.767.767 0 0 0 .53.22Zm.41-1.36a1.468 1.468 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.521 1.521 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.748.748 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06Z"></path>
                          </svg>

                        </button>

                        <button type='button' onClick={(e) => deletemodale(e, packageItem.id)}>
                          <svg
                            className="fill-current text-red-400 hover:text-red-600"
                            width="20"
                            height="20"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))) : (
                  showNoData && (
                    <tr className='text-center'>
                      <td className='p-5' colSpan='5'>
                        <div className="w-full flex items-center justify-center tex-red-500">
                          <p>No data found</p>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagenation fixed bottom-0 flex w-[150px] p-1 mt-2 mb-3">
            <button className={`border border-blue-300 w-[50px] rounded text-blue-800  ${currentPage === 1 ? '' : 'hover:bg-blue-500 hover:text-white'
        }`} onClick={prevPage} disabled={currentPage === 1}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                style={{
                  color: currentPage === i + 1 ? 'blue' : 'gray',
                  fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                }}
              >
                {i + 1}
              </button>
            ))}
            <button className={`border border-blue-300 w-[50px] rounded text-blue-800  ${indexOfLastItem >= messagesList.length ? '' : 'hover:bg-blue-500 hover:text-white'
        }`} onClick={nextPage} disabled={indexOfLastItem >= messagesList.length}>
              Next
            </button>
          </div>
      </div>
    </DefaultLayout>
  );
};

export default Messages;