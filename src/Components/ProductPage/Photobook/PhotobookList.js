import styled from "styled-components";
import HeaderBar from '../../IndexPage/HeaderBar';
import NavBar from '../../IndexPage/NavBar';
import Footer from '../../IndexPage/Footer';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  position: relative;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  padding: 80px 0;
`;

const Wrapper = styled.div`
  width: 1150px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductOverView = styled.ul`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-items: top;
  list-style: none;
  padding-bottom: 150px;
  li {
    width: calc( 100% / 3 - 10px );
    position: relative;
    padding: 0 15px;
    a {
      text-decoration: none;
    }
    div {
      width: 100%;
      aspect-ratio: 1 / 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(220, 220, 210, 0.2);
      box-shadow: 5px 5px 5px 5px rgba(40, 40, 40, 0);
      transition: all 600ms;
      img {
        width: 70%;
        object-fit: cover;
      }
    }
    p:nth-child(2) {
      color: rgb(80, 80, 80);
      margin-top: 30px;
      font-size: 20px;
    }
    p:nth-child(3) {
      color: rgb(120, 120, 120);
      margin-top: 10px;
      font-size: 15px;
    }
    p:nth-child(4) {
      color: rgb(120, 120, 120);
      font-size: 15px;
    }
  }
  li:hover {
    cursor: pointer;
    p:nth-child(2) {
      text-decoration: underline;
    }
    div {
        object-fit: cover;
        box-shadow: 3px 3px 10px rgba(40, 40, 40, 0.3);
    }
  }
`;

export default function PhotobookList() {
  const [photobookList, setPhotobookList] = useState('');
  const [isPhotobookLoading, setIsPhotobookLoading] = useState(false);

  function listPhotobookItems() {
    const categoryId = 1; // 포토북 categoryId 설정
  
    fetch(`http://localhost:3001/api/products/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // 서버에서 받아온 데이터 처리
        setPhotobookList(data.products);
        setIsPhotobookLoading(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsPhotobookLoading(false);
      });
  }

  useEffect(() => {
    listPhotobookItems();
  }, [isPhotobookLoading]);

  return (
    <>
      <HeaderBar />
      <NavBar />
      <Container>
        <Wrapper>
          <Title>포토북</Title>
          <ProductOverView>
            {photobookList && photobookList.map((item, index) => (
              <li key={index}>
                <Link to={`${item.link}`}>
                  <div>
                    <img src={item.main_image} alt={item.product_name} />
                  </div>
                  <p>{item.product_name}</p>
                  <p>{item.description_first}</p>
                  <p>{item.description_second}</p>
                </Link>
              </li>
            ))}
          </ProductOverView>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}
