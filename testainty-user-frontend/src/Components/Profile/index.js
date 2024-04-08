/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, uploadPicture } from '../../Store/userSlice';
import { BsCloudUploadFill } from 'react-icons/bs';
import { formatedDate } from '../../Utils/Index';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

const Profile = () => {
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.user);
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : { UserId: null };

    const [userProfileData, setUserProfileData] = useState(null);
    const [image, setImage] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const debouncedGetData = debounce(() => {
            dispatch(getProfile({ userId: userData.UserId }));
        }, 0); // Example debounce with 300ms delay

        debouncedGetData(); // Initial call

        return () => {
            // Cleanup function
            // This will be called before the next effect is executed or when the component unmounts
            debouncedGetData.cancel(); // Cancel any pending API call on cleanup
        };
    }, [dispatch]);

    useEffect(() => {
        if (profileData && profileData.getProfile) {
            setUserProfileData(profileData?.getProfile);
            setImage(null)
        }
    }, [profileData]);

    const handlePictureUpload = async () => {
        if (image) {
            const formData = new FormData();
            formData.append('profile_picture', image);
            try {
                await dispatch(uploadPicture(formData));
                dispatch(getProfile({ userId: userData.UserId }));
            } catch (error) {
                console.error('Image upload error:', error);
            }
            // dispatch(uploadPicture(formData)).then(() => {
            //         dispatch(getProfile({ userId: userData.UserId }));
            //     })
            //     .catch((error) => {
            //         console.error("Image upload error:", error);
            //     });;
        }
    }

    return (
        <div className="p_five bgc-color h-screen">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 ">
                <div className="flex items-start justify-between border-b rounded-t">
                    <h3 className="text-lg lg:text-xl xl:text-xl  font-semibold text-gray-900">
                        {t('companyProfile')}
                    </h3>
                </div>
                <div className="md:p-6 space-y-6">
                    <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-center xl:flex-row xl:justify-between xl:items-center">
                        <div className=" text-base">
                            <div className="flex flex-col justify-center items-center cursor-pointer mt-2 relative">
                                <label htmlFor="file-upload" className="group">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white relative">
                                        {image ? (
                                            <div className="w-full h-full cursor-pointer relative">
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt="profile_image"
                                                    className="w-full h-full object-cover"
                                                />

                                                <input type="file" id="file-upload" data-testid="file-upload" className="hidden" accept=".jpg,.png,.gif,.jpeg,.svg" onChange={(e) => setImage(e.target.files[0])} />
                                                <div className="group-hover:opacity-100 opacity-0 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                                                    <BsCloudUploadFill className="text-4xl md:text-5xl text-gray-300 group-hover:text-gray-500 transform -translate-x-2/4 -translate-y-2/4" />
                                                </div>
                                            </div>
                                        ) : userProfileData?.profile_picture ? (
                                            <div className="w-full h-full cursor-pointer relative">
                                                <img
                                                    src={`${userProfileData?.profile_picture}`}
                                                    // http://localhost:3000/uploads/https://testainty-images.s3.ap-south-1.amazonaws.com/google.png
                                                    alt="profile_image"
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* <MdOutlineEdit className='text-2xl text-black'/> */}

                                                <input type="file" id="file-upload" data-testid="file-upload" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={(e) => setImage(e.target.files[0])} />
                                                <div className="group-hover:opacity-100 opacity-0 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                                                    <BsCloudUploadFill className="text-4xl md:text-5xl text-gray-300 group-hover:text-gray-500 transform -translate-x-2/4 -translate-y-2/4" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex justify-center items-center cursor-pointer">
                                                <input type="file" id="file-upload" data-testid="file-upload" className="hidden" accept=".jpg,.png,.gif,.jpeg" onChange={(e) => setImage(e.target.files[0])} />
                                                <div className="group-hover:opacity-100 opacity-0 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                                                    <BsCloudUploadFill className="text-4xl md:text-5xl text-gray-300 group-hover:text-gray-500 transform -translate-x-2/4 -translate-y-2/4" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>
                            {image &&
                                <div className="text-center flex justify-center items-center w-full md:w-auto mt-2">
                                    <button className='bg-transparent py-1 rounded px-3 border border-blue-500 md:ml-3 shadow' data-testid="cancel" onClick={() => setImage(null)}>{t('cancel')}</button>
                                    <button className='bg-primary py-1 rounded px-3 text-white ml-3 shadow' data-testid="save" onClick={handlePictureUpload}>{t('save')}</button>
                                </div>
                            }
                        </div>

                        <div className="row w-full lg:w-3/4 xl:w-2/4 pt-3">
                            <div className="col-6 text-xs lg:text-sm xl:text-sm font-semibold">
                                <p>{t('Organisation Id')} :</p>
                                <p>{t('companyName')}</p>
                                <p>{t('userName')}</p>
                                <p>{t('rolep')}</p>
                                <p>{t('joined')}</p>
                            </div>
                            <div className="col-6 text-xs lg:text-sm xl:text-sm">
                                <p>{userProfileData?.orgId}</p>
   
                                <p>{userProfileData?.customerId?.customerName}</p>
                                <p>{userProfileData?.firstName}</p>
                                <p>{userProfileData?.role?.roleName}</p>
                                {/* <p>{new Date(userProfileData?.createdAt).toLocaleString('en-US', { timeZone: 'UTC' })}</p> */}
                                <p>{formatedDate(userProfileData?.createdAt)}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;