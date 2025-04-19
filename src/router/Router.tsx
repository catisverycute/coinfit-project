import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import AccountListPage from '../pages/account/AccountListPage';
import BottomNav from '../components/common/BottomNav';
import { useLocation } from 'react-router-dom';
import SelectAccountPage from '../pages/transfer/SelectAccountPage';
import EnterAccountInfoPage from '../pages/transfer/EnterAccountInfoPage';
import AnalysisPage from '../pages/analysis/AnalysisPage';
// import Header from '../components/common/Header';

const Router = () => {
  const location = useLocation();
  const hideBottomNavRoutes = ['/login', '/signup', '/transfer/step1'];
  const shouldHideBottomNav = hideBottomNavRoutes.includes(location.pathname);

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountListPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/transfer/step1" element={<SelectAccountPage />} />
        <Route path="/transfer/step2" element={<EnterAccountInfoPage />} />
      </Routes>
      {!shouldHideBottomNav && <BottomNav />}
    </>
  );
};

export default Router;
