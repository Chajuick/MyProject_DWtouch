import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import SaleBadge from '../../../assets/etc/sale.png'
import * as S from './ListPageStyle';

import Footer from "../../../Components/CommonComponents/Footer";
import LoadingPage from "../../LoadingPage";

export default function CalendarListPage() {
    const [calendarList, setCalendarList] = useState('');
    const [isCalendarLoading, setIsCalendarLoading] = useState(false);
  
    function listCalendarItems() {
      const categoryId = 2; // 달력 categoryId 설정
    
      fetch(`http://192.168.0.7:3001/api/products/list`, {
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
          setCalendarList(data.products);
          setIsCalendarLoading(true);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsCalendarLoading(false);
        });
    };

    useEffect(() => {
        listCalendarItems();
    }, [isCalendarLoading]);

    console.log(calendarList);

    return (
        <>
          {isCalendarLoading &&
            <>
              <S.Container>
                  <S.Wrapper>
                      <S.Title>달력</S.Title>
                      <S.ProductOverView>
                          {calendarList && calendarList.map((item, index) => (
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
                                  <img src={item.main_img} alt={item.product_name} />
                                </S.Figure>
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
          {!isCalendarLoading &&
            <LoadingPage />
          }
        </>
    )
};