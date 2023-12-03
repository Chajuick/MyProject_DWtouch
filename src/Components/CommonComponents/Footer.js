import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Container = styled.div`
  width: 100vw;
  position: relative;
  background-color: rgb(250, 250, 250);
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-bottom: 2rem;
  border-top: 1px solid rgb(190, 190, 190);
`;

const FooterBox = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Ui = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  ul li > a {
    color: rgb(100, 100, 100);
    text-decoration: none;
    font-size: 13px;
    margin-right: 1.5rem;
    transition: all 400ms;
  }

  ul a:hover {
    color: rgb(40, 40, 40);
    text-decoration-line: underline;
  }

  a {
    color: rgb(100, 100, 100);
    font-size: 24px;
    transition: all 400ms;
  }
`;

const CeoInfo = styled.span`
  margin-top: 1rem;
  color: rgb(100, 100, 100);
  font-size: 12px;
`;

const ChargeInfo = styled.span`
  margin-top: 0.5rem;
  color: rgb(100, 100, 100);
  font-size: 12px;

  a {
    color: rgb(100, 100, 100);
    text-decoration: none;
    padding: 0.2rem 0.4rem;
    font-size: 12px;
    margin-left: 1rem;
    background-color: rgb(240, 240, 240);
    border: 1px solid rgb(180, 180, 180);
    border-radius: 4px;
    transition: all 400ms;
  }

  a:hover {
    color: rgb(40, 40, 40);
    background-color: rgb(200, 200, 200);
    border: 1px solid rgb(120, 120, 120);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    color: rgb(100, 100, 100);
    text-decoration: none;
    font-size: 24px;
    margin-left: 1rem;
    transition: all 400ms;
  }
  
  a:hover {
    color: rgb(40, 40, 40);
  }
`;

export default function Footer() {
  return (
    <Container>
      <FooterBox>
        <Ui>
          <ul>
            <li><Link to="/dwstudio">회사소개</Link></li>
            <li><Link to="/privaypolicy">이용약관</Link></li>
            <li><Link to="/termsofuse"><b>개인정보처리방침</b></Link></li>
          </ul>
          <SocialLinks>
            <a href="#"><Icon icon="mdi:youtube" /></a>
            <a href="#"><Icon icon="jam:facebook" /></a>
            <a href="#"><Icon icon="ri:instagram-fill" /></a>
            <a href="#"><Icon icon="mdi:twitter" /></a>
          </SocialLinks>
        </Ui>
        <CeoInfo>㈜DW STUDIO 대표이사: 강예주 사업자등록번호: 123-45-67890 통신판매신고: 2023-대전-0000</CeoInfo>
        <ChargeInfo>
          개인정보관리책임자: 김정우 세종 가름로 238-3 호스팅 제공: DW 웹서비스 고객만족센터: 1234-5678
          <Link to="/service">1:1문의</Link>
        </ChargeInfo>
      </FooterBox>
    </Container>
  );
}
