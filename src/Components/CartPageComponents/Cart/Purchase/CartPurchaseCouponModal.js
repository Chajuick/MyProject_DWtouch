import * as MS from "../../../Modal/ModalStyle";

const CouponModalContainer = styled.div`
  display: flex;
  width: 700px;
  padding: 0 30px;
  flex-direction: column;
  align-items: center;
`;

const CouponModalHeader = styled.div`
  margin-top: 40px;
  width: 100%;
  margin-bottom: 20px;
  h3 {
    font-size: 18px;
    color: rgb(80, 80, 80);
  }
`;

const CouponList = styled.ul`
  list-style: none;
  width: 100%;
  border-top: 1px solid rgb(80, 80, 80);
  padding: 40px 30px;
  background-color: rgb(248, 245, 245);
  &>li {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
`;

const ProductInfos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const ProductName = styled.p`
  display: flex;
  justify-content: left;
  flex-direction: row;
  font-size: 15px;
  text-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
  color: rgb(40, 40, 40);
  p:first-child {
    margin-right: 5px;
  }
`;

const CouponSelectBar = styled.div`
  margin-top: 5px;
  width: 100%;
  padding: 10px;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(200, 200, 200);
  position: relative;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(80, 80, 80);
  transition: all 400ms;
  span.drop_down {
    padding: 4px;
    font-size: 10px;
    
  }
  &:hover {
    cursor: pointer;
    color: rgb(120, 120, 120);
  }
`;

const CouponOpionList = styled.ul`
  width: 100%;
  list-style: none;
  border: 1px solid rgb(150, 150, 150);
  overflow: hidden;
  position: absolute;
  max-height: ${props => props.$isShow? '2000px' : '0' };
  opacity: ${props => props.$isShow? 1 : 0 };
  transition: all 400ms;
  top: 45px;
  right: 0;
  z-index: 110000;
  li {
    width: 100%;
    font-size: 14px;
    color: rgb(120, 120, 120);
    padding: 10px;
    border-top: 1px solid rgb(200, 200, 200);
    background-color: rgb(250, 250, 250);
    transition: all 400ms;
    span {
      color: rgba(250, 50, 50, 0.8);
      font-size: 13px;
    }
  }
  li:first-child {
    border: none;
  }
  li.sel {
    color: rgb(40, 40, 40);
    text-shadow: 0 0 1px rgba(40, 40, 40, 0.5);
  }
  li:hover {
    color: rgb(80, 80, 80);
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 4px;
    span {
    }
  }
`;

const ProductPrice = styled.p`
  del {
    font-size: 12px;
    color: rgb(150, 150, 150);
  }
  span {
    margin-left: 8px;
    font-size: 14px;
    color: rgba(250, 50, 50, 1);
  }
`;

const [selectedCouponInfo, setSelectedCouponInfo] = useState([]);
const [usableCouponArr, setUsableCouponArr] = useState([]);
const [visibleCouponInfo, setVisibleCouponInfo] = useState(-1);
const [updatedPriceInfo, setUpdatedPriceInfo] = useState([]);

function handleToggleSelectBar(index) {
  if (visibleCouponInfo === index) {
    setVisibleCouponInfo(-1);
  } else {
    setVisibleCouponInfo(index);
  }
}

function updatePriceInfo() {
  // purchaseListInfo에 대한 가격 정보를 업데이트
  const updatedListInfo = purchaseListInfo.map(item => {
    const defaultPrice = item.cart_default_price || 0;
    const productQuantity = item.cart_product_quantity || 1;
    const saleInfo = item.cart_sale_info || 0;
    return {
      default_price: defaultPrice,
      final_price: parseInt(((defaultPrice * productQuantity) * ((100 - saleInfo) / 100)) / 10) * 10,
    };
  });
  // 업데이트된 정보를 상태로 설정
  setUpdatedPriceInfo(updatedListInfo);
}

useEffect(() => {
  updatePriceInfo();
}, [purchaseListInfo]);

function productCoupon(num) {
  // 주어진 num과 일치하는 행들
  const matchingRows = couponInfo.filter(item => item[0].coupons_product_category == num);
  // coupon_product_category가 1인 행들
  const categoryOneRows = couponInfo.filter(item => item[0].coupons_product_category == 1);
  // 두 결과를 합쳐서 리턴
  return matchingRows.concat(categoryOneRows);
}

useEffect(() => {
  // purchaseListInfo 배열에서 cart_product_name만 추출하여 새로운 배열 생성
  const productNames = purchaseInfo.map(item => item.cart_product_name);
  // 각각의 cart_product_name에 대해 productCoupon 함수 호출하여 결과 배열 생성
  const resultArray = productNames.map(productName => productCoupon(CategoryConvert(productName)));
  setUsableCouponArr(resultArray);
}, [purchaseListInfo, couponInfo]);

