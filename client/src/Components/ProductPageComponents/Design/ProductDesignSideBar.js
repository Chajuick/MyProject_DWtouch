import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

const BelowBar = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
    color: rgb(60, 60, 60);
    margin-left: 15px;
    font-size: 13px;
    flex-shrink: 0;
    list-style: none;
`;

const DoBtn = styled.li`
    margin-right: 5px;
    transition: all 400ms;
    &:hover {
        cursor: pointer;
        color: rgb(150, 150, 150);
    }
`;

const TextAdd = styled.li`
    display: flex;
    align-items: center;
    border-left: 1px solid rgb(220, 220, 220);
    padding: 0 15px;
    transition: all 400ms;
    pointer-events: ${props => props.disabled? 'none' : 'auto'};
    color: ${props => props.disabled? 'rgb(200, 200, 200)' : 'rgb(60, 60, 60);'};
    &:hover {
        cursor: pointer;
        color: rgb(150, 150, 150);
    }
    span {
        margin-left: 10px;
    }
`;

export default function ProductDesignSideBar({ textField, setTextField, productOption }) {

    useEffect(() => {
        if (productOption[1] === 1) {
            setTextField([]);
        }
    }, [productOption]);

    const handleAddButtonClick = () => {
        // 새로운 input을 추가합니다.
        setTextField([...textField, ""]);
    };

    return (
        <>
        <BelowBar >
            <DoBtn><Icon icon="material-symbols-light:undo" width="31px" height="31px" /></DoBtn>
            <DoBtn><Icon icon="material-symbols-light:redo" width="31px" height="31px" /></DoBtn>
            <TextAdd onClick={handleAddButtonClick} disabled={productOption[1] === 1}>
                <Icon icon="ph:textbox-thin"  width="31px" height="31px" />
                <span>텍스트 추가</span>
            </TextAdd>
        </BelowBar>
        </>
    );
};