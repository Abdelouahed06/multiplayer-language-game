import React from 'react';
import CardDataStats from '../components/CardDataStats';
import DefaultLayout from '../pages/layout/DefaultLayout';
import Wpic from '../images/welcome.svg'
import { useState, useEffect } from 'react';
import axios from "axios";

const ECommerce = () => {
  // code to get admins list --------------------
  const [adminsList, setAdminsList] = useState([]);
  useEffect(() => {
    getDataA();
  }, []);

  const getDataA = () => {
    axios
      .get("http://127.0.0.1:8000/api/Admins")
      .then((response) => {
        if (response.status === 200) {
          setAdminsList(response.data.admins);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // code to get Players list --------------------
  const [listplayers, setListlayers] = useState([]);
  useEffect(() => {
    getDataP();
  }, []);

  const getDataP = () => {
    axios
      .get("http://127.0.0.1:8000/api/Players")
      .then((response) => {
        if (response.status === 200) {
          setListlayers(response.data.players);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // get Langueses
  const [langueses, setLangueses] = useState([]);
  useEffect(() => {
    getDataL();
  }, []);

  const getDataL = () => {
    axios
      .get("http://127.0.0.1:8000/api/Languages")
      .then((response) => {
        if (response.status === 200) {
          setLangueses(response.data.languages);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // get Vocabulary
  const [vocabulary, setVocabulary] = useState([]);
  useEffect(() => {
    getData();

  }, []);
  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/vocabularies")
      .then((response) => {
        if (response.status === 200) {
          setVocabulary(response.data.vocabularies);

        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Admins" total={adminsList.length}>
          <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 26 26">
            <path fill="currentColor" d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.396c-3.324 1.203-7.224 3.394-7.224 5.557v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557zm-5.516 8.709c0-2.549 1.623-5.99 1.623-5.99l-1.123-.881c0-.842 1.453-1.723 1.453-1.723s1.449.895 1.449 1.723l-1.119.881s1.623 3.428 1.623 6.018c0 .406-3.906.312-3.906-.028z" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Players" total={listplayers.length}>
          <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
            <path fill="currentColor" d="M134.865 113.46c-7.463.026-15.134 2.977-22.38 8.663c-9.658 7.582-18.055 20.015-22.157 35.324c-4.102 15.31-3.047 30.274 1.527 41.67c4.575 11.396 12.238 18.958 21.91 21.55c9.67 2.59 20.09-.126 29.75-7.708c9.658-7.583 18.055-20.016 22.157-35.325c4.102-15.31 3.047-30.274-1.527-41.67c-4.575-11.396-12.24-18.96-21.91-21.55a27.912 27.912 0 0 0-7.37-.956zm242.27 0a27.94 27.94 0 0 0-7.37.954c-9.672 2.59-17.337 10.155-21.91 21.55c-4.576 11.397-5.63 26.362-1.527 41.67c4.102 15.31 12.497 27.743 22.156 35.325c9.66 7.58 20.08 10.297 29.75 7.706c9.67-2.59 17.338-10.153 21.912-21.55c4.575-11.395 5.626-26.36 1.524-41.67c-4.102-15.308-12.495-27.74-22.154-35.323c-7.245-5.686-14.918-8.638-22.38-8.664zM88.387 226.04c-10.146 2.133-18.06 6.477-24.82 12.648c-9.882 9.023-17.314 22.553-23.03 39.7c-10.6 31.8-15.044 75.344-22.062 120.153H150.97c-.04-44.9-.513-88.924-6.804-121.28c-3.203-16.47-7.97-29.787-14.098-38.57c-6.872 1.342-13.968 1.24-20.963-.635c-8.012-2.147-14.98-6.376-20.718-12.014zm335.226 0c-5.74 5.64-12.705 9.868-20.718 12.015c-6.994 1.874-14.09 1.978-20.96.636c-6.127 8.785-10.9 22.1-14.1 38.57c-6.292 32.356-6.766 76.38-6.804 121.28h132.493c-7.017-44.808-11.462-88.353-22.062-120.153c-5.714-17.146-13.145-30.676-23.028-39.7c-6.758-6.17-14.672-10.514-24.82-12.646zm-240.615 69.5v23H201v-23h-18.002zm80.002 0v23h18.002v-23H263zm-94.857 41c.18 4.613.313 9.292.425 14h174.864c.112-4.708.248-9.387.427-14H168.142z" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total languages" total={langueses.length}>
          <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19l3.5-9l3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Games" total={vocabulary.length}>
          <svg className="fill-primary dark:fill-white"
            width="20"
            height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 17.2q0-.4.263-.675t.637-.275q.2 0 .388.063t.362.187q.325.2.65.35T6 17q.825 0 1.413-.588T8 15q0-.825-.588-1.413T6 13q-.375 0-.725.125t-.625.375q-.15.125-.35.188t-.4.062q-.375 0-.637-.275T3 12.8V9q0-.425.288-.713T4 8h3.75q-.125-.375-.188-.75T7.5 6.5q0-1.875 1.313-3.188T12 2q1.875 0 3.188 1.313T16.5 6.5q0 .375-.063.75T16.25 8H20q.425 0 .713.288T21 9v3.8q0 .425-.288.713T20 13.8q-.2 0-.35-.088t-.3-.212q-.275-.25-.625-.375T18 13q-.825 0-1.413.588T16 15q0 .825.588 1.413T18 17q.375 0 .725-.125t.625-.375q.125-.125.288-.213T20 16.2q.425 0 .713.288T21 17.2V21q0 .425-.288.713T20 22H4q-.425 0-.713-.288T3 21v-3.8Z" />
          </svg>
        </CardDataStats>
      </div>

      <div className="flex mt-5 flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <img className='' src={Wpic} alt={Wpic} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
