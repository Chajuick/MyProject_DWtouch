import styled from "styled-components";
import HeaderBar from '../../IndexPage/HeaderBar';
import NavBar from '../../IndexPage/NavBar';
import Footer from '../../IndexPage/Footer';
import { Icon } from '@iconify/react';

const Container = styled.div`
  width: 100vw;
  position: relative;
`

const Wrapper = styled.div`
  width: 1200px;
  margin: auto;
`

export default function PhotobookPurchase() {

  return (
    <>
      <HeaderBar />
      <NavBar />
      <Container>
        <Wrapper>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}
