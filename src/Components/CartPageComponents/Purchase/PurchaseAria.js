import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: calc(28%);
  background-color: red;
`;

const PurchaseBox = styled.div`
  /* 스타일을 추가하세요 */
`;

const SumPrice = styled.div`
  /* 스타일을 추가하세요 */
`;

const Terms = styled.div`
  /* 스타일을 추가하세요 */
`;

const TermsMain = styled.div`
  /* 스타일을 추가하세요 */
`;

const TermsDetail = styled.div`
  /* 스타일을 추가하세요 */
`;

const PurchaseBtn = styled.button`
  /* 스타일을 추가하세요 */
`;

export default function PurchaseAria() {
  const [termPersonal, setTermPersonal] = useState(false);
  const [termEvent, setTermEvent] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setTermPersonal(!selectAll);
    setTermEvent(!selectAll);
  };

  return (
    <>
      <Container>
        <p>최종 결제 금액 확인</p>
        <PurchaseBox>
          <SumPrice>
            <span>합계</span>
            <span>원</span>
          </SumPrice>
          <ul>
            <li>
              <span>상품 금액</span>
              <span>원</span>
            </li>
            <li className="red">
              <span>할인 금액</span>
              <span>-원</span>
            </li>
            <li>
              <span>배송비</span>
              <span>원</span>
            </li>
          </ul>
          <Terms>
            <span>주문할 상품의 편집정보, 상품정보, 상품가격, 배송정보를 확인하였습니다.</span>
            <span>주문취소 및 수정은 결제 후 1시간 이내에만 가능합니다.</span>
            <TermsMain>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <label>전체 선택</label>
            </TermsMain>
            <TermsDetail>
              <label>
              <input
                type="checkbox"
                checked={termPersonal}
                onChange={() => setTermPersonal(!termPersonal)}
              />
              개인정보 수집 이용 동의 (필수)</label>
              <span>약관보기</span>
            </TermsDetail>
            <TermsDetail>
              <label>
              <input
                type="checkbox"
                checked={termEvent}
                onChange={() => setTermEvent(!termEvent)}
              />
              이벤ㅌ, 할인쿠폰 등 혜택 제공을 위한 수신 동의 (선택)</label>
            </TermsDetail>
          </Terms>
          <PurchaseBtn>결제하기</PurchaseBtn>
        </PurchaseBox>
      </Container>
    </>
  )
};