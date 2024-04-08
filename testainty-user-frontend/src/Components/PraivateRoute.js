import { Navigate, } from 'react-router-dom';

// Defining a functional component called PrivateRoute that takes props as an argument.
const PrivateRoute = (props) => {
  // Destructuring the element and isAuthenticated from the props.
  const { element, isAuthenticated, } = props;

  // Retrieving user data from local storage and parsing it as JSON.
  const userData = JSON.parse(localStorage.getItem('userData'));

  // Function to parse and verify the expiration of a JWT token.
  const parseJwt = () => {
    // Retrieving user data from local storage and parsing it as JSON.
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return null;
    }
    try {
      // Parsing the payload of the JWT token using base64 decoding.
      let parseToken = JSON.parse(atob(userData.token.split('.')[1]))

      // Checking if the token has expired by comparing the expiration time with the current time.
      if (parseToken.exp * 1000 < Date.now()) {
        return false; // Token has expired.
      } else {
        return true; // Token is still valid.
      }
    } catch (e) {
      return null; // Error occurred while parsing the token.
    }
  };

  // Rendering the provided element if user data is present and the JWT token is still valid,
  // otherwise, redirecting to the login page using the Navigate component.
  return isAuthenticated || (userData && parseJwt()) ? (
    element
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
