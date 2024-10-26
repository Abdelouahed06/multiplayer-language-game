const CardDataStats = (proms) => {
  return (
    <div className="rounded-sm flex border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {proms.children}
      </div>
      <div className="ml-6 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {proms.total}
          </h4>
          <span className="text-sm font-medium">{proms.title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
