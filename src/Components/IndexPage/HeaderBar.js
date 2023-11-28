import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.png'
import Login from '../AcountManagement/Login';
import Register from '../AcountManagement/Register/Register';
import Logout from '../AcountManagement/Logout';
import { useNavigate } from 'react-router-dom';
import LoginUpdate from '../AcountManagement/LoginUpdate';
import ErrorModal from '../Modal/ErrorModal';

const Container = styled.div`
  // Container 스타일을 정의
  background-color: rgb(250, 250, 250);
  color: rgb(25, 25, 25);
  width: 100vw;
`;

const Bar = styled.div`
  // Bar 스타일을 정의
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Logobox = styled.div`
  // Logobox 스타일을 정의
  height: 52px;
  display: flex;
  align-items: center;
  img{
    height: 36px;
  }
`;

const Uibox = styled.ul`
  // Uibox 스타일을 정의
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  li > a{
    color: rgb(25, 25, 25);
    background-color: rgb(250, 250, 250);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    text-decoration: none;
    font-size: 12px;
    display: flex;
    align-items: center;
    transition: all 400ms;
  }
  li > a:hover{
    color: rgb(250, 250, 250);
    background-color: rgb(25, 25, 25);
  }
  li > div > button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(25, 25, 25);
    background-color: rgb(250, 250, 250);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    text-decoration: none;
    font-size: 12px;
    display: flex;
    align-items: center;
    transition: all 400ms;
    border: none;
    cursor: pointer;
  }
  li > div > button:hover {
    color: rgb(250, 250, 250);
    background-color: rgb(25, 25, 25);
  }
  li > p {
    color: rgb(25, 25, 25);
    font-size: 14px;
    margin-right: 1rem;
    display: flex;
    align-items: center;
  }
`;

export default function HeaderBar() {
  const [showErrorModal, setShowErrorModal] = useState(false); // 에러메시지 on/off
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [errCode, setErrCode] = useState(''); // 에러코드
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname == '/my') {
      navigate('/');
    } else if (!isLoggedIn && window.location.pathname == '/cart') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const loginCheck = sessionStorage.getItem('isLoggedIn');
    if (loginCheck) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  
  return <>
    <LoginUpdate />
    <Container>
      <Bar>
        <Logobox>
          <Link to="/"><img src={logo} alt='logo' /></Link>
        </Logobox>
        <Uibox>
          <li style={{ display: isLogin ? 'block' : 'none'}}>
            <p><b>{`${sessionStorage.getItem('user_name')}`}</b>님 안녕하세요&nbsp;&nbsp;<Icon icon="uiw:smile" width="16" height="16"/></p>
          </li>
          <li style={{ display: isLogin ? 'none' : 'block'}}>
            <div>
              <button onClick={() => setShowLoginModal(true)}><Icon icon="majesticons:login" width="20" height="20" />로그인</button>
            </div>
          </li>
          <li style={{ display: isLogin ? 'none' : 'block'}}>
            <div>
              <button onClick={() => setShowRegisterModal(true)}><Icon icon="mdi:account-key" width="20" height="20" />회원가입</button>
            </div>
          </li>
          <li style={{ display: isLogin ? 'block' : 'none'}}>
            <div>
              <button onClick={() => setShowLogOutModal(true)}><Icon icon="majesticons:logout" width="20" height="20"/>로그아웃</button>
            </div>
          </li>
          <li style={{ display: isLogin ? 'block' : 'none'}}>
            <Link to="/my"><Icon icon="mdi:account" width="20" height="20"/>MY</Link>
          </li>
          <li>
            <Link to="/couponpage"><Icon icon="bxs:coupon" width="20" height="20" />쿠폰</Link>
          </li>
          <li>
            <Link to="/service"><Icon icon="ic:baseline-headset" width="20" height="20"/>고객센터</Link>
          </li>
        </Uibox>
      </Bar>
    </Container>
    <Logout
      showModal={showLogOutModal}
      setShowModal={setShowLogOutModal}
    />
    <ErrorModal 
      showErrorModal={showErrorModal}
      setShowErrorModal={setShowErrorModal}
      errCode={errCode}
      setErrCode={setErrCode}
    />
    <Login 
      showModal={showLoginModal}
      setShowModal={setShowLoginModal}
      showRegisterModal={showRegisterModal}
      setShowRegisterModal={setShowRegisterModal}
    />
    <Register
      showModal={showRegisterModal}
      setShowModal={setShowRegisterModal}
    />
  </>
}

