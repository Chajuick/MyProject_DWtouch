import { Icon } from '@iconify/react';
import { useState } from 'react';
import styled from 'styled-components';
import ProductDesignSideBar from './ProductDesignSideBar';

const BelowBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(220, 220, 220);
    position: relative;
    background-color: rgb(250, 250, 250);
    z-index: 5;
`;

const RightBar = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
`;

const BelowMenu = styled.li`
    display: flex;
    align-items: center;
    color: rgb(60, 60, 60);
    font-size: 13px;
    margin-right: 20px;
    padding: 8px 0;
    transition: all 400ms;
    flex-shrink: 0;
    span {
        margin-left: 5px;
    }
    &:hover {
        cursor: pointer;
        color: rgb( 150, 150, 150);
    }
`;

const SizeModify = styled.div`
    border-left: 1px solid rgb(220, 220, 220);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    span {
        cursor: default;
        color: rgb(60, 60, 60);
    }
    p {
        transition: all 400ms;
        font-size: 20px;
        margin: 0 5px;
    }
`;

const ViewModify = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 10px;
    border: 1px solid rgb(200, 200, 200);
    transition: all 400ms;
    &:hover {
        cursor: pointer;
        background-color: rgb(40, 40, 40);
        color: rgb(240, 240, 240);
    }
`;

export default function ProductDesignUnderBar({ mainScreenSize, setMainScreenSize, isGrid, setIsGrid, textField, setTextField, productOption }) {

    function minusScreenSize(num) {
        if (num-20 >= 100) {
            setMainScreenSize(num-20);
        }
    }
    function plusScreenSize(num) {
        if (num+20 <= 300) {
            setMainScreenSize(num+20);
        }
    }

    return (
        <>
            <BelowBar>
                <ProductDesignSideBar textField={textField} setTextField={setTextField} productOption={productOption}/>
                <RightBar>
                    <BelowMenu onClick={() => setIsGrid(!isGrid)}>
                        {isGrid? <Icon icon="cil:grid" width="20px" height="20px" /> : <Icon icon="ri:grid-fill" width="20px" height="20px" />
                        }
                        <span>그리드</span>
                    </BelowMenu>
                    <BelowMenu>
                        <SizeModify>
                            <p onClick={() => minusScreenSize(mainScreenSize)}>-</p>
                            <span>{mainScreenSize}%</span>
                            <p onClick={() => plusScreenSize(mainScreenSize)}>+</p>
                        </SizeModify>
                    </BelowMenu>
                    <BelowMenu>
                        <ViewModify>
                            <Icon icon="tdesign:menu" width="18px" height="18px" />
                            <span>전체 보기</span>
                        </ViewModify>
                    </BelowMenu>
                </RightBar>
            </BelowBar>
        </>
    );
};