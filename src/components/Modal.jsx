import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../features/Slice';

const Modal = () => {
  const { isModalOpen, correct, questions } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const handlePlayAgain = () => {
    dispatch(closeModal());
  };

  return (
    <div className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'}`}>
      <div className='modal-content'>
        <h2>congrats!</h2>
        <p>
          You answered {((correct / questions.length) * 100).toFixed(0)}% of questions correctly
        </p>
        <button className='close-btn' onClick={handlePlayAgain}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;