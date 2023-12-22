import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

// 계정 관련 컴퍼넌트
import Login from './Components/AcountManagement/Login';
import Logout from './Components/AcountManagement/Logout';
import Register from './Components/AcountManagement/Register';
import UserInfoUpdate from './Components/AcountManagement/UserInfoUpdate';
import FindAccount from './Components/AcountManagement/FindUserInfo/FindAccount';

import ErrorModal from './Components/Modal/ErrorModal';
import HeaderBar from './Components/CommonComponents/HeaderBar';
import NavBar from './Components/CommonComponents/NavBar';

// 라우트 경로
import IndexPage from './PageComonents/IndexPage';
import Mypage from './PageComonents/Mypage';
import CartPage from './PageComonents/CartPage';
import CartErrorPage from './Components/CartPageComponents/Cart/Complete/CartErrorPage';

// 물품-리스트 페이지
import PhotobookListPage from './PageComonents/ProductPage/ListPage/PhotobookListPage';
import CalendarListPage from './PageComonents/ProductPage/ListPage/CalendarListPage';
import StickerListPage from './PageComonents/ProductPage/ListPage/StickerListPage';
import ClothesListPage from './PageComonents/ProductPage/ListPage/ClothesListPage';
import AccessoriesListPage from './PageComonents/ProductPage/ListPage/AccessoriesListPage';
import DrinkwareListPage from './PageComonents/ProductPage/ListPage/DrinkwareListPage';
// 물품-오버뷰 페이지
import PhotobookOverviewPage from './PageComonents/ProductPage/OverViewPage/PhotobookOverViewPage';
import FanbookOverviewPage from './PageComonents/ProductPage/OverViewPage/FanbookOverViewPage';
import ElbumOverviewPage from './PageComonents/ProductPage/OverViewPage/ElbumOverViewPage';

// 물품 디자인 페이지
import PhotobookDesignPage from './PageComonents/ProductPage/DesignPage/PhotobookDesignPage';

import WinterFesta from './PageComonents/ProductPage/EventPage/WinterFesta';




const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Pretendard-Regular; 
  }
  body {
    width: 100%;
    height: 100%;
  }
`

export default function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showFindAccountModal, setShowFindAccountModal] = useState(false);
  const [isFindID, setIsFindID] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errCode, setErrCode] = useState('');
  const [updateStatus, setUpdateStatus] = useState(false);
  const [showIsPhoneDuplicateModal, setShowIsPhoneDuplicateModal] = useState(false);

  // 로그인 모달에서 회원가입 모달 열기
  function handleOpenRegisterInLogin() {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  // 로그인 모달에서 계정 찾기 모달 열기
  function handleOpenFindIDinfLogin() {
    setShowLoginModal(false);
    setIsFindID(true);
    setShowFindAccountModal(true);
  };
  function handleOpenFindPWinfLogin() {
    setShowLoginModal(false);
    setIsFindID(false);
    setShowFindAccountModal(true);
  };

  // 계정 찾기 모달에서 로그인 모달 열기
  function handleOpenLoginModalInFindAccount() {
    setShowFindAccountModal(false);
    setIsFindID(true);
    setShowLoginModal(true);
  };

  // 회원가입 모달에서 계정 찾기 모달 열기
  function handleOpenFindAccountModalInRegister() {
    setShowFindAccountModal(true);
    setIsFindID(true);
    setShowRegisterModal(false);
    setShowIsPhoneDuplicateModal(false);
  }

  function locationReload() {
    window.location.reload(true);
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserInfoUpdate 
          updateStatus={updateStatus}
          setUpdateStatus={setUpdateStatus}
        />
        <Logout
          showModal={showLogoutModal}
          setShowModal={setShowLogoutModal}
        />
        <Login 
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
          handleOpenRegister={handleOpenRegisterInLogin}
          handleOpenFindID={handleOpenFindIDinfLogin}
          handleOpenFindPW={handleOpenFindPWinfLogin}
        />
        <Register
          showModal={showRegisterModal}
          setShowModal={setShowRegisterModal}
          handleOpenFindAccountModal={() => handleOpenFindAccountModalInRegister()}
          showIsPhoneDuplicateModal={showIsPhoneDuplicateModal}
          setShowIsPhoneDuplicateModal={setShowIsPhoneDuplicateModal}
        />
        <FindAccount 
          showModal={showFindAccountModal}
          setShowModal={setShowFindAccountModal}
          isFindID={isFindID}
          setIsFindID={setIsFindID}
          handleOpenLoginModal={handleOpenLoginModalInFindAccount}
        />
        <ErrorModal 
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
          errCode={errCode}
          setErrCode={setErrCode}
        />
        <HeaderBar 
          setShowLoginModal={setShowLoginModal}
          setShowLogoutModal={setShowLogoutModal}
          setShowRegisterModal={setShowRegisterModal}
          updateStatus={updateStatus}
        />
        <NavBar 
          setShowLoginModal={setShowLoginModal}
        />
        <Routes>
          <Route path="/" element={
            <IndexPage 
              setShowLoginModal={setShowLoginModal} 
              setShowLogoutModal={setShowLogoutModal} 
              setShowRegisterModal={setShowRegisterModal} 
              updateStatus={updateStatus}
            />} 
          />
          <Route path="/my" element={<Mypage locationReload={locationReload}/>} />
          <Route path='/photobook-list' element={<PhotobookListPage />}/>
          <Route path='/calendar-list' element={<CalendarListPage />}/>
          <Route path='/sticker-list' element={<StickerListPage />}/>
          <Route path='/clothes-list' element={<ClothesListPage />}/>
          <Route path='/accessories-list' element={<AccessoriesListPage />}/>
          <Route path='/drinkware-list' element={<DrinkwareListPage />}/>
          <Route path='/event/winter-festival' element={<WinterFesta />}/>

          <Route path='/photobook-overview' element={<PhotobookOverviewPage setShowLoginModal={setShowLoginModal}/>}/>
          <Route path='/fanbook-overview' element={<FanbookOverviewPage setShowLoginModal={setShowLoginModal}/>}/>
          <Route path='/elbum-overview' element={<ElbumOverviewPage setShowLoginModal={setShowLoginModal}/>}/>

          <Route path='/photobook-design' element={<PhotobookDesignPage  setShowLoginModal={setShowLoginModal}/>}/>
          
          
          <Route path='/cart' element={<CartPage locationReload={locationReload}/>}/>
          <Route path='/order-error' element={<CartErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
