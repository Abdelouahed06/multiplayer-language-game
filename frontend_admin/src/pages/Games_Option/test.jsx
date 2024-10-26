import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoIcon from '../../images/logo/logo-icon.svg';

const Avatars = () => {






  {/*his code for edit language*/}
  const [isEdit, useIsEdit] = useState(false)
  const openEditModal = () => {
    useIsEdit(true);
  };
  const closeEditModal = () => {
    useIsEdit(false);
  };
  
  const [idEdit, setIdEdit] = useState(0);
  const [lange, setLange] = useState({});

  const hundInput01 = (e) => {
    setLange({ ...lange, [e.target.name]: e.target.value })
  }

   const handlcheck01 = (e) => {
    setLange({ ...lange, [e.target.name]: e.target.checked })
  }

  const editmodale = (e, id) => {
    setLanguageAlredyTaken(false)
    e.preventDefault();
    useIsEdit(true)
    setIdEdit(id)
      axios
        .get(`http://127.0.0.1:8000/api/Languages/${id}/edit`)
        .then((response) => {
          if (response.status === 200) {
            setLange(response.data.language);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  // add Succes message
  const [editeSucces, setEditeSucces] = useState({});
  // to open add Succes modael 
  const [isedit, setEdit] = useState(false);

  const editLang = (e) => {
    e.preventDefault();
    const dataUp = {
      language: lange.language,
      short_form: lange.short_form,
      native_state: lange.native_state? '1':'0',
      goal_state: lange.goal_state? '1':'0'
    }
    axios.put(`http://127.0.0.1:8000/api/Languages/${idEdit}/edit`, dataUp)
      .then((res) => {
        // if Edit Lang Succes 
        setEditeSucces(res.data.message)
        useIsEdit(false)
        setEdit(true)
        getData();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
        }
        if (error.response.status === 500) {
          // if Language alredy exit
          setLanguageAlredyTaken(true)

        }
      })
  }





























  const [avatars, setAvatars] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [avatarName, setAvatarName] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      const response = await axios.get('/api/avatars');
      setAvatars(response.data.avatars);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatarName);
    formData.append('avatar_file', avatarFile);
    formData.append('price', price);

    try {
      await axios.post('/api/avatars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Avatar added successfully');
      fetchAvatars(); // Refresh the avatar list
      closeModal();
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleDeleteAvatar = async (id) => {
    try {
      await axios.delete(`/api/avatars/${id}`);
      fetchAvatars(); // Refresh the avatar list
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Avatars" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 text-xl font-semibold text-black dark:text-white">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add Avatar
            </button>
            {isOpen && (
              <div id="popup-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-blue-100 rounded-t">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Add New Avatar
                      </h3>
                    </div>
                    <div className="p-4 md:p-5">
                      <form className="space-y-4" onSubmit={handleAddAvatar}>
                        <div>
                          <label htmlFor="Av_Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar Name</label>
                          <input
                            type="text"
                            name="Av_Name"
                            id="Av_Name"
                            value={avatarName}
                            onChange={(e) => setAvatarName(e.target.value)}
                            className="outline-none bg-gray-100 border border-blue-300 text-gray-900 text-sm rounded-lg focus:border-blue-600 block w-full p-2.5"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="Av_Price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar Price</label>
                          <input
                            type="number"
                            name="Av_Price"
                            id="Av_Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="outline-none bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="avatar_file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar Picture</label>
                          <input
                            type="file"
                            id="avatar_file"
                            onChange={(e) => setAvatarFile(e.target.files[0])}
                            className="w-full text-sm cursor-pointer rounded-lg border border-blue-300 bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            required
                          />
                        </div>
                        <div className="mb-7.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <button
                              type="button"
                              className="mt-5 w-full text-yellow-800 border border-yellow-700 bg-red-100 hover:bg-yellow-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              onClick={closeModal}
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="w-full sm:w-1/2">
                            <button
                              type="submit"
                              className="mt-5 w-full text-blue-800 border border-blue-700 bg-blue-100 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        {message && <p className="text-center text-red-500">{message}</p>}
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
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    ID
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Avatar
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Name
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
                {avatars.map((avatar) => (
                  <tr key={avatar.avatar_id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {avatar.avatar_id}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="font-medium text-black dark:text-white">
                        <img className='w-[50px] h-[50px]' src={`/storage/${avatar.avatar_path}`} alt="Avatar" />
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {avatar.avatar}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                        {avatar.price}$
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1ZM9.71 17.18a2.587 2.587 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.788 1.788 0 0 0-2.47 0l-9.54 9.53a2.473 2.473 0 0 0-.64 1.12L6.04 17a.737.737 0 0 0 .19.72a.767.767 0 0 0 .53.22Zm.41-1.36a1.468 1.468 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.521 1.521 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.748.748 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06Z"></path>
                          </svg>
                        </button>
                        <button className="hover:text-primary" onClick={() => handleDeleteAvatar(avatar.avatar_id)}>
                          <svg
                            className="fill-current"
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Avatars;
