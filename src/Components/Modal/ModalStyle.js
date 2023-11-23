import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: ${({ $showModal }) => ($showModal ? 'block' : 'none')};
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 250, 250);
  border-radius: 5px;
  padding: 40px;
  z-index: 1002;
  display: ${({ $showModal }) => ($showModal ? 'block' : 'none')};
  img {
    max-width: 800px;
    max-height: 500px;
  }
`;

export const ModalCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  padding: 0 6px 2px 6px;
  border-radius: 6px;
  transition: all 400ms;
  cursor: pointer;
  &:hover {
    color: rgb(250, 250, 250);
    background-color: rgb(25, 25, 25);
  }
`;

export const AlertModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 250, 250);
  border-radius: 5px;
  padding: 30px;
  z-index: 2002;
  display: ${({ $showAlertModal }) => ($showAlertModal ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  h2#showPhoneNumber {
    font-size: 18px;
    margin-bottom: 15px;
    border: none;
    color: rgb(250, 50, 50);
  }
  p {
    text-align: center;
    font-size: 15px;
    line-height: 1.3;
    margin-bottom: 20px;
  }
  div > button{
    font-size: 14px;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background-color: rgb(240, 240, 240);
    transition: all 400ms;
    cursor: pointer;
    margin: 0 10px;
  }

  div > button:hover{
    background-color: rgb(40, 40, 40);
    color: rgb(240, 240, 240);
  }
`
export const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  display: ${({ $showAlertModal }) => ($showAlertModal ? 'block' : 'none')};
`