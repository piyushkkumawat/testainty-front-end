const DashboardHeader = () => {
  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="flex justify-between items-center px-9">
        <button id="menuBtn">
          <i className="fas fa-bars text-cyan-500 text-lg"></i>
        </button>

        <div className="ml-1">
          <img src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png" alt="logo" className="h-20 w-28" />
        </div>

        <div className="space-x-4">
          <button>
            <i className="fas fa-bell text-cyan-500 text-lg"></i>
          </button>

          <button>
            <i className="fas fa-user text-cyan-500 text-lg"></i>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default DashboardHeader