import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { element } = props;
 
  const allowedRoutesForRole4 = [
    '/',
    '/skills',
    '/skills/createSkills',
    '/questionBank',
    '/questionBank/addQuestionBank',
    '/questionBank/addQuestions',
    '/questionBank/questionsDetails',
    '/questionBank/editQuestion',
    '/notification'
  ];
  const checkRole = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    try {
      const trimmedPathname = window.location.pathname.trim();
      if (userData && (userData.role.roleType === 1 || (userData.role.roleType === 4 && allowedRoutesForRole4.some(allowedPath => trimmedPathname.startsWith(allowedPath))))) {
        return true
        
      }else{
        return false
      }
    } catch (e) {
      return null;
    }
  };
  return checkRole() ? (
    element
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
