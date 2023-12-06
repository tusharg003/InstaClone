import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/auth' element={<AuthPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
