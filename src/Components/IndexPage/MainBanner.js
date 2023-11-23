import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ErrorDiv from "../ErrorDiv";

const Container = styled.div`
  width: 100vw;
  height: 560px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &>div {
    width: 100vw;
    height: 560px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
`;

const SlideBox = styled.div`
  position: absolute;
  top: 0;
  left: ${props => {
    if (props.$display) return '0';
    const difference = props.$index - props.$currentBox;
    if (difference === 0) return '0';
    if (difference === 1 || difference === -3) return '100%';
    if (difference === -1 || difference === 3) return '-100%';
    if (difference === 2 || difference === -2) return '200%';
  }};
  width: 100%;
  height: 100%;
  background: ${props => props.$background};
  background-size: cover;
  transition: all 800ms;
  z-index: ${props => {
    if (props.$display) return 3; // 현재 화면에 표시되는 슬라이드
    if (props.$index === props.$currentBox) return 2; // 다음에 나올 슬라이드
    return 1; // 나머지 슬라이드
  }};
`;

const Box = styled.div`
  width: 1200px;
  height: 560px;
  margin: 0 auto;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content:right;
  align-items: center;
  a {
    position: absolute;
    top: 330px;
    left: 0px;
    padding: 1rem 3.5rem;
    background-color: ${props => (props.$thema === 1 ? 'rgba(230, 230, 230, 0.6)' : 'rgba(40, 40, 40, 0.6)')};
    color: ${props => (props.$thema === 1 ? 'rgb(40, 40, 40)' : 'rgb(230, 230, 230)')};
    text-decoration: none;
    font-size: 14px;
    transition: all 400ms;
  }
  a:hover {
    background-color: ${props => (props.$thema === 1 ? 'rgba(230, 230, 230, 0)' : 'rgba(40, 40, 40, 0)')};
    color: ${props => (props.$thema === 1 ? 'rgb(200, 200, 200)' : 'rgb(70, 70, 70)')};
  }
  img {
    left: -120px;
    width: 1320px;
  }
`;

const Title = styled.h2`
  position: absolute;
  min-width: 1200px;
  width: 100%;
  font-size: 42px;
  top: 160px;
  left: 0px;
  color: ${props => (props.$thema === 1 ? 'rgb(230, 230, 230)' : 'rgb(40, 40, 40)')};
`;

const Detail = styled.div`
  position: absolute;
  min-width: 1200px;
  width: 100%;
  font-size: 16px;
  top: 250px;
  color: ${props => (props.$thema === 1 ? 'rgb(200, 200, 200)' : 'rgb(70, 70, 70)')};
`;

const Slide = styled.button`
  font-family: 'omyu_pretty';
  font-size: 40px;
  border-radius: 50%;
  color: rgba(65, 65, 65, 0.5);
  border: none;
  background-color: rgba(255, 255, 255, 0);
  transition: all 400ms;
  padding: 0.2rem 1.2rem;
  z-index: 5;
  &:hover {
    color: rgba(65, 65, 65, 1);
    cursor: pointer;
  }
`;

export default function MainBanner() {
  const [currentBox, setCurrentBox] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const [banner, setBanner] = useState([]);
  const [isMainBannerLoading, setIsMainBannerLoading] = useState(false);
  const isBck = true;

  const handleNextBox = () => {
    if (!isCooldown) {
      setCurrentBox(prevCurrentBox => (prevCurrentBox === 3 ? 0 : prevCurrentBox + 1));
      setIsCooldown(true);

      setTimeout(() => {
        setIsCooldown(false);
      }, 600);
    }
  };

  const handlePrevBox = () => {
    if (!isCooldown) {
      setCurrentBox(prevCurrentBox => (prevCurrentBox === 0 ? 3 : prevCurrentBox - 1));
      setIsCooldown(true);

      setTimeout(() => {
        setIsCooldown(false);
      }, 600);
    }
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCooldown) {
        setCurrentBox(prevCurrentBox => (prevCurrentBox === 3 ? 0 : prevCurrentBox + 1));
        setIsCooldown(true);

        setTimeout(() => {
          setIsCooldown(false);
        }, 600);
      }
    }, 5000);

    // 컴포넌트가 언마운트되면 interval 해제
    return () => clearInterval(interval);
  }, [isCooldown]);

  function mainBannerLoading() {
    // 서버의 API를 호출하여 데이터 가져오기
    fetch('http://localhost:3001/api/mainbanners') // 백엔드 서버 주소를 사용
    .then((response) => response.json())
    .then((data) => {
      setBanner(data);
      setIsMainBannerLoading(true);
    })
    .catch((error) => {
      setIsMainBannerLoading(false);
    });
  }

  useEffect(() => {
    mainBannerLoading();
  }, [isMainBannerLoading]);

  return (
    <Container style={{ backgroundColor: !isMainBannerLoading ? '#EBEBEB' : 'inherit' }}>
      <Slide onClick={handlePrevBox} disabled={isCooldown}>
        &lt;
      </Slide>
      {!isMainBannerLoading &&
        <ErrorDiv wid="1200px" hei="560px" isBck/>
      }
      {isMainBannerLoading && banner.map((banner, index) => (
        <div  key={index}>
          <SlideBox
            $display={currentBox === index}
            $currentBox={currentBox}
            $index={index}
            $background={banner.bck}
            $thema={banner.style}
          >
            <Box $thema={banner.style}>
              <Title $thema={banner.style}>{banner.title}</Title>
              <Detail $thema={banner.style}>{banner.detail_1}<br />{banner.detail_2}</Detail>
              <Link to="/" >바로가기</Link>
              <img src={banner.image} />
            </Box>
          </SlideBox>
        </div>
      ))}
      <Slide onClick={handleNextBox} disabled={isCooldown}>
        &gt;
      </Slide>
    </Container>
  );
}
