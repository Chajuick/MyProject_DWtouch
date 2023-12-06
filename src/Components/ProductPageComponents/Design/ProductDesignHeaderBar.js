import Logo from '../../../assets/logo/logo.png';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as MS from '../../Modal/ModalStyle';
import * as S from './ProductDesignHeaderBarStyle';
import NameChangeGuider from '../../../assets/guider/name_changer_guider.png';
import { OptionPriceCalculator } from '../Overviews/PriceEtc';

function filteredChildOptions(options, delChild) {
  const filteredOptions = options.filter((option, index) => index !== delChild);
  return filteredOptions;
}

export default function ProductDesignHeaderBar({ cartName, setCartName, productName ,productOption, setProductOption, options, optFamily, addToCart }) {
    const navigate = useNavigate();
    // 툴팁
    const [showTooltipSaveBtn, setShowTooltipSaveBtn] = useState(false);
    const [showTooltipTitle, setShowTooltipTitle] = useState(false);
    const [showTooltipSettingChangeBtn, setShowTooltipSettingChangeBtn] = useState(false);
    // 가격 정보
    const saleInfo = sessionStorage.getItem('sale_info') || 0;
    const saleDetail = sessionStorage.getItem('sale_detail') || "";
    const defaultPrice = sessionStorage.getItem('default_price') || 0;
    const [delPrice, setDelPrice] = useState(sessionStorage.getItem('del_price') || 0);
    const [finalPrice, setFinalPrice] = useState(sessionStorage.getItem('final_price') || 0);
    const [productQuantity, setProductQuantity] = useState(sessionStorage.getItem('product_quantity') || 0);
    // 프로젝트 정보
    const [changeCartName, setChangeCartName] = useState("프로젝트명을 입력해주세요");
    // 모달
    const [showSettingChangeModal, setShowSettingChangeModal] = useState(false);
    const [showNameChangeModal, setShowNameChangeModal] = useState(false);
    const [showOptionList, setShowOptionList] = useState([]);
    const [settingOption, setSettingOption] = useState(productOption);
  
    const [showAddtoCartModal, setShowAddtoCartModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);

    useEffect(() => {
      if (productQuantity === 0) {
        showAlertModal(true);
      }
    },[]);

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
    };

    useEffect(() => {
      let sizeOperator = optFamily.priceModifier[0][0];
      let coverOperator = optFamily.priceModifier[1][0];
      let sizePrice = optFamily.priceModifier[0][productOption[0]+1];
      let coverPrice = optFamily.priceModifier[1][productOption[1]+1];
      setDelPrice(OptionPriceCalculator(OptionPriceCalculator(defaultPrice*productQuantity, coverOperator, coverPrice), sizeOperator, sizePrice));
     if (saleInfo === 0) {
      setFinalPrice(delPrice);
     } else {
      setFinalPrice(OptionPriceCalculator(OptionPriceCalculator(defaultPrice*(100-saleInfo)/100*productQuantity, coverOperator, coverPrice), sizeOperator, sizePrice));
     }    
  }, [defaultPrice, saleInfo, productOption]);



    const handleNameChange = (event) => {
      const newText = event.target.value;
      if (newText.length <= 25) {
        setChangeCartName(newText);
      }
    };

    function handleOpenNameChangeModal() {
      setChangeCartName('');
      setShowNameChangeModal(true);
    };

    function handleCloseNameChangeModal() {
      if (changeCartName.length > 0) {
        setCartName(changeCartName);
      }
      setShowNameChangeModal(false);
    };

    function handleAddToCart(item) {
      const cartInfo = {
        cartName: cartName,
        productName: productName,
        productOption: productOption,
        defaultPrice: delPrice,
        finalPrice: finalPrice,
        productQuantity: productQuantity,
        saleInfo: saleInfo,
        saleDetail: saleDetail,
      }
      if (item === 0) {
        addToCart(cartInfo, "저장");
      } else if (item === 1) {
        addToCart(cartInfo, "장바구니");
      }
    };

    function handleAlertModalCloseBtn() {
      navigate('/');
      setShowAlertModal(false);
      window.location.reload(true);
    };


    return (
        <>
        <S.Container>
            <S.Wrapper>
              <Link to="/"><img src={Logo} alt='logo' /></Link>
                <S.OptDetail>
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
                    <del>{delPrice.toLocaleString('ko-KR')}원</del>
                  }
                  <b style={{ color: saleInfo > 0 ? 'rgba(250, 50, 50, 1)' : 'rgb(80, 80, 80)' }}>
                    {finalPrice.toLocaleString('ko-KR')}원
                  </b>
                </S.OptDetail>
                <S.SettingChangeBtn type='button'
                    onMouseEnter={() => setShowTooltipSettingChangeBtn(true)}
                    onMouseLeave={() => setShowTooltipSettingChangeBtn(false)}
                    onClick={handleOpenSetting}
                >
                    <Icon icon="ant-design:setting-filled" width="20" height="20" />
                    <S.ToolTip $textMain="옵션변경" $textSub="좌측 상품 옵션을 변경합니다." $show={showTooltipSettingChangeBtn} />
                </S.SettingChangeBtn>
                <S.Title 
                    onMouseEnter={() => setShowTooltipTitle(true)}
                    onMouseLeave={() => setShowTooltipTitle(false)}
                >
                    <span onClick={() => handleOpenNameChangeModal()}>{cartName}</span>
                    <Icon icon="gridicons:pencil" width="12" height="12" />
                    <S.ToolTip $textMain="프로젝트명 변경" $textSub="장바구니에서 편집 중인 상품을 구분하기 위한 프로젝트명을 변경합니다." $show={showTooltipTitle} />
                </S.Title>
            </S.Wrapper>
            <S.Wrapper>
                <S.SaveBtn 
                    onMouseEnter={() => setShowTooltipSaveBtn(true)}
                    onMouseLeave={() => setShowTooltipSaveBtn(false)}
                    onClick={() => handleAddToCart(0)}
                >
                    <Icon icon="bxs:save" width="20" height="20" />
                    <S.ToolTip $textMain="저장" $textSub="장바구니에 임시로 제작 상태를 저장합니다." $show={showTooltipSaveBtn} />
                </S.SaveBtn>
                <S.AddtoCartBtn onClick={() => setShowAddtoCartModal(true)}><Icon icon="bxs:shopping-bag" width="20" height="20" />장바구니</S.AddtoCartBtn>
            </S.Wrapper>
        </S.Container>
        <MS.Overlay $showModal={showSettingChangeModal}/>
        <MS.Modal $showModal={showSettingChangeModal}>
            <MS.ModalCloseBtn onClick={() => setShowSettingChangeModal(false)}>&times;</MS.ModalCloseBtn>
            {options.map((item, index) => (
              <S.SettingContainer key={index}>
                <S.SettingTitle
                  style={{ display:
                  (index === optFamily.childOpts.childOpt1 && settingOption[optFamily.parentsOpt] === 1) ||
                  (index === optFamily.childOpts.childOpt2 && settingOption[optFamily.parentsOpt] === 0)
                  ? 'none' : 'flex' }}
                >
                  {item[0]}
                </S.SettingTitle>
                <S.SettingSelector
                  style={{ display:
                  (index === optFamily.childOpts.childOpt1 && settingOption[optFamily.parentsOpt] === 1) ||
                  (index === optFamily.childOpts.childOpt2 && settingOption[optFamily.parentsOpt] === 0)
                  ? 'none' : 'flex' }}
                  onClick={() => handleSelectOption(index)}
                >
                  <span>{item[settingOption[index]+1]}</span>
                  <Icon icon="ph:caret-up-bold" width="14" height="14" rotate={2} />
                </S.SettingSelector>
                <S.SettingSelect key={index}
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
                        <S.SettingOption 
                          key={optIndex}
                          onClick={() => handleChangeOption(index, optIndex)}
                        >
                          {optItem}
                        </S.SettingOption>
                      );
                    })}
                  </div>
                </S.SettingSelect>
              </S.SettingContainer>
          ))}
          <S.SettingBtn onClick={handleConfirmSetting}>확인</S.SettingBtn>
        </MS.Modal>
        <MS.Overlay $showModal={showNameChangeModal}/>
        <MS.Modal $showModal={showNameChangeModal}>
          <MS.ModalCloseBtn onClick={() => setShowNameChangeModal(false)}>&times;</MS.ModalCloseBtn>
          <h2>프로젝트명 변경</h2>
          <S.NameChageFigure><img src={NameChangeGuider}/></S.NameChageFigure>
          <S.NameChangeExplain>
            <li>프로젝트명은 장바구니 내에서 편집 중인 포토북을 구분하기 위해 사용해요.</li>
            <li>상품에 인쇄되는 문구와는 관계없어요.</li>
            <li>상품에 인쇄되는 문구는 아래 편집창에서 바꿀 수 있어요.</li>
          </S.NameChangeExplain>
          <S.NameChangeInput>
            <input
              type='text' 
              placeholder='프로젝트명 입력'
              value={changeCartName}
              onChange={handleNameChange}
            />
            <div>
              {changeCartName.length} / 25
            </div>
          </S.NameChangeInput>
          <S.NameChangeBtn>
            <button onClick={handleCloseNameChangeModal}>확인</button>
          </S.NameChangeBtn>
        </MS.Modal>
        <MS.Overlay $showModal={showAddtoCartModal}/>
        <MS.Modal $showModal={showAddtoCartModal}>
          <p style={{ textAlign: "center", fontSize: "15px" }}>현재까지 편집한 디자인을 저장하고<br/>장바구니로 이동하시겠습니까?</p>
          <S.ButtonWrapper>
            <S.CancleBtn style={{ marginTop: '20px' }} onClick={() => setShowAddtoCartModal(false)}>취소</S.CancleBtn>
            <S.ConfirmBtn style={{ marginTop: '20px' }} onClick={() => handleAddToCart(1)}>확인</S.ConfirmBtn>
          </S.ButtonWrapper>
        </MS.Modal>
        <MS.Overlay $showModal={showAlertModal}/>
        <MS.Modal $showModal={showAlertModal}>
          <MS.ModalContent>
            <p>잘못된 접근입니다!</p>
            <button onClick={handleAlertModalCloseBtn}>확인</button>
          </MS.ModalContent>
        </MS.Modal>
        </>
    )
};