import styled from "styled-components";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  padding: 18px;
  border-top: 1px solid rgb(220, 220, 220);
  border-bottom: 1px solid rgb(220, 220, 220);
  background-color: rgb(255, 255, 255);
`;

const Wrapper = styled.ul`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: left;
  list-style: none;
  li {
    color: rgb(150, 150, 150);
    display: flex;
    align-items: center;
    margin-right: 30px;
    font-size: 16px;
    transition: all 400ms;
    
  }
  li.sel {
    color: rgb(80, 80, 80);
    text-decoration: underline;
  }
  li:hover {
    color: rgb(100, 100, 100);
    cursor: pointer;
  } 
`;

const list = ["옵션선택", "상품소개", "상세정보", "리뷰"];

export default function ProductNavBar({ navGuider }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selAria, setSelAria] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY || document.documentElement.scrollTop;
      setScrollPosition(currentPosition);
  
      if (currentPosition <= navGuider[1]) {
        setSelAria(0);
      } else if (currentPosition > navGuider[1] && currentPosition <= navGuider[2]) {
        setSelAria(1);
      } else if (currentPosition > navGuider[2] && currentPosition <= navGuider[3]) {
        setSelAria(2);
      } else {
        setSelAria(3);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = (index) => {
    window.scrollTo({
      top: navGuider[index],
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Container>
        <Wrapper>
        {list.map((item, index) => (
          <li key={index} className={selAria == index ? 'sel' : '' } onClick={() => handleButtonClick(index)}>{item}</li>
        ))}
        </Wrapper>
      </Container>
    </>
  );
}
