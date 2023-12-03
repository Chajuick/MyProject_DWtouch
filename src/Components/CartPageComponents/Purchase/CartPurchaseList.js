import styled from "styled-components";
import { Icon } from '@iconify/react';
import { OptionConvert } from "../OptionConverter";
import { useState, useEffect } from "react";
import React from "react";

const Container = styled.div`
  width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ControlBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 1100px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 12px 0;
    background-color: rgb(245, 245, 245);
  }
  div:nth-child(1) {
    width: calc( 51% );
  }
  div:nth-child(2) {
    width: calc( 10% );
  }
  div:nth-child(3) {
    width: calc( 13% );
  }
  div:nth-child(4) {
    width: calc( 13% );
  }
  div:nth-child(5) {
    width: calc( 13% );
  }
`;

const ProdcutList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderInfo = styled.div`
  width: calc( 51% );
  display: flex;
  flex-direction: row;
  align-items: center;
  &>figure {
    width: 150px;
    height: 150px;
    background-color: rgb(240, 240, 240);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
      height: 50%;
      filter: drop-shadow(4px 4px 4px rgba(40, 40, 40, 0.4));
    }
  }
`;

const CartProductInfo = styled.div`
  width: 1100px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 30px 0;
  margin-bottom: 100px;
  &>p{
    width: calc( 13% );
    text-align: center;
    font-size: 14px;
    color: rgb(80, 80, 80);
  }
  border-bottom: 1px solid rgb(230, 230, 230);
`;

const ProductInfo = styled.div`
  margin-left: 20px;
  color: rgb(40, 40, 40);
  h2 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    color: rgb(80, 80, 80);
  }
  p {
    font-size: 13px;
  }
  div {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
`;

const PriceInfo = styled.div`
  width: calc( 13% );
  text-align: center;
  font-size: 14px;
  color: rgb(120, 120, 120);
`;

const ProductQuantity = styled.div`
  width: calc( 10% );
  text-align: center;
  font-size: 14px;
  color: rgb(120, 120, 120);
`;

const ProductSaleInfo = styled.div`
  width: calc( 13% );
  text-align: center;
  font-size: 14px;
  color: rgba(250, 50, 50, 0.8);
`;

export default function CartPurchasList({ purchaseListInfo }) {

  return (
    <>
      <Container>
        <ControlBar>
          <div>주문 상품 정보</div>
          <div>수량</div>
          <div>상품금액</div>
          <div>할인률</div>
          <div>구매예정가</div>
        </ControlBar>
        <ProdcutList>
        {purchaseListInfo && purchaseListInfo.length > 0 && purchaseListInfo.map((item, index) => (
              <ProductListContainer key={index}>
                <CartProductInfo>
                  <OrderInfo>
                    <figure>
                        <img src={item.cart_thumbnail} alt={item.cart_product_name} />
                    </figure>
                    <ProductInfo>
                      <h2>{item.cart_product_name}</h2>
                      <div>
                        {OptionConvert(item.cart_product_name, item.cart_option).map((item, index) => (
                          <p key={index}>{index === 0? item : "-" +item}</p>
                        ))}
                      </div>
                      <h3>프로젝트명 : {item.cart_name}</h3>
                    </ProductInfo>
                  </OrderInfo>
                  <ProductQuantity>
                      {item.cart_product_quantity}개
                  </ProductQuantity>
                  <PriceInfo>
                    <span>{item.cart_price.toLocaleString()}원</span>
                  </PriceInfo>
                  <ProductSaleInfo>
                      {item.cart_sale_info}%
                  </ProductSaleInfo>
                  <p>{parseInt(item.cart_price*item.cart_product_quantity).toLocaleString()}원</p>
                </CartProductInfo>
              </ProductListContainer>
          ))}
        </ProdcutList>
      </Container>
    </>
  );
};