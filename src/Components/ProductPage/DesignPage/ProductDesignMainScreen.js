import styled from "styled-components";
import { useState } from "react";



const MainScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(230, 230, 230);
    z-index: -10;
    display: flex;
    justify-content: center;
    align-items: center;
    &>div {
        position: relative;
    }
`;

const MainComponent = styled.img`

`;

const GridContainer = styled.div`
    .grid-image {
        width: 100%;
        height: auto;
        display: block;
    }
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(8, 1fr); /* 3개의 열 */
        grid-template-rows: repeat(4, 1fr); /* 3개의 행 */
        gap: 2px; /* 그리드 간격 조절 */
        pointer-events: none; /* 그리드 요소 위에서 마우스 이벤트를 무시하도록 설정 */

    .grid-item {
        border: 1px dashed rgb(240, 230, 230); /* 그리드 셀의 테두리 스타일 지정 */
        /* 그리드 아이템의 크기 및 스타일을 조절할 수 있습니다. */
    }
`;

export default function ProductDesignMainScreen({ productSrc }) {
    const bigGridSize = 8;
    const smallGridSize = 10;

    return (
        <>
        <MainScreen>
            <div>
                <MainComponent src={productSrc} />
                <GridContainer className="grid-overlay">
                {[...Array(bigGridSize * bigGridSize)].map((_, index) => (
                    <div key={index} className="grid-item"></div>
                ))}
                </GridContainer>
            </div>
        </MainScreen>
        </>
    );
};