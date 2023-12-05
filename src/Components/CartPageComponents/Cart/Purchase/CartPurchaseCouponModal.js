export default function CartPurchaseCouponModal({ showProductCouponModal, setShowProductCouponModal }) {
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