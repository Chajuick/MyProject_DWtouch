import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 라우트 경로
import Home from './page/Home';
import Mypage from './page/Mypage';
import Service from './page/Service';
import Coupon from './page/Coupon';
import EventWelcome from './page/EventWelcome';
import Event from './page/Event';
import PrivacyPolicy from './page/PrivacyPolicy';
import TermsOfUse from './page/TermsOfUse';
import CompanyIntro from './page/CompanyIntro';
import ProductList from './Components/ProductPage/ProductNavBar';
import PhotobookList from './Components/ProductPage/Photobook/PhotobookList';
import PhotobookOverviewPage from './Components/ProductPage/Photobook/PhotobookOverviewPage';
import PhotobookDesignPage from './Components/ProductPage/Photobook/PhotobookDesignPage';


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Pretendard-Regular; 
  }
  body {
    width: 100%;
    height: 100%;
  }
`

export default function App() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<Mypage />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/service" element={<Service />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/welcome" element={<EventWelcome />} />
          <Route path="/dwstudio" element={<CompanyIntro />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/privaypolicy" element={<PrivacyPolicy />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/productlist/photobook" element={<PhotobookList />} />
          <Route path="/productlist/photobook/photobook" element={<PhotobookOverviewPage />} />
          <Route path="/productlist/photobook/photobook/design" element={<PhotobookDesignPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
