import HeaderBar from '../Components/IndexPage/HeaderBar';
import NavBar from '../Components/IndexPage/NavBar';
import MainBanner from '../Components/IndexPage/MainBanner';
import EventAria from '../Components/IndexPage/EventAria';
import GuideAria from '../Components/IndexPage/GuideAria';
import AdsBanner from '../Components/IndexPage/AdsBanner';
import BestGoodsAria from '../Components/IndexPage/BestGoodsAria';
import Footer from '../Components/IndexPage/Footer';

export default function Home() {
  return <>
    <HeaderBar />
    <NavBar />
    <MainBanner />
    <EventAria />
    <GuideAria />
    <AdsBanner />
    <BestGoodsAria />
    <Footer />
  </>
}