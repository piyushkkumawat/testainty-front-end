import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  customerInquiries,
  deleteInquiryById,
  deleteQuestionBankById,
  deleteQuestionById,
  deleteSkill,
  deleteSubAdmin,
  getQuestionsBank,
  getQuestionsByQuestionBankId,
  getSkills,
  getSubAdmins,
} from '../../Store/userSlice';

function DeleteModal({ isOpen, setIsOpen, data }) {
  const dispatch = useDispatch();
  const params = useParams();
  const toggle = () => setIsOpen(!isOpen);
  const limit = 10;
  const offset = 1;
  const handleDeleteAssessment = async () => {
    const obj = {
      offset: offset,
      limit: limit,
    };
    if (data.skillId) {
      await dispatch(deleteSkill({ skillId: data.skillId }));
      await dispatch(getSkills(obj));
      setIsOpen(false);
    }

    if (data.questionBankId) {
      await dispatch(
        deleteQuestionBankById({ questionBankId: data.questionBankId })
      );
      await dispatch(getQuestionsBank(obj));
      setIsOpen(false);
    }

    if (data.questionId) {
      // Assuming that deleteQuestionById and getQuestionsByQuestionBankId return promises
      await dispatch(deleteQuestionById({ questionId: data.questionId }));
      await dispatch(
        getQuestionsByQuestionBankId({ questionBankId: params.id })
      );
      setIsOpen(false);
    }

    if (data.inquiryId) {
      dispatch(deleteInquiryById({ enqCustomerId: data.inquiryId }))
        .then(() => {
          const obj = {
            offset: 1,
            limit: 10,
            query: '',
          };
          dispatch(customerInquiries(obj));
          setIsOpen(false);
        })
        .catch((error) => {
          // Handle error if the delete operation fails.
          console.error('Error deleting inquiry:', error);
        });
    }

    if (data.subAdminId) {
      const obj = {
        offset: 1,
        limit: 10,
        query: '',
      };
      await dispatch(deleteSubAdmin({ subadminId: data.subAdminId }));
      await dispatch(getSubAdmins(obj));
      setIsOpen(false);
    }
  };

  return (
    <Modal size="sm" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sure! you want to delete?</ModalHeader>
      <ModalBody>
        <div className="flex justify-around w-100">
          <button
            className="bg-primary rounded px-3 py-2 text-white text-sm"
            type="submit"
            onClick={handleDeleteAssessment}
          >
            Yes
          </button>
          <button
            className="bg-primary rounded px-3 py-2 text-white text-sm"
            onClick={() => setIsOpen(false)}
          >
            No
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default DeleteModal;
