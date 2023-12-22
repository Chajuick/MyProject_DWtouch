import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import PopupImg from "../../assets/popup.png";

const SlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 900;
  width: 340px;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  animation: ${SlideIn} 800ms forwards;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  button {
    position: absolute;
    top: 5px;
    right: 10px;
    padding: 5px;
    border: none; 
    outline: none;
    background: none;
    color: rgb(250, 250, 250);
    transition: all 400ms;
    font-size: 20px;
  }
  button:hover {
    cursor: pointer;
    color: rgb(120, 120, 120);
  }
  a {
    position: absolute;
    width: 90%;
    height: 40px;
    bottom: 25px;
    left: 5%;
    text-decoration: none;
    color: rgb(250, 250, 250);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9C79FF;
    border-radius: 8px;
    transition: all 400ms;
    font-size: 14px;
  }
  a:hover {
    cursor: pointer;
    filter: contrast(80%);
  }
`;

export default function Popup({ setPopup }) {
  function handleClosePopup() {
    sessionStorage.setItem('popup', "false");
    setPopup(false);
  };

  return (
    <>
    <Container>
      <img src={PopupImg} alt="DW stuido 윈터페스타"/>
      <button className="close_btn" onClick={handleClosePopup}>&times;</button>
      <Link to="/event/winter-festival" className="detail_btn" href="" >자세히보기</Link>
    </Container>
    </>
  );
};