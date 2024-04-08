import Sidebar from '../Common/Sidebar.js'
import NavBar from '../Common/NavBar.js'
import { useEffect, useMemo, useState } from 'react'
import '../../App.css'

const AdminDashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navBar = useMemo(() => {
    return <NavBar />
  }, [])

  return (
    <>
      <div className="xs:block xl:block lg:block ">
        <div className="flex  overflow-hidden">
          <div className="">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div className={`relative z-0 flex flex-1 flex-col overflow-x-hidden ${window.screen.height >= 900 ? 'h-screen' : ''}`}>
            {navBar}
            <div className={`bgc-color ${isOpen ? 'pl-60' : 'pl-10'}`}>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboardLayout
