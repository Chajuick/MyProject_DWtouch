import Logo from '../../../assets/logo/logo.png';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as MS from '../../Modal/ModalStyle';
import NameChangeGuider from '../../../assets/guider/name_changer_guider.png'

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(220, 220, 220);
    padding: 5px 0;
    position: relative;
    background-color: rgb(250, 250, 250);
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

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const SettingTitle = styled.div`
  font-size: 14px;
  color: rgb(40, 40, 40);
  margin-bottom: 10px;
  width: 250px;
`;

const SettingSelector = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  font-size: 14px;
  color: rgb(80, 80, 80);
  border: 1px solid rgb(180, 180, 180);
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 1px 1px rgb(80, 80, 80);
  }
`;

const SettingSelect = styled.ul`
  color: rgb(100, 100, 100);
  margin-bottom: 20px;
  list-style: none;
  div {
    position: absolute;
    border: 1px solid rgb(40, 40, 40);
    background-color: rgb(250, 250, 250);
  }
`;

const SettingOption = styled.li`
  width: 250px;
  font-size: 14px;
  color: rgb(90, 90, 90);
  padding: 12px 8px;
  border-bottom: 1px solid rgb(200, 200, 200);
  line-height: 1.5;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    background-color: rgb(245, 245, 245);
  }
`;

const SettingBtn = styled.button`
  width: 250px;
  color: rgb(240, 240, 240);
  background-color:rgb(40, 40, 40);
  border: 1px solid rgb(80, 80, 80);
  text-align: center;
  transition: all 400ms;
  padding: 12px 0;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    color: rgb(40, 40, 40);
    background-color: rgb(250, 250, 250);
  }
`;

const NameChangeExplain = styled.ul`
  color: rgb(120, 120, 120);
  font-size: 14px;
  margin-top: 30px;
  li {
    margin: 0 20px;
  }
`;

const NameChageFigure = styled.figure`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(230, 230, 230);
  border-radius: 16px;
  padding: 20px 0;
  img {
    width: 60%;
    margin-right: 40px;
  }
`;

const NameChangeInput = styled.div`
  position: relative;
  margin-top: 30px;
  font-size: 14px;
  color: rgb(150, 150, 150);
  input {
    width: 100%;
    padding: 8px 8px;
    border: 1px solid rgb(200, 200, 200);
    color: rgb(150, 150, 150);
    &:focus {
      border: 1px solid rgb(80, 80, 80);
      outline: none;
    }
  }
  div {
    position: absolute;
    top: 0;
    right: 8px;
    padding: 8px;
  }
