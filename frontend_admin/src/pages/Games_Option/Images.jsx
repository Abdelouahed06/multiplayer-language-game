import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useState, useEffect } from 'react';
import axios from "axios";
const Images = () => {
  // get images
   const [loading, setLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/images")
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.images);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
        if (data.length === 0) {
          setTimeout(() => {
            setShowNoData(true);
          }, 500);
        }
      });
  };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  // to delete
  const [isdelete, setIsdelete] = useState(0);
  const [iddelete, setiddelete] = useState(0)
  const deletemodale = (e, id) => {
    e.preventDefault();
    setiddelete(id)
    setIsdelete(1)
  }

  const deleteLanguage = () => {
    axios.delete(`http://127.0.0.1:8000/api/images/${iddelete}`)
      .then((res) => {
        // if delete Succes
        setIsdelete(0)
        setiddelete(0)
        getData();
      })
  }


  // to add 
  const [addSucces, setAddSucces] = useState({});
  const [isadd, setAdd] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [nameAlredyTaken, setNameAlredyTaken] = useState(false);


  const handleImageNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', imageName);
    formData.append('image', imageFile);
    axios.post("http://127.0.0.1:8000/api/images", formData)
      .then((res) => {
        // if add admin Succes 
        setNameAlredyTaken(false)
        setAddSucces(res.data.message)
        setIsOpen(false)
        setAdd(true)
        getData();

      }).catch(function (error) {
        if (error.response) {
        }
        if (error.response.status === 422) {
          // if input not entry 
          setError(error.response.data.errors)
        }if (error.response.status === 500) {
          // if name alredy exit
          setNameAlredyTaken(true)
        }
      })
  };

    // pagenation 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalItems = data.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const dataPag = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (indexOfLastItem < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pictures" />
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


      {/* this is Modale show to Confirm delete*/}
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
                <button onClick={() => deleteLanguage()} type="button" className="text-red-500 bg-white hover:bg-red-500  hover:text-white border border-red-500 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : ("")}

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 text-xl font-semibold text-black dark:text-white">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add Picture
            </button>
            {/* this modal to add a new image */}
            {isOpen && (
              <div id="popup-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-blue-100 rounded-t">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Add New Picture
                      </h3>
                    </div>
                    <div className="p-4 md:p-5">
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                          <label htmlFor="imageName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture Name</label>
                          <input type="text" name="imageName" id="imageName" value={imageName} onChange={handleImageNameChange} className="outline-none bg-gray-100 border border-blue-300 text-gray-900 text-sm rounded-lg focus:border-blue-600 block w-full p-2.5" required />
                          {nameAlredyTaken ? (<span className='text-red-500 text-[14px]'>this name allredy exist!</span>) : ("")}
                        </div>
                        <div>
                          <label htmlFor="imageFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                          <input type="file" id="imageFile" onChange={handleImageFileChange} className="w-full text-sm cursor-pointer rounded-lg border border-blue-300 bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" required />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="mb-7.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <div className="relative">
                              <button
                                type="button"
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
          </div>
          <div className="max-w-full overflow-x-auto">
            {/*this table to show all image*/}
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-center dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    N
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Picture
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Name
                  </th>
                  <th className="py-4 px-4 font-medium text-black">
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
                ) : data.length > 0 ? (dataPag.map((image, key) => (
                  <tr key={key} className='text-center'>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {String(indexOfFirstItem + key + 1).padStart(2, '0')}
                      </p>
                    </td>
                    <td className="border-b flex items-center justify-center border-[#eee] py-5 px-4  dark:border-strokedark">
                      <img className='w-[50px] h-[50px] shadow-lg' src={`http://127.0.0.1:8000/images/${image.image}`} alt="profilePictur" />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {image.image.split('.')[0]}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 flex items-center justify-center">
                      <div className="flex items-center space-x-3.5">
                        {/* button to delet image */}
                        <button type='button' onClick={(e) => deletemodale(e, image.id)}>
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
            <button className={`border border-blue-300 w-[50px] rounded text-blue-800  ${indexOfLastItem >= data.length ? '' : 'hover:bg-blue-500 hover:text-white'
        }`} onClick={nextPage} disabled={indexOfLastItem >= data.length}>
              Next
            </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Images;
