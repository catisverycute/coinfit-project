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
import AmountEnterPage from '../pages/transfer/AmountEnterPage';
import TransferConfirmPage from '../pages/transfer/TransferConfirmPage';
import ResetPasswordPage from '../pages/auth/RestPasswordPage';
import PrivateRoute from '../components/common/PrivateRoute';
import MenuPage from '../pages/menu/MenuPage';
import RemitSuccessPage from '../pages/transfer/RemitSuccessPage';
import BudgetSettingPage from '../pages/setting/BudgetSettingPage';
import ExpenseButton from '../pages/analysis/ExpenseButton';
// import Header from '../components/common/Header';

const Router = () => {
  const location = useLocation();
  const hideBottomNavRoutes = [
    '/login',
    '/signup',
    '/reset-password',
    '/transfer/step1',
    '/expense',
  ];
  const shouldHideBottomNav = hideBottomNavRoutes.includes(location.pathname);

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <PrivateRoute>
              <AnalysisPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer/step1"
          element={
            <PrivateRoute>
              <SelectAccountPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer/step2"
          element={
            <PrivateRoute>
              <EnterAccountInfoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer/step3"
          element={
            <PrivateRoute>
              <AmountEnterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer/step4"
          element={
            <PrivateRoute>
              <TransferConfirmPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer/success"
          element={
            <PrivateRoute>
              <RemitSuccessPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/expense"
          element={
            <PrivateRoute>
              <ExpenseButton />
            </PrivateRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <BudgetSettingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <MenuPage />
            </PrivateRoute>
          }
        />
      </Routes>
      {!shouldHideBottomNav && <BottomNav />}
    </>
  );
};

export default Router;