`;

const NameChangeBtn = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    padding: 8px 40px;
    background-color: rgb(40, 40, 40);
    border: 1px solid rgb(40, 40, 40);
    color: rgb(240, 240, 240);
    transition: all 400ms;
  }
  button:hover {
    background-color: rgb(250, 250, 250);
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

function filteredChildOptions(options, delChild) {
  const filteredOptions = options.filter((option, index) => index !== delChild);
  return filteredOptions;
}

export default function ProductDesignHeaderBar({ cartInfo, setCartInfo, productOption, setProductOption, options, optFamily }) {
    const [showTooltipSaveBtn, setShowTooltipSaveBtn] = useState(false);
    const [showTooltipTitle, setShowTooltipTitle] = useState(false);
    const [showTooltipSettingChangeBtn, setShowTooltipSettingChangeBtn] = useState(false);
    const [saleInfo, setSaleInfo] = useState(sessionStorage.getItem('sale_info') || 0);
    const [delPrice, setDelPrice] = useState(sessionStorage.getItem('del_price') || 0);
    const [defaultPrice, setDefaultPrice] = useState(sessionStorage.getItem('default_price') || 0);
    const [finalPrice, setFinalPrice] = useState(sessionStorage.getItem('final_price') || 0);
    const [productQuantity, setProductQuantity] = useState(sessionStorage.getItem('product_quantity') || 0);
    const navigate = useNavigate();
    const [productName, setProductName] = useState("상품명");
    const [showSettingChangeModal, setShowSettingChangeModal] = useState(false);
    const [showNameChangeModal, setShowNameChangeModal] = useState(false);
    const [showOptionList, setShowOptionList] = useState([]);
    const [settingOption, setSettingOption] = useState(productOption);
    const [projectName, setProjectName] = useState('프로젝트명을 입력해주세요');
    const [changeProjectName, setChangeProjecName] = useState(projectName);


    useEffect(() => {
      if (finalPrice === 0) {
        alert('잘못된 접근입니다!');
        navigate('/');
      }
    },[]);

    useEffect(() => {
      if (cartInfo && cartInfo.length > 0) {
        setProductName(cartInfo[0].cart_product_name);
        setProjectName(cartInfo[0].cart_name);
      }
    }, [cartInfo])

    function handleOpenSetting() {
      setSettingOption(productOption);
      setShowTooltipSaveBtn(false);
      setShowTooltipSettingChangeBtn(false);
      setShowTooltipSettingChangeBtn(false);
      setShowSettingChangeModal(true);
    };

    function handleChangeOption(index, optIndex) {
      const newSettingOption = [...settingOption];
      newSettingOption[index] = optIndex;
      setSettingOption(newSettingOption);
      setShowOptionList(Array(productOption.length).fill(0));
    };

    function handleSelectOption(index) {
      const newShowOptionList = Array(productOption.length).fill(0);
      newShowOptionList[index] = 1;
      setShowOptionList(newShowOptionList);
    };

    function handleConfirmSetting() {
      setProductOption(settingOption);
      setShowSettingChangeModal(false);
    }

    useEffect(() => {
      let sizeOption = optFamily.priceModifier[0][productOption[0]];
      let coverOption = optFamily.priceModifier[1][productOption[1]];
      setDelPrice(defaultPrice*sizeOption*coverOption);
      if (saleInfo === 0) {
        setFinalPrice(defaultPrice*sizeOption*coverOption);
      } else {
        setFinalPrice(defaultPrice*(100-saleInfo)/100*sizeOption*coverOption);
      }    
    }, [defaultPrice, saleInfo, productOption]);

    const handleNameChange = (event) => {
      const newText = event.target.value;
      if (newText.length <= 25) {
        setChangeProjecName(newText);
      }
    };

    function handleOpenNameChangeModal() {
      setChangeProjecName('');
      setShowNameChangeModal(true);
    }

    function handleCloseNameChangeModal() {
      if (changeProjectName.length > 0) {
        setProjectName(changeProjectName);
      }
      setShowNameChangeModal(false);
    }

    return (
        <>
        <Container>
            <Wrapper>
              <Link to="/"><img src={Logo} alt='logo' /></Link>
                <OptDetail>
                  <span>
                      {productName} -
                      {productOption.map((item, index) => (
                        <span key={index} style={{ display:
                           index === -productOption[optFamily.parentsOpt] + optFamily.childOpts.childOpt1 + 1 ?  'none' : 'inline' }}>
                          {index === productOption.length - 1 ? options[index][item+1] : `${options[index][item+1]}, `}
                        </span>
                      ))}
                    </span>
                  {saleInfo>0 &&
                    <del>{delPrice*productQuantity.toLocaleString('ko-KR')}원</del>
                  }
                  <b style={{ color: saleInfo>0 ? 'rgba(250, 50, 50, 1)' : 'rgb(80, 80, 80)' }}>
                    {finalPrice*productQuantity.toLocaleString('ko-KR')}원
                  </b>
                </OptDetail>
                <SettingChangeBtn type='button'
                    onMouseEnter={() => setShowTooltipSettingChangeBtn(true)}
                    onMouseLeave={() => setShowTooltipSettingChangeBtn(false)}
                    onClick={handleOpenSetting}
                >
                    <Icon icon="ant-design:setting-filled" width="20" height="20" />
                    <ToolTip $textMain="옵션변경" $textSub="좌측 상품 옵션을 변경합니다." $show={showTooltipSettingChangeBtn} />
                </SettingChangeBtn>
                <Title 
                    onMouseEnter={() => setShowTooltipTitle(true)}
                    onMouseLeave={() => setShowTooltipTitle(false)}
                >
                    <span onClick={() => handleOpenNameChangeModal()}>{projectName}</span>
                    <Icon icon="gridicons:pencil" width="12" height="12" />
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
            <MS.ModalCloseBtn onClick={() => setShowSettingChangeModal(false)}>&times;</MS.ModalCloseBtn>
            {options.map((item, index) => (
              <SettingContainer>
                <SettingTitle
                  style={{ display:
                  (index === optFamily.childOpts.childOpt1 && settingOption[optFamily.parentsOpt] === 1) ||
                  (index === optFamily.childOpts.childOpt2 && settingOption[optFamily.parentsOpt] === 0)
                  ? 'none' : 'flex' }}
                >
                  {item[0]}
                </SettingTitle>
                <SettingSelector
                  style={{ display:
                  (index === optFamily.childOpts.childOpt1 && settingOption[optFamily.parentsOpt] === 1) ||
                  (index === optFamily.childOpts.childOpt2 && settingOption[optFamily.parentsOpt] === 0)
                  ? 'none' : 'flex' }}
                  onClick={() => handleSelectOption(index)}
                >
                  <span>{item[settingOption[index]+1]}</span>
                  <Icon icon="ph:caret-up-bold" width="14" height="14" rotate={2} />
                </SettingSelector>
                <SettingSelect key={index}
                    style={{ display:
                    (index === optFamily.childOpts.childOpt1 && settingOption[optFamily.parentsOpt] === 1) ||
                    (index === optFamily.childOpts.childOpt2 && settingOption[optFamily.parentsOpt] === 0)
                    ? 'none' : 'block' }}
                >
                  <div style={{ 
                    display: showOptionList[index] === 1 ? 'block' : 'none',
                  }}>
                    {filteredChildOptions(item, 0).map((optItem, optIndex) => {
                      return (
                        <SettingOption 
                          key={optIndex}
                          onClick={() => handleChangeOption(index, optIndex)}
                        >
                          {optItem}
                        </SettingOption>
                      );
                    })}
                  </div>
                </SettingSelect>
              </SettingContainer>
          ))}
          <SettingBtn onClick={handleConfirmSetting}>확인</SettingBtn>
        </MS.Modal>
        <MS.Overlay $showModal={showNameChangeModal}/>
        <MS.Modal $showModal={showNameChangeModal}>
          <MS.ModalCloseBtn onClick={() => setShowNameChangeModal(false)}>&times;</MS.ModalCloseBtn>
          <h2>프로젝트명 변경</h2>
          <NameChageFigure><img src={NameChangeGuider}/></NameChageFigure>
          <NameChangeExplain>
            <li>프로젝트명은 장바구니 내에서 편집 중인 포토북을 구분하기 위해 사용해요.</li>
            <li>상품에 인쇄되는 문구와는 관계없어요.</li>
            <li>상품에 인쇄되는 문구는 아래 편집창에서 바꿀 수 있어요.</li>
          </NameChangeExplain>
          <NameChangeInput>
            <input
              type='text' 
              placeholder='프로젝트명 입력'
              value={changeProjectName}
              onChange={handleNameChange}
            />
            <div>
              {changeProjectName.length} / 25
            </div>
          </NameChangeInput>
          <NameChangeBtn>
            <button onClick={handleCloseNameChangeModal}>확인</button>
          </NameChangeBtn>
        </MS.Modal>
        </>
    )
};