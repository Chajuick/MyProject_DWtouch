import { useEffect, useState } from 'react';
import MainBanner from '../Components/MainPageComponents/MainBanner';
import EventAria from '../Components/MainPageComponents/EventAria';
import GuideAria from '../Components/MainPageComponents/GuideAria';
import AdsBanner from '../Components/MainPageComponents/AdsBanner';
import BestGoodsAria from '../Components/MainPageComponents/BestGoodsAria';
import Footer from '../Components/CommonComponents/Footer';
import LoadingPage from './LoadingPage';
import Popup from '../Components/Popup/Popup';

import { MAIN_BANNERS } from "../data/mainbanners";
import { EVENTS } from "../data/events";

export default function IndexPage() {
  // 메인 배너
  const [banner, setBanner] = useState([]);
  const [isMainBannerLoading, setIsMainBannerLoading] = useState(false);

  // 이벤트
  const [eventsData, setEventsData] = useState([]);
  const [bigBox, setBigBox] = useState([]);
  const [smallBox, setSmallBox] = useState([]);
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    // ✅ 서버 호출 대신 상수 주입
    setBanner(MAIN_BANNERS);
    setIsMainBannerLoading(true);

    setEventsData(EVENTS);
    setMaxPage(EVENTS.length);
    setBigBox(EVENTS.filter(item => item.bigboxImg != null).map(item => item.bigboxImg));
    setSmallBox(EVENTS.filter(item => item.smallboxImg != null).map(item => item.smallboxImg));
    setIsEventLoading(true);
  }, []);

  // 팝업
  const [popup, setPopup] = useState(sessionStorage.getItem('popup') === "false" ? false : true);

  return (
    <>
      {isMainBannerLoading && isEventLoading && (
        <>
          {popup && <Popup setPopup={setPopup} />}
          <MainBanner banner={banner} isMainBannerLoading={isMainBannerLoading} />
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
      )}

      {(!isMainBannerLoading || !isEventLoading) && <LoadingPage />}
    </>
  );
}