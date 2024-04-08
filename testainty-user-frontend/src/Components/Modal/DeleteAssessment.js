import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useDispatch } from 'react-redux';
import { deleteAssessment, getAllAssessments } from '../../Store/assessmentSlice.js';
import { deleteCandidate, getCandidate } from '../../Store/assessmentSlice.js';
import { useParams } from 'react-router-dom';
import { deleteAdmin, getAllTeams } from '../../Store/teamsSlice';
import { searchAllCandidates } from '../../Store/candidateSlice';
import { t } from 'i18next';
import { appConstants } from '../../Constants/app.constant.js';

function DeleteAssessment({ isOpen, setIsOpen, data }) {
    const dispatch = useDispatch()
    const params = useParams()
    const limit = appConstants.LIMIT
    const offset = 1
    const toggle = () => setIsOpen(!isOpen);
    const handleDeleteAssessment = async() => {
        let obj = {
            offset: offset,
            limit: limit
        }
        if (data.candidateId) {
          try {
            // Dispatch the deleteCandidate action and wait for it to complete
            await dispatch(deleteCandidate({ candidateId: data.candidateId }));
        
            // If the deleteCandidate action is successful, dispatch getCandidate
            await dispatch(getCandidate({
              assessment_id: data.assementId,
              offset: offset,
              limit: limit,
              assessment_url: params.assessment_url,
              query: '',
              filter: {
                status:'',
              },

            }));
        
            // Close the modal or perform any other actions
            setIsOpen(false);
          } catch (error) {
            // Handle errors that may occur during the deleteCandidate action
            console.error('Error deleting candidate:', error);
          }
        }
        
          
          if (data.assessment_id) {
            try {
              // Dispatch the deleteAssessment action and wait for it to complete
              await dispatch(deleteAssessment({ assessment_id: data.assessment_id }));
          
              // If the deleteAssessment action is successful, dispatch getAllAssessments
              dispatch(getAllAssessments(obj));
          
              // Close the modal or perform any other actions
              setIsOpen(false);
            } catch (error) {
              // Handle errors that may occur during the deleteAssessment action
              console.error('Error deleting assessment:', error);
            }
          }
          
        if (data.userId) {
            try {
              // Dispatch the deleteAdmin action and wait for it to complete
              await dispatch(deleteAdmin({ userId: data.userId }));
          
              // If the deleteAdmin action is successful, dispatch getAllTeams
              let obje = {
                offset: offset,
                limit: limit,
                query: ''
              };
             await dispatch(getAllTeams(obje));
          
              // Close the modal or perform any other actions
              setIsOpen(false);
            } catch (error) {
              // Handle errors that may occur during the deleteAdmin action
              console.error('Error deleting admin:', error);
            }
          }
          

        if (data.cId) {
            dispatch(deleteCandidate({ candidateId: data?.cId }))
              .then(() => {
                let obj = {
                  offset: offset,
                  limit: limit,
                  query: '',
                  filter: {
                      status: ''
                  }
                };
                dispatch(searchAllCandidates(obj));
                setIsOpen(false);
              })
              .catch((error) => {
                console.error('Error deleting candidate:', error);
              });
          }
    }
    return (
        <Modal
            size='sm'
            isOpen={isOpen}
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>{t('wantTodelete')}</ModalHeader>
            <ModalBody>
                <div className='flex justify-around w-100'>
                    <button className="bg-primary rounded px-3 py-2 text-white text-sm" type='submit' onClick={handleDeleteAssessment}>
                        {t('yes')}
                    </button>
                    <button className="bg-primary rounded px-3 py-2 text-white text-sm" onClick={() => setIsOpen(false)}>
                        {t('no')}
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default DeleteAssessment;

