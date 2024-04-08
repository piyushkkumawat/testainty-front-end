import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { verifySiteUser } from '../../Store/userSlice';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Common/Loader';
import debounce from 'lodash.debounce';


const VerifyUser = () => {
    const dispatch = useDispatch()
    const url = useParams();
    const verifyUser = useSelector((state) => state.user.verifySiteUserData)
    const [isLoading, setIsLoading] = useState(true)
    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        let obj = {
            email: url.email,
            code: url.code
        }
        const debouncedGetData = debounce(()=> {
            dispatch(verifySiteUser(obj))
          }, 0);
          debouncedGetData();

          return () => {
            // Cleanup function
            // This will be called before the next effect is executed or when the component unmounts
            debouncedGetData.cancel(); // Cancel any pending API call on cleanup
        };
    }, [dispatch, url.email, url.code]);

    useEffect(() => {
        if (!(verifyUser?.status)) {
            setIsVerified(true)
        }else{
            setIsVerified(false)
        }
        setIsLoading(false)
    }, [verifyUser])

    return (
        <>
            {isLoading ?
                (<Loader />)
                :
               ( <div className="text-center mt-10">
                    <h1 className="text-2xl font-bold mb-4">
                        {isVerified ? 'The email verification process has already been completed.' : 'Your email has been verified!'}
                    </h1>
                    <p className="mb-6">You can now click the button below to go to the home page:</p>
                    <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline">
                        Go To Home
                    </Link>
                </div>)
            }
        </>

    )
}

export default VerifyUser
