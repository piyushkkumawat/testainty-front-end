import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addSettings,
  handleNext,
  handlePrev,
} from '../../Store/createAssesmentSlice'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

const Settings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectSettings = (state) => state.createAssessment
  const selectSettingsDetails = (state) => selectSettings(state)?.settings || {}
  const createAssessmentData = useSelector(selectSettingsDetails)
  const [showScore, setShowScore] = useState(true)

  const handleSubmit = () => {
    dispatch(handleNext())
    navigate('/dashboard/preview')
  }

  useEffect(() => {
    let obj = {
      showScore: showScore,
    }
    dispatch(addSettings(obj))
  }, [showScore])

  const handleShowScore = (e) => {
    setShowScore(e.target.checked)
  }

  return (
    <div className="mt-1 px-3 xl:mx-5 py-4">
      <div className="font">
        <div className="flex justify-between mb-0">
          <div>
            <p className="text-sm font-semibold mb-0">{t('antiCheat')}</p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-0 mr-6 lg:mr-7 ">{t('additionalSettings')}</p>
          </div>
        </div>

        <hr />
        <div className="flex justify-between">
          <div>
            <div className="mb-1 flex items-center">
              <input type="checkbox" onChange={() => {}} checked />
              <label className="ml-3 lg:ml-5 xl:ml-5 text-xs">
                {t('disallow')}
              </label>
            </div>
            <div className="mb-1 flex items-center">
              <input type="checkbox" onChange={() => {}} checked />
              <label className="ml-3 lg:ml-5 xl:ml-5 text-xs">
                {t('makeFullscreen')}
              </label>
            </div>
            <div className=" mb-1 flex items-center">
              <input type="checkbox" onChange={() => {}} checked />
              <label className="ml-3 lg:ml-5 xl:ml-5 text-xs">
                {t('logTab')}
              </label>
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center">
              <input
                type="checkbox"
                onChange={handleShowScore}
                checked={showScore}
              />
              <label className="ml-3 lg:ml-5 xl:ml-5 text-xs">
                {t('showScore')}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end  items-cenetr w-100 mt-3">
        <button
          data-testid="previous-btn"
          className={
            'bg-primary mr-3 text-white font-medium rounded-md px-4 py-1 text-xs lg:text-sm xl:text-sm'
          }
          onClick={() => {
            dispatch(handlePrev())
            navigate('/dashboard/selectAssessment')
          }}
        >
          {t('previous')}
        </button>
        <button
          type="submit"
          className={
            'bg-primary text-white font-medium rounded-md px-4 py-1 text-xs lg:text-sm xl:text-sm'
          }
          onClick={handleSubmit}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}

export default Settings
