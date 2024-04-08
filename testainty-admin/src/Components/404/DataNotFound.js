const DataNotFound = () => {
  return (
    <div className="bg-white w-2/3 m-auto  rounded shadow">
      <div className="flex justify-center ">
        <img src='/assets/images/404-img.png' alt="404" />
      </div>
      <div className="flex justify-center py-2">
        <h5 className="text-gray-500 text-sm sm:text-sm xl:text-lg font-semibold ">Data Not Found!</h5>
      </div>
    </div>
  )
}

export default DataNotFound