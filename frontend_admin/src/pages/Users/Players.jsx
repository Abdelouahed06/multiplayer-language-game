import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from "axios";
const Players = () => {

  // code to get Players list --------------------
  const [loading, setLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);
  const [listplayers, setListlayers] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/Players")
      .then((response) => {
        if (response.status === 200) {
          setListlayers(response.data.players);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
        if (listplayers.length === 0) {
          setTimeout(() => {
            setShowNoData(true);
          }, 500);
        }
      });
  };

  // delete Player using id --------------------

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
    axios.delete(`http://127.0.0.1:8000/api/Players/${iddelete}/delete`)
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

  const totalItems = listplayers.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const dataPag = listplayers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (indexOfLastItem < listplayers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Players" />
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



      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="adminComp max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-center dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    ID
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    Full Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Country
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
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
                ) : listplayers.length > 0 ? (dataPag.map((packageItem, key) => (
                  <tr key={key} className='text-center'>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {String(indexOfFirstItem + key + 1).padStart(2, '0')}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.email}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem.country}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.state === 1
                          ? 'bg-success text-success'
                          : packageItem.state === 0
                            ? 'bg-danger text-danger'
                            : ''
                          }`}
                      >
                        {packageItem.state === 1 ? ("online") : ("offline")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 flex items-center justify-center">
                      <div className="flex items-center">
                        <button type='button' className="hover:text-primary" onClick={(e) => deletemodale(e, packageItem.id)} >
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
          <button className={`border border-blue-300 w-[50px] rounded text-blue-800  ${indexOfLastItem >= listplayers.length ? '' : 'hover:bg-blue-500 hover:text-white'
            }`} onClick={nextPage} disabled={indexOfLastItem >= listplayers.length}>
            Next
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Players;
