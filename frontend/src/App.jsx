import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserHome from './components/UsersPanel/Home';
import UserProfile from './components/UsersPanel/Profile';
import LandingPage from './components/LandingPage/Home';
import AdminHome from './components/AdminPanel/Home';
import AdminUserRecordTable from './components/AdminPanel/UsersRecord';
import AdminUserComplaints from './components/AdminPanel/UsersComplaints';
import AdminAllRecords from './components/AdminPanel/AllRecords';
import AdminWithdrawalApprovals from './components/AdminPanel/WithdrawalApprovals';
import AdminDepositApprovals from './components/AdminPanel/DepositApprovals';
import UserComplaints from './components/UsersPanel/Complaints';
import AdminSettings from './components/AdminPanel/Settings2';
import HelpCenter from './components/LandingPage/HelpCenter';
import UserWallet from './components/UsersPanel/Wallet';
import Login from './components/LandingPage/Login';
import Register from './components/LandingPage/Register';
import UserReport from './components/UsersPanel/Report';
import UserHistory from './components/UsersPanel/History';
import UserOffers from './components/UsersPanel/Offers';
import AgentsHome from './components/AgentPanel/Home';
import AgentsSettings from './components/AgentPanel/Settings';
import AgentsCreateUser from './components/AgentPanel/CreateUser';
import AgentsUserRecords from './components/AgentPanel/UserRecords';
import AgentsAllRecords from './components/AgentPanel/AllRecords';
import AgentsCreatePromo from './components/AgentPanel/CreatePromo';
import GiftCard from './components/AdminPanel/GiftCards';
import AdminThemesPanel from './components/AdminPanel/ThemesPanel';
import AdminSummary from './components/AdminPanel/Summary';
import UserSummary from './components/UsersPanel/Summary';
import AgentSummary from './components/AgentPanel/Summary';
import Deposit from './components/UsersPanel/Deposit';
import Withdraw from './components/UsersPanel/Withdraw';
import { useAuthContext } from "./hooks/useAuthContext";
import GamesCards from './components/Games/GamesCards';
import LandingPageFooter from './components/LandingPage/Footer';
import SingleDigitLotteryGame from './components/SingleDigitLottery/FullGame';
import AdminGiftCardsTable from './components/AdminPanel/GiftCardRecords';
import UsersSettings from './components/AdminPanel/UsersSettings';
import AgentsRecordTable from './components/AdminPanel/AgentsRecord';
import AgentSettings from './components/AdminPanel/AgentSettings';
import socketIOClient from 'socket.io-client';
import DoubleDigitLotteryGame from './components/DoubleDigitLottery/FullGame';
import TripleDigitLotteryFullGame from './components/TripleDigitLottery/FullGame';
import ColorBallFullGame from './components/ColorBallGame/FullGame';
import GamesSetting from './components/AdminPanel/GamesSetting';
import OffersSettings from './components/AdminPanel/OffersSettings';

