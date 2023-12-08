import { useEffect, useState } from 'react';
import Loading from '../assets/etc/loading.gif';
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`;

const Container = styled.div`
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 40px;
        height: 40px;
    }
    p {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`;

const Char = styled.span`
    opacity: 0;
    animation: ${fadeInOut} 1200ms linear infinite;
    animation-delay: ${props => props.$delay}s;
`;

export default function LoadingPage() {
    const text = "로딩중입니다";
    const [chars, setChars] = useState([]);

    useEffect(() => {
        const charArr = text.split("");
        setChars(charArr);
    }, []);

    return (
        <>
            <Container className='loading'>
                <img src={Loading} alt='Loading' />
                <p>
                    {chars.map((char, index) => (
                        <Char key={index} $delay={index * 0.2}>{char}</Char>
                    ))}
                </p>
            </Container>
        </>
    )
};