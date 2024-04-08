import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import AdminDashboardLayout from './Components/Layouts/AdminDashboardLayout';
import CreateCustomerForm from './Components/OwnerAdminDashboard/CreateCustomerForm';
import UpdateCustomerForm from './Components/OwnerAdminDashboard/UpdateCustomerForm';
import ForgotPwd from './Components/ForgotPwd';
import ResetPassword from './Components/ResetPassword';
import Roles from './Components/OwnerAdminDashboard/Roles';
import Skills from './Components/OwnerAdminDashboard/Skills';
import CreateSkill from './Components/OwnerAdminDashboard/CreateSkill';
import AddSuperAdminForm from './Components/OwnerAdminDashboard/AddSuperAdminForm';
import QuestionBank from './Components/OwnerAdminDashboard/QuestionBank';
import AddQuestionBank from './Components/OwnerAdminDashboard/AddQuestionBank';
import AddQuestions from './Components/OwnerAdminDashboard/AddQuestions';
import QuestionsDetails from './Components/OwnerAdminDashboard/QuestionsDetails';
import EditQuestion from './Components/OwnerAdminDashboard/EditQuestion';
import CustomerDetails from './Components/OwnerAdminDashboard/CustomerDetails';
import EditQuestionBank from './Components/OwnerAdminDashboard/EditQuestionBank';
import PrivateRoute from './PraivateRoute';
import SubAdmins from './Components/OwnerAdminDashboard/SubAdmins';
import AddSubAdminForm from './Components/OwnerAdminDashboard/AddSubAdminForm';
import NotFound from './Components/404/NotFound';
import CustomerInquiries from './Components/OwnerAdminDashboard/CustomerInquiries';
import CustomerInquiryDetails from './Components/OwnerAdminDashboard/CustomerInquiryDetails';
import Notification from './Components/Notification';

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {/* {user ? <Header /> : <></>} */}
      {isLoading ? (<div className='spinner-border text-primary absolute top-50 z-1' style={{ left: '50%' }}></div>) :
        <Router>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPwd />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<PrivateRoute element={<AdminDashboardLayout><Dashboard /></AdminDashboardLayout>} />} />

            {/* <Route path="/dashboard" element={<AdminDashboardLayout><Dashboard /></AdminDashboardLayout>} /> */}
            <Route path='/dashboard/createCustomerForm' element={<PrivateRoute element={<AdminDashboardLayout><CreateCustomerForm /></AdminDashboardLayout>} />} />
            <Route path='/dashboard/customerDetails/:id' element={<PrivateRoute element={<AdminDashboardLayout><CustomerDetails /></AdminDashboardLayout>} />} />
            <Route path='/dashboard/addSuperAdminForm/:id' element={<PrivateRoute element={<AdminDashboardLayout><AddSuperAdminForm /></AdminDashboardLayout>} />} />
            <Route path='/dashboard/updateCustomerForm/:id' element={<PrivateRoute element={<AdminDashboardLayout><UpdateCustomerForm /></AdminDashboardLayout>} />} />
            <Route path='/roles' element={<PrivateRoute element={<AdminDashboardLayout><Roles /></AdminDashboardLayout>} />} />
            <Route path='/skills' element={<PrivateRoute element={<AdminDashboardLayout><Skills /></AdminDashboardLayout>} />} />
            <Route path='/skills/createSkills' element={<PrivateRoute element={<AdminDashboardLayout><CreateSkill /></AdminDashboardLayout>} />} />
            <Route path='/questionBank' element={<PrivateRoute element={<AdminDashboardLayout><QuestionBank /></AdminDashboardLayout>} />} />
            <Route path='/subAdmins' element={<PrivateRoute element={<AdminDashboardLayout><SubAdmins /></AdminDashboardLayout>} />} />
            <Route path='/subAdmins/addSubAdmins' element={<PrivateRoute element={<AdminDashboardLayout><AddSubAdminForm /></AdminDashboardLayout>} />} />
            <Route path='/questionBank/addQuestionBank' element={<PrivateRoute element={<AdminDashboardLayout><AddQuestionBank /></AdminDashboardLayout>} />} />
            <Route path='/questionBank/addQuestions/:id' element={<PrivateRoute element={<AdminDashboardLayout><AddQuestions /></AdminDashboardLayout>} />} />
            <Route path='/questionBank/questionsDetails/:id' element={<PrivateRoute element={<AdminDashboardLayout><QuestionsDetails /></AdminDashboardLayout>} />} />
            <Route path='/questionBank/editQuestion/:id' element={<PrivateRoute element={<AdminDashboardLayout><EditQuestion /></AdminDashboardLayout>} />} />
            <Route path='/questionBank/editQuestionBank/:id' element={<PrivateRoute element={<AdminDashboardLayout><EditQuestionBank /></AdminDashboardLayout>} />} />
            <Route path='/customerInquiries' element={<PrivateRoute element={<AdminDashboardLayout><CustomerInquiries /></AdminDashboardLayout>} />} />
            <Route path='/customerInquiries/CustomerInquiryDetails/:id' element={<PrivateRoute element={<AdminDashboardLayout><CustomerInquiryDetails /></AdminDashboardLayout>} />} />

            <Route path='/notification' element={<PrivateRoute element={<AdminDashboardLayout><Notification /></AdminDashboardLayout>} />} />
          </Routes>
        </Router>}
      {/* <ToastContainer /> */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
