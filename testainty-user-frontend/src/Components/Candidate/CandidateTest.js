/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import screenfull from 'screenfull';
import CandidateTestScreens from './CandidateTestScreens.js';
import { useDispatch, useSelector } from 'react-redux';
import { getTestInfo, startTest } from '../../Store/testSlice.js';
import TestSubmit from './TestSubmit.js';
import { useLocation } from 'react-router';
import { t } from 'i18next';
import Loader from '../Common/Loader.js';

const CandidateTest = () => {
  const startTestData = useSelector((state) => state.test.startTest)
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [testInfoData, setTestInfoData] = useState(null)
  const [assessment_url, setAssessment_url] = useState(null);
  const [testSubmited, setTestSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  // const toggleFullscreen = async () => {
  //   setIsLoading(true)
  //   if (screenfull.isEnabled) {
  //     if (screenfull.isFullscreen) {
  //       screenfull.exit();
  //       setIsFullscreen(false);
  //       setTestSubmited(false);
  //       setIsLoading(false)

  //     } else {
  //       try {
  //         const obj = {
  //           testUrl: assessment_url,
  //           candidateId: id
  //         };
  
  //         // Call the startTest API
  //         const response = await dispatch(startTest(obj));
  
  //         // Check if the API call was successful and status is true
  //         if (response.payload.status) {
  //           setIsLoading(false)

  //          await screenfull.request();
  //           setIsFullscreen(true);
  //         } else {
  //           console.error('API returned false');
  //           setTestSubmited(true)
  //           setIsLoading(false)
  //         }
  //       } catch (error) {
  //         console.error('Error calling startTest API:', error);
  //         setIsLoading(false)
  //       }
  //     }
  //   }else{
  //     setIsLoading(false)
  //   }
  // };

  const toggleFullscreen = async () => {
    const element = document.documentElement;
    setIsLoading(true);
  
    try {
      if (document.fullscreenEnabled) {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          setIsFullscreen(false);
          setTestSubmited(false);
        } else {
          const obj = {
            testUrl: assessment_url,
            candidateId: id
          };
  
          // Call the startTest API
          const response = await dispatch(startTest(obj));
  
          // Check if the API call was successful and status is true
          if (response.payload.status) {
            setIsLoading(false);
  
            await element.requestFullscreen();
            setIsFullscreen(true);
          } else {
            console.error('API returned false');
            setTestSubmited(true);
            setIsLoading(false);
          }
        }
      } else {
        console.error('Fullscreen is not supported');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen mode:', error);
      setIsLoading(false);
    }
  };
  

  const testSubmitComponent = useMemo(() => {
    setIsLoading(false)
    return testSubmited && <TestSubmit />;
  }, [testSubmited]);

  const candidateTestScreensComponent = useMemo(() => {
    return isFullscreen && (
      <CandidateTestScreens
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        candidateId={id}
        assessment_url={assessment_url}
        testInfoData={testInfoData}
        setTestSubmited={setTestSubmited}
        setIsFullscreen={setIsFullscreen}
      />
    );
  }, [isFullscreen, id, assessment_url, testInfoData, setTestSubmited]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        // Fetching startTestData
        if (startTestData && startTestData.status) {
          setIsFullscreen(false);
          setIsLoading(false);
        } else {
          setIsFullscreen(false);
          setIsLoading(false);
        }
  
        // Fetching testInfo
        const testInfoResponse = await dispatch(getTestInfo({ candidateId: id }));
        if (testInfoResponse && testInfoResponse.payload && testInfoResponse.payload.assesmentDetails) {
          setTestInfoData(testInfoResponse.payload.assesmentDetails);
          setAssessment_url(testInfoResponse.payload.assesmentDetails.assessment_url);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [dispatch, id]);
  
  const handleCopyPaste = (e) => {
    e.preventDefault();
  }

  if(isLoading){
    return (
      <Loader />
    )
  }
  
  return (
    <div>
      {(!isFullscreen && !testSubmited) && <>
        <div className="w-full flex items-center justify-center bgc-color h-screen" onCopy={handleCopyPaste} onPaste={handleCopyPaste}>
          <div className="w-full lg:w-6/12 border bg-white shadow-md rounded-lg px-4 py-5">
            {/* <div className=""> */}
              <div className=" font-semibold text-xl lg:text-2xl xl:text-2xl font">
                {t('sampleTest')}
              </div>
              <div className="flex flex-col mt-4 text-sm lg:text-xl xl:text-xl">
                <div className="mr-10">{t('testName')}{testInfoData?.assessmentName}</div>
                <div className="mr-10 mt-2">{t('testDuration')}{testInfoData?.assessment_duration} {t('min')}</div>
              </div>
              <div className="">
                <div className="text-sm lg:text-xl xl:text-xl font-semibold mt-4">
                  {t('readInstructions')}
                </div>
                <ul className="list-disc mt-3">
                  {/* <div className="text-sm lg:text-xl xl:text-xl font-semibold mb-2">{t('beforeStartTest')}</div> */}
                  <li className="text-sm lg:text-xl xl:text-xl">{t('usingGoogleChrome')} </li>
                  <li className="text-sm lg:text-xl xl:text-xl">{t('disableAllAdBlockers')}</li>
                  <li className="text-sm lg:text-xl xl:text-xl">{t('weRecommend')}</li>
                  <li className="text-sm lg:text-xl xl:text-xl">{t('internetConnection')}</li>
                </ul>
              </div>
              <div className="mt-5">
                <button data-testid="start-btn" onClick={toggleFullscreen} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  {t('startTest')}
                </button>
              </div>
            {/* </div> */}
          </div>
        </div>
      </>}
      {testSubmitComponent}
      {candidateTestScreensComponent}
     
    </div>
  );
};

export default CandidateTest;
