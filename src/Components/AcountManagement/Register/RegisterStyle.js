import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.button`
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

export const Title = styled.h2`
  text-align: center;
  color: rgb(100, 100, 100);
  margin-bottom: 50px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 420px;
  padding-top: 20px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgb(200, 200, 200);
  & > p:first-child {
    font-size: 14px;
    width: 100px;
    position: relative;
  }
  & > p.must {
    font-weight: bold;
  }
  & > p.must::after {
    content: "*";
    color: #e5362c;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 5px; 
  }
  & div.phoneVerificationBox {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  & input.phonenumInput {
    width: 220px;
    padding: 8px 0 8px 8px;
    border: 1px solid rgb(150, 150, 150);
    border-radius: 5px;
  }
  & button.phoneVerificationSendBtn {
    padding: 8px;
    margin-left: 20px;
    background-color: rgb(20, 20, 20);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 400ms;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    &:hover {
      background-color: rgb(230, 230, 230);
      color: rgb(20, 20, 20);
    }
  }
  & input.phoneVerificationInput {
    width: 120px;
    margin: 10px 0 0 100px;
    padding: 8px 0 8px 8px;
    border: 1px solid rgb(150, 150, 150);
    border-radius: 5px;
  }
  & button.phoneVerificationCheckBtn {
    padding: 8px;
    margin: 10px 0 0 15px;
    background-color: rgb(20, 20, 20);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 400ms;
    &:hover {
      background-color: rgb(230, 230, 230);
      color: rgb(20, 20, 20);
    }
  }
  & div.verificationTimeOut {
    color: rgb(230, 40, 40);
    font-size: 13px;
    margin: 10px 0 0 10px;
  }
  & input.postCodeInput {
    width: 100px;
    padding: 8px 0 8px 8px;
    border: 1px solid rgb(150, 150, 150);
    border-radius: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  & button.postCodeSearchBtn {
    margin-left: 8px;
    padding: 5px 10px 5px 10px;
    padding: 8px;
    border: none;
    background-color: rgb(20, 20, 20);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 400ms;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    &:hover {
      background-color: rgb(230, 230, 230);
      color: rgb(20, 20, 20);
    }
  }
  & input.addressInput {
    width: 300px;
    margin-left: 100px;
    padding: 8px 0 8px 8px;
    border: 1px solid rgb(150, 150, 150);
    border-radius: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
`;

export const Input = styled.input`
  width: 220px;
  padding: 8px 0 8px 8px;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 5px;
  &:last-child {
    width: 300px;
  }
`;

export const GenderInput = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
  span {
    margin-left: 7px;
  }
  input[type="radio"]{
    vertical-align: middle;
    appearance: none;
    border: 2px solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    transition: box-shadow 400ms;
  }
  input[type="radio"]:checked {
    border: 0.3rem solid rgb(150, 200, 50);
  }
  input[type="radio"]:focus-visible {
    outline: max(2px, 0.1em) dotted rgb(150, 200, 50);
    outline-offset: max(2px, 0.1em);
  }
  input[type="radio"]:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }
  input[type="radio"]:hover + span {
    cursor: pointer;
  }
`;

export const FormButton = styled.button`
  margin-top: 40px;
  background-color: rgb(20, 20, 20);
  width: 420px;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 14px;
  cursor: pointer;
  transition: all 400ms;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(20, 20, 20);
  }
`;

export const CheckBtn = styled.button`
  padding: 8px;
  margin-left: 20px;
  background-color: rgb(20, 20, 20);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 400ms;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(20, 20, 20);
  }
`;

export const ErrMes = styled.p`
  margin-left: 100px;
  margin-top: 5px;
  width: 320px;
  font-size: 12px;
  color: rgb(255, 51, 51);
  display: ${({ $showErr }) => ($showErr ? 'block' : 'none')};
`;

