import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, checkAnswer } from './features/Slice';
import Loading from './components/Loading';
import Modal from './components/Modal';
import SetupForm from './components/SetupForm';

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
  } = useSelector(state => state.app);
  const dispatch = useDispatch();

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);

  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  const handleAnswerClick = (selectedAnswer) => {
    const isCorrect = correct_answer === selectedAnswer;
    dispatch(checkAnswer(isCorrect));
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => (
              <button
                key={index}
                className='answer-btn'
                onClick={() => handleAnswerClick(answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
          </div>
        </article>
        <button className='next-question' onClick={handleNextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;