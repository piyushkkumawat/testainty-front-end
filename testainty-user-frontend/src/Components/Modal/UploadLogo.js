import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, imageUpload } from '../../Store/userSlice';
import { BsCloudUploadFill } from 'react-icons/bs';
import { t } from 'i18next';


const UploadLogo = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const toggle = () => setIsOpen(!isOpen);
    const [image, setImage] = useState(null)
    const [logo, setLogo] = useState(null)
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(localStorage.getItem('userData')) : null
    const profileData = useSelector((state) => state.user)


    useEffect(() => {
        if (profileData && profileData?.getProfile && profileData?.getProfile?.customerId) {
            setLogo(profileData?.getProfile?.customerId?.customer_logo)
        }
    }, [profileData])

    const handleImageUpload = () => {
        if (image) {
            const formdata = new FormData();
            formdata.append('customer_logo', image);

            dispatch(imageUpload(formdata))
                .then(() => {
                    dispatch(getProfile({ userId: userData.UserId }));
                    setImage(null)
                    setIsOpen(false);
                })
                .catch((error) => {
                    console.error('Image upload error:', error);
                });
        }
    };


    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-opacity-75 bg-gray-200">
                    <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-2/5 max-h-3/4">
                        <div className="relative bg-white rounded-lg shadow">
                            <button
                                data-testid="toggle-click"
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:text-gray-200 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-200"
                                onClick={toggle}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">{t('closeModal')}</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900">
                                  {t('uploadLogo')}
                                </h3>
                                <div className='flex flex-col justify-center items-center cursor-pointer'>
                                    <label htmlFor="file-upload" className="group">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white relative">
                                            {image ? (
                                                <div className="w-full h-full cursor-pointer relative">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt="profile_image"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <input type="file" data-testid="file-input" id="file-upload" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={(e) => setImage(e.target.files[0])} />
                                                    <div className="group-hover:opacity-100 opacity-0 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                                                        <BsCloudUploadFill className="text-4xl md:text-5xl text-gray-300 group-hover:text-gray-500 transform -translate-x-2/4 -translate-y-2/4" />
                                                    </div>
                                                </div>
                                            ) : logo ? (
                                                <div className="w-full h-full cursor-pointer relative">
                                                    <img
                                                    // http://localhost:3000/uploads/
                                                        src={`${logo}`}
                                                        alt="profile_image"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <input type="file" data-testid="file-input" id="file-upload" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={(e) => setImage(e.target.files[0])} />
                                                    <div className="group-hover:opacity-100 opacity-0 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                                                        <BsCloudUploadFill className="text-4xl md:text-5xl text-gray-300 group-hover:text-gray-500 transform -translate-x-2/4 -translate-y-2/4" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex justify-center items-center cursor-pointer relative">
                                                    <input type="file" data-testid="file-input" id="file-upload" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={(e) => setImage(e.target.files[0])} />
                                                    <div className="group-hover:opacity-100">
                                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex justify-center items-center">
                                                            <BsCloudUploadFill className="text-4xl md:text-5xl text-gray-300 group-hover:text-gray-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                                {image &&
                                    <div className="text-center flex justify-center items-center w-full md:w-auto mt-2">
                                        <button data-testid="cancel-btn" className='bg-transparent py-1 rounded px-3 border border-blue-500 md:ml-3 shadow' onClick={() => setImage(null)}>{t('cancel')}</button>
                                        <button data-testid="save-btn" className='bg-primary py-1 rounded px-3 text-white ml-3 shadow' onClick={handleImageUpload}>{t('save')}</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default UploadLogo;
