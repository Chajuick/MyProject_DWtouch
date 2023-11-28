import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { act } from "react-dom/test-utils";

const MainScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(230, 230, 230);
    &>div {
        display: flex;
        width: 100vw;
        height: 90vh;
        position: relative;
    }
`;

const MainComponent = styled.div`
    position: relative;
    width: ${props => props.$size/2}%;
    margin: auto;
    box-shadow: 2px 2px 4px 2px rgba(40, 40, 40, 0.2);
    overflow: hidden;
    &>img {
        width: 100%;
    }
    &>img:first-child {
        position: absolute;
        top: 0;
        left: 0;
        transition: all 400ms;
        visibility: ${props => props.$isShow ? 'visible' : 'hidden'};
        opacity: ${props => props.$isShow ? 1 : 0};
    }
`;

const TextInputBox = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 5px;
    background: none;
    input {
        cursor: move;
        outline: none;
        border: none;
    }
`;

export default function ProductDesignMainScreen({ productGrid, productSrc, mainScreenSize, setMainScreenSize, isGrid, setIsGrid, textField, setTextField }) {
    const [activeText, setActiveText] = useState();
    
    const inputRefs = useRef([]);

    const handleInputChange = (index, value) => {
        const newTextField = [...textField];
        newTextField[index] = value;
        setTextField(newTextField);
    };

    const handleMouseDown = (event, index) => {

    };

    const handleMouseMove = (event) => {

    };

    const handleMouseUp = () => {

    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeText !== null &&
                Object.values(inputRefs.current).every(
                    (ref, index) => ref && ref.current && !ref.current.contains(event.target) && index !== activeText
                )) {
                setActiveText('');
            }
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []); 

    return (
        <>
        <MainScreen>
            <div>
                <MainComponent $size={mainScreenSize} $isShow={isGrid}>
                    <img src={productGrid} />
                    <img src={productSrc} />
                    {textField.map((value, index) => (
                        <TextInputBox ref={(el) => (inputRefs[index] = el)} key={index} 
                            onDoubleClick={() => setActiveText(index)}
                            onMouseDown={(e) => handleMouseDown(e, index)}
                        >
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                placeholder="텍스트를 입력해주세요"
                                readOnly={index !== activeText}
                            />
                        </TextInputBox>
                    ))}
                </MainComponent>
            </div>
        </MainScreen>
        </>
    );
};