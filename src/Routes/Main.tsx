import { Routes, Route } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import Home from './Home';
import Questions from '../components/Questions';

const Main = () => {
return (         
  <Routes>
    <Route path='/' element={<ApplicationForm/>} />
  </Routes>
);
}
export default Main;