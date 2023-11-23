import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import ErrorDiv from "../ErrorDiv";

// 이미지 파일 경로
import EventSlideBoxPoster from '../../assets/events/events_poster.png';

// 키 프레임 정의
const slideInFromBottom = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(50%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100vw;
  height: 540px;
  background-color: rgb(250, 250, 250);
`;

const Box = styled.div`
  width: 1100px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.div`
  height: 80px;
  font-size: 30px;
  display: flex;
  align-items: end;
  color: rgb(90, 90, 90);
`;

const EventSlideBox = styled.div`
  position: relative;
  height: 100%;
`;

const PopupEventBox = styled.div`
  width: 300px;
  height: 230px;
  position: absolute;
  top: 0;
  left: 0px;
  animation: ${slideInFromBottom} 0.5s; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupEventImg = styled.div`
  width: 385px;
  height: 325px;
  position: absolute;
  top: 0;
  left: 300px;
  animation: ${slideInFromRight} 0.5s;
  display: flex;
  justify-content: center;
  align-items: center; 
`;

const EventRandomBigBox = styled.div`
  width: 440px;
  height: 205px;
  position: absolute;
  top: 405px;
  left: 0;
  z-index: 1;
  border-radius: 16px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EventRandomSmallBox = styled.div`
  width: 205px;
  height: 205px;
  position: absolute;
  top: 405px;
  left: 460px;
  z-index: 1;
  border-radius: 16px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  width: 300px;
  height: 95px;
  position: absolute;
  top: 230px;
  left: 0%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(250, 250, 250);
  z-index: 1;
`;

const SlideBar = styled.div`
  width: ${(props) => (385 / props.$maxPage)}px;
  height: 3px;
  background-color: ${(props) => (props.$index === props.$currentPage ? 'rgb(100, 100, 100)' : 'rgb(180, 180, 180)')};
  z-index: 1;
`;

const SlideController = styled.div`
  width: 95px;
  margin-left: 5px;
  margin-right: 10px;
  display: flex;
  justify-content: space between;
  color: rgb(100, 100, 100);
`;

const SliderL = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SliderR = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SliderStop = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
`;

const SlidePageNum = styled.div`
  width: 35px;
  text-align: left;
`;

const EventPoster = styled.div`
  width: 416px;
  height: 530px;
  position: absolute;
  top: 80px;
  right: 0;
  background-image: url(${EventSlideBoxPoster});
  background-size: cover;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
`;

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

export default function EventAria() {
  const [maxPage, setMaxPage] = useState(0);
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [bigBox, setBigBox] = useState([]);
  const [smallBox, setSmallBox] = useState([]);

  function eventsLoading() {
    // 서버의 API를 호출하여 데이터 가져오기
    fetch('http://localhost:3001/api/events') // 백엔드 서버 주소를 사용
    .then((response) => response.json())
    .then((data) => {
      setEventsData(data);
      setMaxPage(data.length);
      setBigBox(data.filter(item => item.bigboxImg !== null).map(item => item.bigboxImg));
      setSmallBox(data.filter(item => item.smallboxImg !== null).map(item => item.smallboxImg));
      setIsEventLoading(true);
    })
    .catch((error) => {
    });
  }

  useEffect(() => {
    eventsLoading();
  }, [isEventLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (maxPage > 0) {
        if (autoPlay) {
          setCurrentPage((currentPage + 1) % maxPage);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage, autoPlay, isEventLoading]);

  const handleSliderLClick = () => {
    setCurrentPage((currentPage - 1 + maxPage) % maxPage);
  };

  const handleSliderRClick = () => {
    setCurrentPage((currentPage + 1) % maxPage);
  };

  const handleSliderStopClick = () => {
    setAutoPlay(!autoPlay);
  };

  const [initialRandomBigBoxIndex, setInitialRandomBigBoxIndex] = useState(0);
  const [initialRandomSmallBoxIndex, setInitialRandomSmallBoxIndex] = useState(0);

  useEffect(() => {
    setInitialRandomBigBoxIndex(getRandomIndex(bigBox.length));
    setInitialRandomSmallBoxIndex(getRandomIndex(smallBox.length));
  }, [bigBox, smallBox]);



  return (
    <Container>
      <Box>
        <Title>이벤트</Title>
        <EventSlideBox>
          {eventsData && eventsData.length>0 && eventsData.map((item, index) => (
            <Link to="event/welcome" key={index}>
              <PopupEventBox
                style={{
                  display: currentPage === index ? 'block' : 'none',
                  backgroundImage: `url(${item.slideDetail})`,
                }}
              />
              <PopupEventImg
                style={{
                  display: currentPage === index ? 'block' : 'none',
                  backgroundImage: `url(${item.slideImg})`,
                }}
              />
            </Link>
          ))}
          {!isEventLoading &&
            <a>
              <PopupEventBox>
                <ErrorDiv wid="300px" hei="230px" isBck={false}/>
              </PopupEventBox>
              <PopupEventImg>
                <ErrorDiv wid="385px" hei="325px" isBck={false}/>
              </PopupEventImg>
            </a>
          }
          {isEventLoading &&
          <Slider>
            {Array.from({ length: maxPage }).map((_, index) => (
              <SlideBar key={index} $maxPage={maxPage} $currentPage={currentPage} $index={index} />
            ))}
            <SlideController>
              <SliderL onClick={handleSliderLClick}>
                <Icon icon="ic:round-expand-less" width="16" height="16" rotate={3} />
              </SliderL>
              <SliderR onClick={handleSliderRClick}>
                <Icon icon="ic:round-expand-less" width="16" height="16" rotate={1} />
              </SliderR>
              <SliderStop onClick={handleSliderStopClick}>
                {autoPlay ? (
                  <Icon icon="ic:round-pause" width="16" height="16" />
                ) : (
                  <Icon icon="mdi:play" width="16" height="16" />
                )}
              </SliderStop>
              <SlidePageNum>
                {currentPage + 1} / {maxPage}
              </SlidePageNum>
            </SlideController>
          </Slider>
          }
        </EventSlideBox>
        <Link to="event/welcome">
          {isEventLoading && bigBox.length > 0 && (
            <EventRandomBigBox style={{ backgroundImage: `url(${bigBox[initialRandomBigBoxIndex]})` }} />
          )}
          {!isEventLoading && 
            <EventRandomBigBox>
              <ErrorDiv wid="440px" hei="205px" isBck/>
            </EventRandomBigBox>
          }
        </Link>
        <Link to="event">
          {isEventLoading && smallBox.length > 0 && (
            <EventRandomSmallBox style={{ backgroundImage: `url(${smallBox[initialRandomSmallBoxIndex]})` }} />
          )}
          {!isEventLoading && 
            <EventRandomSmallBox>
              <ErrorDiv wid="205px" hei="205px" isBck/>
            </EventRandomSmallBox>
          }          
        </Link>
        <EventPoster />
      </Box>
    </Container>
  );
}