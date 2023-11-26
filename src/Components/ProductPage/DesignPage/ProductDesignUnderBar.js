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
    padding-left: 10px;
    display: flex;
    align-items: center;
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

export default function ProductDesignUnderBar() {
    const [screenSize, setScreenSize]=useState(100);

    return (
        <>
            <BelowBar>
                <ProductDesignSideBar />
                <RightBar>
                    <BelowMenu>
                        <Icon icon="material-symbols:fit-screen-outline" width="20px" height="20px" />
                        <span>화면 맞춤</span>
                    </BelowMenu>
                    <BelowMenu>
                        <Icon icon="cil:grid" width="20px" height="20px" />
                        <span>그리드</span>
                    </BelowMenu>
                    <BelowMenu>
                        <SizeModify>
                            <p>-</p>
                            <span>{screenSize}%</span>
                            <p>+</p>
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