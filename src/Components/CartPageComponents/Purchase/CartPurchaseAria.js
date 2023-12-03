import styled from "styled-components";
import PurchaseAria from "./PurchaseAria";
import PurchaseInfo from "./PurchaseInfo";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 1100px;
  margin: 100px auto 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

export default function CartPurchaseAria({ purchaseListInfo }) {
  const [purchasePriceInfo, setPurchasePriceInfo] = useState([]);
  const [totalPriceInfo, setTotalPriceInfo] = useState({
    defaultPrice: 0,
    price: 0,
    saleAmount: 0,
  });

  useEffect(() => {
    const updatedPurchaseInfo = purchaseListInfo.map((item, index) => ({
      cart_default_price: (parseInt(item.cart_price/((100-item.cart_sale_info)/100) / 10) * 10)*item.cart_product_quantity,
      cart_price: item.cart_price*item.cart_product_quantity,
      cart_sale_amount: ((parseInt(item.cart_price/((100-item.cart_sale_info)/100) / 10) * 10) - item.cart_price)*item.cart_product_quantity,
      cart_saie_info: item.cart_sale_info,
    }));

    // 합 구하기
    const totalCartDefaultPrice = updatedPurchaseInfo.reduce((total, item) => total + item.cart_default_price, 0);
    const totalCartPrice = updatedPurchaseInfo.reduce((total, item) => total + item.cart_price, 0);
    const totalSaleAmount = updatedPurchaseInfo.reduce((total, item) => total + item.cart_sale_amount, 0);

    setTotalPriceInfo({
      defaultPrice: totalCartDefaultPrice,
      price: totalCartPrice,
      saleAmount: totalSaleAmount,
    })
    setPurchasePriceInfo(updatedPurchaseInfo);
  }, [purchaseListInfo]);

  console.log(purchaseListInfo);

  return (
    <>
      <Container>
        <PurchaseInfo 
          totalPriceInfo={totalPriceInfo}
          setTotalPriceInfo={setTotalPriceInfo}
          purchasePriceInfo={purchasePriceInfo}
          setPurchasePriceInfo={setPurchasePriceInfo}
          purchaseListInfo={purchaseListInfo}  
        />
        <PurchaseAria />
      </Container>
    </>
  );
};