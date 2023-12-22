import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import Footer from "../../../CommonComponents/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  padding: 200px 0;
  &>div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 20%;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 50px;
      h3 {
        font-size: 32px;
        padding: 20px;
        color: rgb(40, 40, 40);
      }
      p {
        font-size: 15px;
        color: rgb(100, 100, 100);
        width: 100%;
        border-bottom: 1px solid rgb(80, 80, 80);
        padding-bottom: 20px;
      }
      span {
        margin-top: 30px;
        font-size: 13px;
        color: rgb(150, 150, 150);
      }
    }
  }

  button {
    margin-top: 50px;
    margin-bottom: 100px;
    padding: 15px 25px;
    background-color: rgb(40, 40, 40);
    color: rgb(250, 250, 250);
    border: 1px solid rgb(40, 40, 40);
    transition: all 400ms;
  }
  button:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    color: rgb(40, 40, 40);
  }
`;

export default function CartErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div>
          <div>
            <h3>주문에 실패했습니다</h3>
            <p>고객센터 번호 : 1234-5678</p>
            <span>지속적인 오류 발생 시 고객센터로 문의 부탁드립니다.</span>
          </div>
        </div>
        <button onClick={() => navigate('/')}>홈으로</button>
      </Container>
      <Footer />
    </>
  )
}