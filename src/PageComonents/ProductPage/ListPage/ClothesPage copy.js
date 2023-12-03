import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import SaleBadge from '../../../assets/etc/sale.png'
import * as S from './ListPageStyle';

import HeaderBar from "../../../Components/CommonComponents/HeaderBar";
import NavBar from "../../../Components/CommonComponents/NavBar";
import Footer from "../../../Components/CommonComponents/Footer";
import LoadingPage from "../../LoadingPage";

export default function ClothesListPage() {
    const [clothesList, setClothesList] = useState('');
    const [isClothesLoading, setIsClothesLoading] = useState(false);
  
    function listClothesItems() {
      const categoryId = 4; // 의류 categoryId 설정
    
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
          setClothesList(data.products);
          setIsClothesLoading(true);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsClothesLoading(false);
        });
    };

    useEffect(() => {
        listClothesItems();
    }, [isClothesLoading]);

    return (
        <>
          {isClothesLoading &&
            <>
              <HeaderBar />
              <NavBar />
              <S.Container>
                  <S.Wrapper>
                      <S.Title>패션의류</S.Title>
                      <S.ProductOverView>
                          {clothesList && clothesList.map((item, index) => (
                          <li key={index}>
                              <Link to={`${item.link}`}>
                                <S.AdditionalInfo>
                                {item.sale > 0 &&
                                <>
                                  <img src={SaleBadge} alt="세일중" className="sale"/>
                                </>
                                }
                                </S.AdditionalInfo>
                                <S.Figure>
                                    <img src={item.main_image} alt={item.product_name} />
                                </S.Figure>
                                <S.ColorViewr>
                                {item.option.map((item, index) => (
                                  <S.ColorList key={index} $color={item}></S.ColorList>
                                ))}
                                </S.ColorViewr>
                                <S.ProductName className="name">{item.product_name}</S.ProductName>
                                <S.ProductDetail>{item.description_first}</S.ProductDetail>
                                <S.ProductDetail>{item.description_second}</S.ProductDetail>
                                {item.sale > 0  &&
                                <S.Price>
                                  <del>{item.price.toLocaleString()}</del>
                                  <span className="red">{S.priceCalculate(item.price, item.sale).toLocaleString()}원~</span>
                                </S.Price>
                                }
                                {item.sale < 1  &&
                                <S.Price>
                                  <span>{item.price.toLocaleString()}원~</span>
                                </S.Price>
                                }
                              </Link>
                          </li>
                          ))}
                      </S.ProductOverView>
                  </S.Wrapper>
              </S.Container>
              <Footer />
            </>
          }
          {!isClothesLoading &&
            <LoadingPage />
          }
        </>
    )
};