import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import BottomNav from './components/BottomNav';
import AccountListPage from './pages/AccountListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountListPage />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
