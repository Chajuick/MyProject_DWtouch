import { useEffect, useState } from 'react';
import MainBanner from '../Components/MainPageComponents/MainBanner';
import EventAria from '../Components/MainPageComponents/EventAria';
import GuideAria from '../Components/MainPageComponents/GuideAria';
import AdsBanner from '../Components/MainPageComponents/AdsBanner';
import BestGoodsAria from '../Components/MainPageComponents/BestGoodsAria';
import Footer from '../Components/CommonComponents/Footer';
import LoadingPage from './LoadingPage';
import Popup from '../Components/Popup/Popup';

export default function IndexPage( ) {
  
  // 메인 배너
  const [banner, setBanner] = useState([]);
  const [isMainBannerLoading, setIsMainBannerLoading] = useState(false);

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
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isMainBannerLoading) {
        mainBannerLoading();
      }
    }, 400);
    // 컴포넌트가 unmount 될 때 clearInterval을 통해 interval을 정리합니다.
    return () => clearInterval(intervalId);
  }, [isMainBannerLoading]);

  // 이벤트
  const [eventsData, setEventsData] = useState([]);
  const [bigBox, setBigBox] = useState([]);
  const [smallBox, setSmallBox] = useState([]);
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(0);

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
      setIsEventLoading(false);
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isEventLoading) {
        eventsLoading();
      }
    }, 400);
    // 컴포넌트가 unmount 될 때 clearInterval을 통해 interval을 정리합니다.
    return () => clearInterval(intervalId);
  }, [isEventLoading]);

  // 팝업
  const [popup, setPopup] = useState(sessionStorage.getItem('popup') === "false"? false : true);

  return (
  <>
    {isMainBannerLoading && isEventLoading &&
      <>
        {popup &&
          <Popup setPopup={setPopup}/>
        }
        <MainBanner 
          banner={banner}
          isMainBannerLoading={isMainBannerLoading}
        />
        <EventAria 
          maxPage={maxPage}
          isEventLoading={isEventLoading}
          bigBox={bigBox}
          smallBox={smallBox}
          eventsData={eventsData}
        />
        <GuideAria />
        <AdsBanner />
        <BestGoodsAria />
        <Footer />
      </>
    }
    {(!isMainBannerLoading || !isEventLoading) &&
      <LoadingPage />
    }
  </>
)}