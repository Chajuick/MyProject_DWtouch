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
  h2 {
    position: absolute;
    width: 100%;
    top: 14px;
    left: 0;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: rgb(80, 80, 80);
  }
`;

export const HeaderModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 250, 250);
  border-radius: 5px;
  z-index: 1002;
  display: ${({ $showModal }) => ($showModal ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  &>div.modalHeader {
    width: 100%;
    padding: 12px;
    background-color: rgb(40, 40, 40);
    position: relative;
    display: flex;
    justify-content: right;
    align-items: center;
    h2 {
      position: absolute;
      text-align: center;
      width: 50%;
      font-weight: 600;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 19px;
      color: rgb(250, 250, 250);
    }
  }
`;

export const HeaderModalCloseBtn = styled.button`
  margin-right: 5px;
  background: none;
  border: none;
  font-size: 20px;
  transition: all 400ms;
  color: rgb(250, 250, 250);
  &:hover {
    cursor: pointer;
    color: rgb(150, 150, 150);
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
  z-index: 1001;
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
  h2.showPhoneNumber {
    font-size: 18px;
    border: none;
    color: rgb(250, 50, 50);
  }
  p {
    text-align: center;
    font-size: 15px;
    line-height: 1.3;
    margin-top: 20px;
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