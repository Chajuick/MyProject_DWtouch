import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SpringBck from '../../assets/ads/ads_banner_spring.png';
import SummerBck from '../../assets/ads/ads_banner_summer.png';
import FallBck from '../../assets/ads/ads_banner_fall.png';
import WinterBck from '../../assets/ads/ads_banner_winter.png';

const banners = [
  {
    bck: 'linear-gradient(270deg, rgba(191,194,255,1) 0%, rgba(255,199,232,1) 100%)',
    title: 'DW스튜디오 SPRING',
    detail_1: '향긋한 봄바람과 함께',
    detail_2: '새기는 우리의 기록',
    image: SpringBck,
    link: '',
  },
  {
    bck: 'linear-gradient(90deg, rgba(200,255,191,1) 0%, rgba(92,255,215,1) 34%, rgba(123,223,255,1) 100%)',
    title: 'DW스튜디오 SUMMER',
    detail_1: '무더위는 물러가라',
    detail_2: '우리들만의 티셔츠!',
    image: SummerBck,
    link: '',
  },
  {
    bck: 'linear-gradient(90deg, rgba(255,249,191,1) 0%, rgba(255,204,92,1) 34%, rgba(255,142,106,1) 100%)',
    title: 'DW스튜디오 FALL',
    detail_1: '지금, 가을감성을 새기는',
    detail_2: '나만의 앨범',
    image: FallBck,
    link: '',
  },
  {
    bck: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(247,212,174,1) 57%, rgba(255,106,106,1) 100%)',
    title: 'DW스튜디오 WINTER',
    detail_1: '오들오들 추위',
    detail_2: '내년을 준비하며 이겨내자',
    image: WinterBck,
    link: '',
  },
];

const Container = styled.div`
  width: 100vw;
  height: 400px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &>div {
    width: 100vw;
    height: 400px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  ul {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    li {
      width: 20px;
      height: 20px;
      background-color: rgba(40, 40, 40, 0.3);
      transition: all 400ms;
      border-radius: 50%;
      margin: 0 4px;
    }
    li:hover {
      cursor: pointer;
      background-color: rgba(40, 40, 40, 0.7);
    }
    li.sel {
      background-color: rgba(40, 40, 40, 0.5);
    }
  }
`;

const SlideBox = styled.div`
  position: absolute;
  top: 0;
  left: ${props => ((props.$index - props.$currentBox) * 100) + '%'};
  width: 100%;
  height: 100%;
  background: ${props => props.$background};
  background-size: cover;
  transition: all 800ms;
`;

const Box = styled.div`
  width: 1000px;
  height: 400px;
  margin: 0 auto;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    position: absolute;
    top: 260px;
    left: 0px;
    padding: 1rem 3.5rem;
    background-color: rgba(20, 20, 20, 0.2);
    color: rgb(240, 240, 240);
    text-decoration: none;
    font-size: 14px;
    transition: all 400ms;
  }
  a:hover {
    background-color: rgba(20, 20, 20, 0.4);
  }
`;

const Title = styled.h2`
  position: absolute;
  min-width: 1000px;
  width: 100%;
  font-size: 50px;
  top: 130px;
  left: 0px;
  font-size: 24px;
  color: rgb(35, 35, 35);
`;

const Detail = styled.div`
  position: absolute;
  min-width: 1000px;
  width: 100%;
  font-size: 18px;
  top: 180px;
  color: rgb(85, 85, 85);
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

export default function AdsBanner() {
  const [currentBox, setCurrentBox] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isMainBannerLoading, setIsMainBannerLoading] = useState(false);

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

  const handleFastMove = (index) => {
    if (!isCooldown) {
      setCurrentBox(index);
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

  return (
    <Container style={{ backgroundColor: !isMainBannerLoading ? '#EBEBEB' : 'inherit' }}>
      <Slide onClick={handlePrevBox} disabled={isCooldown}>
        &lt;
      </Slide>
      {banners.map((banner, index) => (
        <SlideBox
          key={index}
          $currentBox={currentBox}
          $index={index}
          $background={banner.bck}
        >
          <Box>
            <Title>{banner.title}</Title>
            <Detail>{banner.detail_1}<br />{banner.detail_2}</Detail>
            <Link to="/">바로가기</Link>
            <img src={banner.image} style={{ height: '400px' }} alt="Banner Image"/>
          </Box>
        </SlideBox>
      ))}
      <ul>
      {Array.from({ length: banners.length }, (_, index) => (
        <li key={index} className={index == currentBox? 'sel' : ''} onClick={() => handleFastMove(index)}></li>
      ))}
      </ul>
      <Slide onClick={handleNextBox} disabled={isCooldown}>
        &gt;
      </Slide>
    </Container>
  );
}