function App() {
  const { user } = useAuthContext();
  const isUser = user && user.role === 'user' && user.accountStatus === "active";
  const isAdmin = user && user.role === 'admin';
  const isAgent = user && user.role === 'agent';
  const isLogin = isUser || isAdmin || isAgent;

  useEffect(() => {
    const socket = socketIOClient(`https://up365gaming.com`);
    socket.on('connect', () => {
      console.log('Connected to Backend server on https://up365gaming.com/');
      console.log('Connected to frontend server on https://up365gaming.com/');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='bg-slate-900'>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path='/' element={isUser ? <UserHome /> : isAgent ? <AgentsHome /> : isAdmin ? <AdminHome /> : <LandingPage />} />
          <Route path='/helpCenter' element={<HelpCenter />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* Games Routes */}
          <Route path='/games' element={<GamesCards />} />
          <Route path='/games/singleDigitLottery' element={isLogin ? <SingleDigitLotteryGame /> : <Login />} />
          <Route path='/games/doubleDigitLottery' element={isLogin ? <DoubleDigitLotteryGame /> : <Login />} />
          <Route path='/games/tripleDigitLottery' element={isLogin ? <TripleDigitLotteryFullGame /> : <Login />} />
          <Route path='/games/colorBallLottery' element={isLogin ? <ColorBallFullGame /> : <Login />} />
          {/* User Routes or After Login Routes  */}
          <Route path='/user/home' element={(isUser) ? <UserHome /> : <Login />} />
          <Route path='/user/wallet' element={(isLogin) ? <UserWallet /> : <Login />} />
          <Route path='/user/report' element={(isUser) ? <UserReport /> : <Login />} />
          <Route path='/user/offers' element={(isUser) ? <UserOffers /> : <Login />} />
          <Route path='/user/result' element={(isUser) ? <UserHistory /> : <Login />} />
          <Route path="/user/profile" element={(isUser) ? <UserProfile /> : <Login />} />
          <Route path="/user/complaints" element={(isLogin) ? <UserComplaints /> : <Login />} />
          <Route path="/user/summary" element={(isUser) ? <UserSummary /> : <Login />} />
          <Route path="/deposit" element={(isLogin) ? <Deposit /> : <Login />} />
          <Route path="/withdraw" element={(isUser || isAdmin || isAgent) ? <Withdraw /> : <Login />} />
          {/* Agents Routes */}
          <Route path='/agent/home' element={(isAgent) ? <AgentsHome /> : <Login />} />
          <Route path='/agent/addUserCredentials' element={(isAgent) ? <AgentsCreateUser /> : <Login />} />
          <Route path='/agent/settings' element={(isAgent) ? <AgentsSettings /> : <Login />} />
          <Route path='/agent/userRecords' element={(isAgent) ? <AgentsUserRecords /> : <Login />} />
          <Route path='/agent/createPromoCode' element={(isAgent) ? <AgentsCreatePromo /> : <Login />} />
          <Route path='/agent/allRecords' element={(isAgent) ? <AgentsAllRecords /> : <Login />} />
          <Route path="/agent/summary" element={(isAgent) ? <AgentSummary /> : <Login />} />
          {/* Admin Panel Routes */}
          <Route path='/admin' element={(isAdmin) ? <AdminHome /> : <Login />} />
          <Route path='/admin/allRecords' element={(isAdmin) ? <AdminAllRecords /> : <Login />} />
          <Route path='/admin/setThemes' element={(isAdmin) ? <AdminThemesPanel /> : <Login />} />
          <Route path='/admin/settings' element={(isAdmin) ? <AdminSettings /> : <Login />} />
          <Route path='/admin/adminDepositApprovalsPage' element={(isAdmin) ? <AdminDepositApprovals /> : <Login />} />
          <Route path='/admin/adminWithdrawalApprovalsPage' element={(isAdmin) ? <AdminWithdrawalApprovals /> : <Login />} />
          <Route path='/admin/adminPlayersRecord' element={(isAdmin) ? <AdminUserRecordTable /> : <Login />} />
          <Route path='/admin/usersComplaints' element={(isAdmin) ? <AdminUserComplaints /> : <Login />} />
          <Route path='/admin/summaryReportsStatements' element={(isAdmin) ? <AdminSummary /> : <Login />} />
          <Route path='/admin/createGiftCard' element={(isAdmin) ? <GiftCard /> : <Login />} />
          <Route path='/admin/userSettings' element={(isAdmin) ? <UsersSettings /> : <Login />} />
          <Route path='/admin/agentSettings' element={(isAdmin) ? <AgentSettings /> : <Login />} />
          <Route path='/admin/offersSettings' element={(isAdmin) ? <OffersSettings /> : <Login />} />
          <Route path='/admin/gamesSettings' element={(isAdmin) ? <GamesSetting /> : <Login />} />
          <Route path='/admin/gamesRecords' element={(isAdmin) ? <GiftCard /> : <Login />} />
          <Route path='/admin/betsRecords' element={(isAdmin) ? <GiftCard /> : <Login />} />
          <Route path='/admin/agentsRecords' element={(isAdmin) ? <AgentsRecordTable /> : <Login />} />
          <Route path='/admin/allGiftCards' element={(isAdmin) ? <AdminGiftCardsTable /> : <Login />} />
        </Routes>
      </BrowserRouter>
      <LandingPageFooter />
    </div>
  );
}

export default App;
