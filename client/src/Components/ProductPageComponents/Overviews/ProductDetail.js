import styled from "styled-components";
import { Icon } from '@iconify/react';
import { useState, useRef, useEffect } from 'react';

const Container = styled.div`
    width: 100vw;
    background-color: rgb(250, 250, 250);
    color: #191919;
    padding-bottom: 100px;
    border-bottom: 1px solid rgb(200, 200, 200);
`;

const Wrapper = styled.div`
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 42px;
    margin-bottom: 20px;
    padding-top: 120px;
`;

const DetailTitle = styled.div`
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: start;
    button {
        background: none;
        border: none;
    }
`;

const DetailToggler = styled.div`
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    border-top: 1px solid rgb(220, 220, 220);
    padding: 30px 0;
    font-weight: bold;
    button {
        cursor: pointer;
    }
`;

const DetailList = styled.div`
    p:first-child {
        font-size: 20px;
        font-weight: 600;
        margin-top: 20px;
        margin-bottom: 20px;
        color: rgb(60, 60, 60);
    }
    p {
        margin-bottom: 5px;
        color: rgb(120, 120, 120);
    }
    margin-bottom: 50px;
`;

export default function ProductDetail({ detailTextGuider, detailTableGuider, changeDetailY }) {
    const initialVisibleSections = Object.keys(detailTextGuider).reduce((acc, detailId, index) => {
        acc[detailId] = index === 0;
        return acc;
    }, {});
    const [visibleSections, setVisibleSections] = useState(initialVisibleSections);

    const toggleSection = (sectionId) => {
      setVisibleSections(prevState => ({
        ...prevState,
        [sectionId]: !prevState[sectionId]
      }));
    };

    const productDetailRef = useRef(null);

    const handleScroll = () => {
        if (productDetailRef.current) {
            const DetailY = productDetailRef.current.getBoundingClientRect().top + window.scrollY;
            changeDetailY(DetailY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function handleToggleSection(detailId) {
        toggleSection(detailId);
        window.scrollBy(0, -1);
    };

    return (
        <>
            <Container ref={productDetailRef}>
                <Wrapper>
                <Title>상품상세정보</Title>
                {Object.keys(detailTextGuider).map((detailId) => (
                    <DetailTitle key={detailId}>
                        <DetailToggler>
                            <span>{detailTextGuider[detailId][0][0]}</span>
                            <button onClick={() => handleToggleSection(detailId)}>
                                {!visibleSections[detailId] &&
                                    <Icon icon="ph:caret-up-bold" width="20" height="20" rotate={2} />
                                }
                                {visibleSections[detailId] &&
                                    <Icon icon="ph:caret-up-bold" width="20" height="20" />
                                }
                            </button>
                        </DetailToggler>
                        {visibleSections[detailId] && (
                            <div>
                            {detailTextGuider[detailId].slice(1).map((subsection, index) => (
                                <DetailList key={index}>
                                {subsection.map((item, itemIndex) => (
                                    <p key={itemIndex}>{item}</p>
                                ))}
                                </DetailList>
                            ))}
                            </div>
                        )}
                    </DetailTitle>
                ))}
                </Wrapper>
            </Container>
        </>
    )
}