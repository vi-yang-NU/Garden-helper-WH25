import { useQuestionnaire } from '../context/QuestionnaireContext';
import { saveUserProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const FinalQuestionPage = () => {
  const { responses } = useQuestionnaire();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user_id = localStorage.getItem('user_id');

    const payload = {
      user_id: Number(user_id),
      ...responses,
      track_opt_in: true
    };

    try {
      await saveUserProfile(payload);
      console.log('Profile saved');
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  return (
    <div className="final-page">
      <h2>You're all set!</h2>
      <button onClick={handleSubmit} className="submit-btn">Finish & View Dashboard</button>
    </div>
  );
};

export default FinalQuestionPage;