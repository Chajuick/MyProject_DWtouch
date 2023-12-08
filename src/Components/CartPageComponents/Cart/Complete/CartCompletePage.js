import styled from "styled-components"
import Green from "../../../../assets/etc/congrate_green.png";
import Blue from "../../../../assets/etc/congrate_blue.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
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

export default function CartCompletePage({ navigate }) {
  const orderNum = sessionStorage.getItem('order_id') || 0;

  return (
    <>
      <Container>
        <div>
          <img src={Green} alt="콩떡이" />
          <div>
            <h3>주문이 완료되었습니다.</h3>
            <p>주문번호 : {orderNum}</p>
            <span>배송일은 영업일 기준 1~3일 정도 소요됩니다.</span>
          </div>
          <img src={Blue} alt="꿀떡이" />
        </div>
        <button onClick={() => navigate('/')}>홈으로</button>
      </Container>
    </>
  )
}