function calculateDiscountAmount(price, percent, amount) {
  let saleAmount = 0;
  if (percent > 0) {
    saleAmount = price - parseInt((price*((100 - percent)/100))/ 10)* 10;
    if (amount > 0) {
      saleAmount = Math.min(saleAmount, amount);
    } 
  } else if (amount > 0) {
    saleAmount = amount;
  }
  return saleAmount;
};

useEffect(() => {
  const zeroArray = new Array(purchaseListInfo.length).fill(-1);
  setSelectedCouponInfo(zeroArray);
}, [purchaseListInfo]);

function handleSelectCouponIndex(index, couponIndex) {
  // selectedCouponInfo 배열의 복사본을 만들어 수정
  const updatedselectedCouponInfo = [...selectedCouponInfo];
  // 주어진 index 위치의 값을 couponIndex로 업데이트
  updatedselectedCouponInfo[index] = couponIndex;
  // 업데이트된 배열을 상태로 설정
  setSelectedCouponInfo(updatedselectedCouponInfo);
}


export default function CartPurchaseCouponModal() {
  return (
    <>
    <MS.Overlay $showModal={showProductCouponModal}/>
      <MS.HeaderModal $showModal={showProductCouponModal}>
        <div className="modalHeader">
          <h2>쿠폰 변경</h2>
          <MS.HeaderModalCloseBtn onClick={() => setShowProductCouponModal(false)}>&times;</MS.HeaderModalCloseBtn>
        </div>
        <CouponModalContainer>
          <CouponModalHeader>
            <h3>상품할인</h3>
          </CouponModalHeader>
          <CouponList>
            {purchaseListInfo.map((item, index) => (
              <li key={index}>
                <ProductInfos>
                  <ProductName>
                  <p>{item.cart_product_name}</p>
                {item.cart_option.length > 0 && OptionConvert(item.cart_product_name, item.cart_option).map((optionItem, index) => (
                  <p key={index}>{index === 0 ? optionItem : "-" + optionItem}</p>
                ))
                }
                </ProductName>
                <ProductPrice>
                  <del>{updatedPriceInfo && updatedPriceInfo.length > 0 && (updatedPriceInfo[index].default_price).toLocaleString()}원</del>
                  <span>{updatedPriceInfo && updatedPriceInfo.length > 0 && (updatedPriceInfo[index].final_price).toLocaleString()}원</span>
                </ProductPrice>
                </ProductInfos>
                <CouponSelectBar onClick={() => handleToggleSelectBar(index)}>
                  {usableCouponArr && usableCouponArr.length > 0 && selectedCouponInfo && selectedCouponInfo.length > 0 && 
                  usableCouponArr[index] && usableCouponArr[index][selectedCouponInfo[index]] && 
                  usableCouponArr[index][selectedCouponInfo[index]][0] && selectedCouponInfo[index] !== -1? (
                    <>
                      <span>
                        [{usableCouponArr[index][selectedCouponInfo[index]][0].coupons_name}]&nbsp;
                        {usableCouponArr[index][selectedCouponInfo[index]][0].coupons_detail}
                      </span>
                      <span className="drop_down">
                        ▼
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        [기본할인] 멤버쉽등급 / 상품 기본 할인
                      </span>
                      <span className="drop_down">
                        ▼
                      </span>
                    </>
                  )}
                  {

                  }
                  <CouponOpionList $isShow={visibleCouponInfo === index}>
                    <li onClick={() => handleSelectCouponIndex(index, -1)}>
                      [기본할인] 멤버쉽등급 / 상품 기본 할인&nbsp;
                      <span>
                      -{calculateDiscountAmount(item.cart_default_price*item.cart_product_quantity, item.cart_sale_info, undefined).toLocaleString()}원
                      </span>
                    </li>
                  {usableCouponArr && usableCouponArr.length > 0 && selectedCouponInfo && selectedCouponInfo.length > 0 &&
                  usableCouponArr[index].map((couponItem, couponIndex) => (
                    <li key={couponIndex} onClick={() => handleSelectCouponIndex(index, couponIndex)}
                    className={selectedCouponInfo[index] == couponIndex? 'sel' : ''}
                    >
                    {couponItem && couponItem[0] && (
                      <>
                        [{couponItem[0].coupons_name}]&nbsp;{couponItem[0].coupons_detail}&nbsp;
                        <span>
                          -{calculateDiscountAmount(item.cart_default_price*item.cart_product_quantity, couponItem[0].coupons_discount_amount, couponItem[0].coupons_discount_limit).toLocaleString()}원
                        </span>
                      </>
                    )}
                    </li>
                  ))}
                  </CouponOpionList>
                </CouponSelectBar>
              </li>
            ))}
          </CouponList>
        </CouponModalContainer>
      </MS.HeaderModal>
    </>
  )
}