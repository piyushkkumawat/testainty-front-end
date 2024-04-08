import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import Login from './Components/Login/index.js'
import ForgotPwd from './Components/ForgotPwd/index.js'
import ResetPwd from './Components/ResetPwd/index.js'
import Dashboard from './Components/Dashboard/index.js'
import MainLayout from './Components/Layouts/MainLayout.js'
import HomePage from './Components/Home/index.js'
import AdminDashboardLayout from './Components/Layouts/AdminDashboardLayout.js'
import CreateAssessment from './Components/Test/CreateAssessment.js'
import BasicDetails from './Components/Test/BasicDetails.js'
import SelectAssessment from './Components/Test/SelectAssessment.js'
import Settings from './Components/Test/Settings.js'
import PrivateRoute from './Components/PraivateRoute.js'
import Preview from './Components/Test/Preview.js'
import Teams from './Components/Teams/index.js'
import AssessmentDetails from './Components/AssessmentDetails/index.js'
import CandidateSignup from './Components/Candidate/CandidateSignup.js'
import { useDispatch } from 'react-redux'
import CandidateLogin from './Components/Candidate/CandidateLogin.js'
import CandidateTest from './Components/Candidate/CandidateTest.js'
import TestSubmit from './Components/Candidate/TestSubmit.js'
import CandidateList from './Components/AllCandidates/CandidateList.js'
import CandidateDetails from './Components/AllCandidates/CandidateDetails.js'
import Profile from './Components/Profile/index.js'
import { getProfile } from './Store/userSlice.js'
import NotFound from './Components/404/NotFound.js'
import VerifyUser from './Components/Home/VerifyUser.js'
import Loader from './Components/Common/Loader.js'
import CodeEditor from './Components/CodeEditor/CodeEditor.js'
import Notification from './Components/Notification/index.js'
import ChangePassword from './Components/ChangePassword/index.js'

function App() {
  // const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null)
  // const user = useSelector((state) => state.loggedInUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      const user = JSON.parse(userData)
      if (user && user.role && user?.role?.roleName) {
        setLoggedInUser(user)
        // dispatch(getProfile({ userId: user.UserId }))
      }
    }
  }, [])

  const isAuthenticated = !!loggedInUser

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" /> : <MainLayout>
                 <HomePage />
               </MainLayout>
              }
            />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            {/* <Route path='/header' element={<Header />} /> */}
            <Route path="/forgot-password" element={<ForgotPwd />} />
            <Route path="/reset-password/:token/:orgId" element={<ResetPwd />} />
            <Route path="/candidateTest" element={<CandidateTest />} />
            <Route
              path="/signup/:assessment_url/invite"
              element={<CandidateSignup />}
            />
            <Route path="/verifyUser/:email/:code" element={<VerifyUser />} />
            <Route
              path="/:testUrl/:customerId/login"
              element={<CandidateLogin />}
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <Dashboard />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard/createAssessment"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <CreateAssessment>
                        <BasicDetails />
                      </CreateAssessment>
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard/assessment/:_id/:assessment_url"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <AssessmentDetails />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard/candidateDetails/:id"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <CandidateDetails />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard/setting"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <CreateAssessment>
                        <Settings />
                      </CreateAssessment>
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard/selectAssessment"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <CreateAssessment>
                        <SelectAssessment />
                      </CreateAssessment>
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard/preview"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <CreateAssessment>
                        <Preview />
                      </CreateAssessment>
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <Profile />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />

            <Route
              path="/teams"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <Teams />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />

            <Route
              path="/allCandidate"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <CandidateList />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/candidateDetails/:id"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <CandidateDetails />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/allCandidate/candidateDetails/:id"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <CandidateDetails />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route path="/candidateTest" element={<CandidateTest />} />
            <Route path="/testSubmit" element={<TestSubmit />} />
            <Route path="/codeEditor" element={<CodeEditor />} />
            <Route
              path="/dashboard/notification"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <Notification />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
               <Route
              path="/changePassword"
              element={
                <PrivateRoute
                  element={
                    <AdminDashboardLayout>
                      <ChangePassword />
                    </AdminDashboardLayout>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
          </Routes>
        </Router>
      )}
      {/* <ToastContainer /> */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
