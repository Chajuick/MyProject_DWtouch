import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { act } from "react-dom/test-utils";
import { clear } from "@testing-library/user-event/dist/clear";

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
    width: 500px;
    margin: auto;
    overflow: hidden;
    transform: ${props => `scale(${props.$size}%)`};
    &>img {
        width: 100%;
        filter: drop-shadow(5px 5px 5px rgb(40, 40, 40, 0.5));
        pointer-events: none;
    }
    &>img:first-child {
        position: absolute;
        top: 0;
        left: 0;
        transition: all 400ms;
        visibility: ${props => props.$isShow ? 'visible' : 'hidden'};
        opacity: ${props => props.$isShow ? 1 : 0};
        z-index: 500;
        filter: none;
        pointer-events: none;
    }
`;

const TextInputBox = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    background: none;
    cursor: auto;
    input {
        padding: 10px;
        border: 1px dashed rgba(80, 80, 80, 0);
        outline: none;
        background: none;
        cursor: auto;
    }
    &.sel {
        cursor: grab;
        input {
            border: 1px dashed rgb(80, 80, 80);
            cursor: grab;
        }
    }
`;

const MovingText = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(250, 250, 250, 0.1);
    z-index: 10;
    input {
        padding: 10px;
        border: 1px solid rgba(0, 0, 0, 1);
        outline: none;
        border: none;
        color: rgb(80, 80, 80, 0.3);
        background: none;
    }
`;

export default function ProductDesignMainScreen({ productGrid, productSrc, mainScreenSize, setMainScreenSize, isGrid, setIsGrid, textField, setTextField }) {
    const inputRefs = useRef([]);
    const movingRef = useRef([]);
    const mainRef = useRef([]);
    const [activeText, setActiveText] = useState(-1);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [movingText, setMovingText] = useState("");
    const [movingTextNum, setMovingTextNum] = useState(-1);
    const [movingList, setMovingList] = useState([0]);

    const handleInputChange = (index, value) => {
        const newTextField = [...textField];
        newTextField[index] = value;
        setTextField(newTextField);
    };

    // 움직이는 텍스트 생성
    function handleInputMouseDown(event, index) {
        if (activeText === index) {
            let movingTextContent = "";
            if (textField[index] === "") {
                movingTextContent = "텍스트를 입력해주세요";
            } else {
                movingTextContent = textField[index];
            }
            setStartPosition({ x: event.clientX - inputRefs[index].offsetLeft*(mainScreenSize/100) - mainRef.current.offsetLeft*(100/mainScreenSize),
                 y: event.clientY - inputRefs[index].offsetTop - mainRef.current.offsetTop});
            setMovingList([0, 1]);
            setMovingText(movingTextContent);
            setMovingTextNum(index);
            setIsDragging(true);
        }
    };

    useEffect(() => {
        function handleWindowMouseClick(event) {
            const focusCheck = Object.values(inputRefs).some((item) => {
                const targetIsItemOrItsDescendant = item && item.contains && (item === event.target || item.contains(event.target));
                return targetIsItemOrItsDescendant;
            }) 
            if (!focusCheck) {
                setActiveText(-1);
            }
        };
        const handleMouseMove = (event) => {
          if (isDragging) {
            const deltaX = event.clientX - mainRef.current.offsetLeft - startPosition.x;
            const deltaY = event.clientY - mainRef.current.offsetTop - startPosition.y;
            
            // 마우스가 움직일 때마다 컴포넌트의 위치 업데이트
            setPosition({ x: deltaX, y: deltaY});
          }
        };
        const handleMouseUp = () => {
            // 마우스를 뗄 때 상태 업데이트
            if (isDragging) {
            // 해당 로직은 isDragging이 true일 때만 동작
            const targetBox = inputRefs[activeText];
            const movingTextEl = movingRef.current;
            if (targetBox && movingTextEl) {
                // targetBox의 위치 정보 가져오기
                const movingTextRect = movingTextEl.getBoundingClientRect();
                // MovingText를 targetBox 위치로 이동
                targetBox.style.left = movingTextRect.left - mainRef.current.offsetLeft + 'px';
                targetBox.style.top = movingTextRect.top - mainRef.current.offsetTop + 'px';
            }
                setMovingText();
                setMovingList([0]);
                setIsDragging(false);
            }
        };

        // 마우스 이벤트 리스너 등록
        window.addEventListener('click', handleWindowMouseClick);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        
        // clean-up 함수 등록
        return () => {
            window.removeEventListener('click', handleWindowMouseClick);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
      }, [isDragging, startPosition, position]);

    return (
        <>
        <MainScreen>
            <div>
                <MainComponent $size={mainScreenSize} $isShow={isGrid} ref={mainRef}> 
                    <img src={productGrid} />
                    <img src={productSrc} />
                    {textField.map((value, index) => (
                        <TextInputBox 
                            ref={(el) => (inputRefs[index] = el)}
                            key={index} 
                            onMouseDown={(event) => handleInputMouseDown(event, index)}
                            onClick={() => setActiveText(index)}
                            className={activeText === index? "sel" : ""} 
                        >
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                placeholder="텍스트를 입력해주세요"
                                
                            />
                        </TextInputBox>
                    ))}
                    <MovingText 
                        ref={movingRef}
                        style={{
                            position: 'absolute',
                            left: position.x + 'px',
                            top: position.y + 'px',
                            cursor: isDragging ? 'grabbing' : 'grab',
                          }}
                        $isShow={isDragging}
                    >
                        {movingList.map((index) => (
                            <input 
                                key={index} 
                                value={movingText} 
                                readOnly

                                style={{ 
                                    display: index === 1? 'block' : 'none',
                                    cursor: isDragging ? 'grabbing' : 'grab',
                                }}/>
                        ))}
                    </MovingText>
                </MainComponent>
            </div>
        </MainScreen>
        </>
    );
};