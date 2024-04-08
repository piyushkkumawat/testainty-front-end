/*eslint-disable no-undef*/
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { updateAssessmentById } from '../../Store/assessmentSlice'
import { commonService } from '../../Services/common.services'
import { apiConstants } from '../../Constants/api.constant'

function EditModal({
  isShow,
  setIsShow,
  value,
  setValue,
  assessment_id,
  filedName,
  offset,
  limit,
  setAssessmentData
}) {
  const dispatch = useDispatch()
  const toggle = () => setIsShow(!isShow)
  // const [value, setValue] = useState(data)
  const handleChange = (e) => {
    let data = e.target.value
    setValue(data)
  }

  const handleSubmit = async () => {
    let obj = {
      assessment_id,
      [filedName]: value,
    }
    await dispatch(updateAssessmentById(obj))
    const obj1 = {
      assessment_id: assessment_id,
      limit: limit,
      offset: offset,
    }
    // await dispatch(getQuestionsByQuestionBankId(obj2));
    const response = await commonService.withToken(
      apiConstants.GET_ASSESSMENT_BY_ID,
      obj1
    )
    if (response?.data && response?.status) {
        setAssessmentData(response?.data?.assesment);
        // setText(response?.data?.assesment?.assessment_invite_url);
      }
    console.log('response', response)
    toggle()
  }

  return (
    <Modal size="lg" isOpen={isShow} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div className="flex items-center justify-between">
          <div>Edit</div>
        </div>
      </ModalHeader>
      <ModalBody>
        {filedName === 'assessmentName' && (
          <input
            id="assessmentName"
            data-testid="assessment-input"
            placeholder="Enter Assessment Name"
            value={value}
            onChange={handleChange}
            // onBlur={handleBlur}
            className="mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 border-gray-300 rounded-md"
            rows="4"
          />
        )}

        <div className="mt-4 flex item-start justify-end space-x-7 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-4">
          <button
            className="text-black font-medium rounded-md h-10 px-5 max-lg:px-1 border"
            type="button"
            data-testid="submit"
            onClick={() => setIsShow(false)}
          >
            Cancel
          </button>
          <button
            className="btn-color text-white font-medium rounded-md h-10 px-5 max-lg:px-1"
            type="submit"
            data-testid="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default EditModal
/*eslint-enable no-undef*/
