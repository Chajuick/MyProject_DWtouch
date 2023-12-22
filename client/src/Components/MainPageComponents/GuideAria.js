import styled, { keyframes } from "styled-components";
import { Icon } from '@iconify/react';

// 색깔 상수 정의
const blueColor = 'rgb(80, 80, 80)';
const secondaryColor = 'rgb(80, 80, 80)';
const redColor = '#ED4747';

const selectAnimation = keyframes`
  0% {
    transform: scale(100%);
  }
  30%, 60% {
    transform: scale(120%);
  }
  100% {
    transform: scale(140%);
  }
`;

const addAnimation = keyframes`
  0%, 100% {
    top: 25%;
    opacity: 1;
  }
  10% {
    top: 28%;
    opacity: 1;
  }
  30% {
    top: -100%;
    opacity: 1;
  }
  35% {
    top: -100%;
    opacity: 0;
  }
  45% {
    top: 100%;
    opacity: 0;
  }
  80% {
    top: 200%;
    opacity: 0;
  }
`;

const saveAnimation = keyframes`
  0% {
    opacity: 0;
    top: -30%;
  }
  1% {
    opacity: 1;
    top: -100%;
  }
  30% {
    opacity: 1;
    top: 30%;
  }
  31% {
    opacity: 0;
    top: 30%;
  }
  32% {
    opacity: 0;
    top: -30%;
  }
  33% {
    opacity: 1;
    top: -30%;
  }
  45% {
    opacity: 1;
    top: 30%;
  }
  46% {
    opacity: 0;
    top: 30%;
  }
  47% {
    opacity: 0;
    top: -30%;
  }
  48% {
    opacity: 1;
    top: -30%;
  }
  58% {
    opacity: 1;
    top: 30%;
  }
  59% {
    opacity: 0;
    top: 30%;
  }
  60% {
    opacity: 0;
    top: -30%;
  }
  61% {
    opacity: 1;
    top: -30%;
  }
  66% {
    opacity: 1;
    top: 30%;
  }
  67% {
    opacity: 0;
    top: 30%;
  }
  68% {
    opacity: 0;
    top: -30%;
  }
  69% {
    opacity: 1;
    top: -30%;
  }
`;

const deliveryAnimation = keyframes`
  0% {
    left: 25%;
  }
  20% {
    left: 20%;
  }
  100% {
    left: 400%;
  }
`;

const Container = styled.div`
  width: 100vw;
  background-color: rgba(240, 240, 240, 0.8);
  position: relative;
  bottom: 0;
  left: 0;
  z-index: 0;
`;

const GuideBox = styled.div`
  width: 1150px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 100px 0 100px 0;
`;

const Title = styled.h2`
  width: 206px;
  font-size: 13px;
  font-weight: 400;
  background-color: rgb(80, 80, 80);
  border: 1px solid rgb(80, 80, 80);
  color: rgb(250, 250, 250);
  padding: 8px 10px;
  border-radius: 12px;
  text-align: center;
  transition: all 400ms;
  &:hover {
    background: none;
    color: rgb(80, 80, 80);
  }
`;

const GuideUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

const GuideLi = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`;

const GuideIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: ${blueColor};
  background-color: rgba(250, 250, 250);
  border-radius: 50%;
  transition: all 400ms;
  overflow: hidden;
  position: relative;
  &:hover {
    background-color: rgb(80, 80, 80);
    svg {
      color: rgb(250, 250, 250);
    }
  }
  &.select:hover {
    svg {
      animation: ${selectAnimation} 1000ms linear forwards;
    }
  }
  &.add:hover {
    svg {
      animation: ${addAnimation} 800ms linear forwards;
    }
  }
  &.save:hover {
    svg:nth-child(2) {
      animation: ${saveAnimation} 2000ms linear forwards;
    }
  }
  &.delivery:hover {
    svg {
      animation: ${deliveryAnimation} 1600ms linear forwards;
    }
  }
  svg {
    transition: all 400ms;
    position: absolute;
    top: 25%;
    left: 25%;
  }
  &.save {
    svg:nth-child(2) {
      top: -30%;
      left: 38%;
      opacity: 0;
    }
  }
`;

const GuideText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 25px;
`;

const GuideH = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${secondaryColor};
  margin-bottom: 10px;
`;

const GuideDetail = styled.p`
  font-size: 13px;
  color: ${secondaryColor};
  line-height: 1.5;
`;

export default function GuideAria() {
  return (
    <Container>
      <GuideBox>
        <Title>한눈에 알아보는 나만의 굿즈 제작법</Title>
        <GuideUl>
          <GuideLi>
            <GuideIcon className="select"><Icon icon="fluent:select-all-on-24-filled" /></GuideIcon>
            <GuideText>
              <GuideH>01. 상품 선택</GuideH>
              <GuideDetail>만들고 싶은 상품을<br />선택해주세요.</GuideDetail>
            </GuideText>
          </GuideLi>
          <GuideLi>
            <GuideIcon className="add"><Icon icon="solar:gallery-send-bold" /></GuideIcon>
            <GuideText>
              <GuideH>02. 사진 추가</GuideH>
              <GuideDetail>사진을 추가하고<br />마음꾸며주세요.</GuideDetail>
            </GuideText>
          </GuideLi>
          <GuideLi>
            <GuideIcon className="save">
              <Icon icon="mdi:cart" />
              <Icon icon="material-symbols-light:box" width="20px" height="20px"/>
            </GuideIcon>
            <GuideText>
              <GuideH>03. 장바구니 저장</GuideH>
              <GuideDetail>장바구니에 저장 후<br />구매하면!</GuideDetail>
            </GuideText>
          </GuideLi>
          <GuideLi>
            <GuideIcon className="delivery"><Icon icon="icomoon-free:truck" /></GuideIcon>
            <GuideText>
              <GuideH>04. 배송</GuideH>
              <GuideDetail>나만의 굿즈 배송!!<br /></GuideDetail>
              <GuideDetail style={{ color: redColor, fontWeight: "bold" }}>5만원 이상 구매시 배송비 무료</GuideDetail>
            </GuideText>
          </GuideLi>
        </GuideUl>
      </GuideBox>
    </Container>
  );
}
