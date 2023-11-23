import Logo from '../../assets/logo/logo.png';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as MS from '../Modal/ModalStyle';

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(220, 220, 220);
    padding: 10px 0;
    position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-left: 15px;
    height: 40px;
  };
  flex-shrink: 0;
`;

const OptDetail = styled.div`
  margin-left: 20px;
  font-size: 14px;
  color: rgb(120, 120, 120);
  &>span {
    margin-right: 10px;
  }
  del {
    font-size: 12px;
    color: rgb(180, 180, 180);
  }
  b {
    color: rgb(250, 50, 50);
    font-weight: 400;
  }
`;

const SettingChangeBtn = styled.button`
  margin-left: 5px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    transition: all 400ms;
    color: rgb(120, 120, 120);
  }
  svg:hover {
    color: rgb(40, 40, 40);
  }
  position: relative;
`;

const Title = styled.div`
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid rgb(210, 210, 210);
  color: rgb(150, 150, 150);
  font-size: 15px;
  transition: all 400ms;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    color: rgb(80, 80, 80);
    text-decoration: underline;
    svg {
        opacity: 1;
    }
  }
  svg {
    opacity: 0;
  }
  position: relative;
`;

const SaveBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgb(120, 120, 120);
  color: rgb(40, 40, 40);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 400ms;
  &:hover {
    cursor: pointer;
    background-color: rgb(40, 40, 40);
    color: rgb(250, 250, 250);
  }
  position: relative;
`;

const AddtoCartBtn = styled.button`
    width: 100px;
    height: 40px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(40, 40, 40);
    border: 1px solid rgb(40, 40, 40);
    color: rgb(250, 250, 250);
    margin-right: 20px;
    transition: all 400ms;
    svg {
        margin-right: 10px;
    }
    &:hover {
        cursor: pointer;
        background-color: rgb(250 250, 250);
        color: rgb(40, 40, 40);
    }
`;

const ToolTip = ({ $textMain, $textSub, $show }) => {
    return $show ? 
    <div style={{ 
        padding: '5px 20px',
        border: '1px solid rgb(40, 40, 40)',
        fontSize: '14px',
        backgroundColor: 'rgb(250, 250, 250)', 
        zIndex: 5, 
        position: 'absolute', 
        marginTop: '10px',
        top: '100%', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '205px',
    }}>
        <p style={{ color: 'rgb(40, 40, 40)' }}>{$textMain}</p>
        <span style={{ color: 'rgb(120, 120, 120)', textAlign: 'left', marginTop: '3px' }}>{$textSub}</span>
    </div> : null;
};

export default function ProductDesignHeaderBar({ cartInfo, setCartInfo, productOption, setProductOption }) {
    const [showTooltipSaveBtn, setShowTooltipSaveBtn] = useState(false);
    const [showTooltipTitle, setShowTooltipTitle] = useState(false);
    const [showTooltipSettingChangeBtn, setShowTooltipSettingChangeBtn] = useState(false);
    const [saleInfo, setSaleInfo] = useState(sessionStorage.getItem('sale_info') || 0);
    const [delPrice, setDelPrice] = useState(sessionStorage.getItem('del_price') || 0);
    const [finalPrice, setFinalPrice] = useState(sessionStorage.getItem('final_price') || 0);
    const navigate = useNavigate();
    const [productName, setProductName] = useState("상품명");
    const [showSettingChangeModal, setShowSettingChangeModal] = useState(false);

    useEffect(() => {
      if (finalPrice === 0) {
        alert('잘못된 접근입니다!');
        navigate('/');
      }
    },[]);

    useEffect(() => {
      if (cartInfo && cartInfo.length > 0) {
        setProductName(cartInfo[0].cart_product_name);
      }
    }, [cartInfo])

    return (
        <>
        <Container>
            <Wrapper>
                <img src={Logo} alt='logo'/>
                <OptDetail>
                    <span>
                      {productName} -
                      {productOption.map((item, index) => (
                        <span key={index}>{index === productOption.length - 1 ? item : `${item}, `}</span>
                      ))}
                    </span>
                  {saleInfo>0 &&
                    <del>{delPrice.toLocaleString('ko-KR')}원</del>
                  }
                  <b style={{ color: saleInfo>0 ? 'rgba(250, 50, 50, 1)' : 'rgb(80, 80, 80)' }}>
                    {finalPrice.toLocaleString('ko-KR')}원
                  </b>
                </OptDetail>
                <SettingChangeBtn type='button'
                    onMouseEnter={() => setShowTooltipSettingChangeBtn(true)}
                    onMouseLeave={() => setShowTooltipSettingChangeBtn(false)}
                >
                    <Icon icon="ant-design:setting-filled" width="20" height="20" />
                    <ToolTip $textMain="옵션변경" $textSub="좌측 상품 옵션을 변경합니다." $show={showTooltipSettingChangeBtn} />
                </SettingChangeBtn>
                <Title 
                    onMouseEnter={() => setShowTooltipTitle(true)}
                    onMouseLeave={() => setShowTooltipTitle(false)}
                >
                    <span >직접만들기</span>
                    <Icon icon="gridicons:pencil" width="20" height="20" />
                    <ToolTip $textMain="프로젝트명 변경" $textSub="장바구니에서 편집 중인 상품을 구분하기 위한 프로젝트명을 변경합니다." $show={showTooltipTitle} />
                </Title>
            </Wrapper>
            <Wrapper>
                <SaveBtn 
                    onMouseEnter={() => setShowTooltipSaveBtn(true)}
                    onMouseLeave={() => setShowTooltipSaveBtn(false)}
                >
                    <Icon icon="bxs:save" width="20" height="20" />
                    <ToolTip $textMain="저장" $textSub="장바구니에 임시로 제작 상태를 저장합니다." $show={showTooltipSaveBtn} />
                </SaveBtn>
                <AddtoCartBtn><Icon icon="bxs:shopping-bag" width="20" height="20" />장바구니</AddtoCartBtn>
            </Wrapper>
        </Container>
        <MS.Overlay $showModal={showSettingChangeModal}/>
        <MS.Modal $showModal={showSettingChangeModal}>
            <select value={productOption[0]}>
              
            </select>
        </MS.Modal>
        </>
    )
};