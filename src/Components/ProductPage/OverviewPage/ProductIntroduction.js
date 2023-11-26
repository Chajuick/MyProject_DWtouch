import styled from "styled-components";
import { useEffect, useRef } from "react";
import WrrantyCard from '../../../assets/products/products_warranty.png';

const Container = styled.div`
    width: 100vw;
    background-color: rgb(250, 250, 250);
    color: #191919;
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

const SubTitle = styled.p`
    font-size: 20px;
    margin-bottom: 80px;
`;

const MainImg = styled.img`
    width: 1140px;
    height: 740px;
    padding-bottom: 120px;
`;

const TypeContainer = styled.ul`
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    li {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 550px;
            height: 550px;
        }
        p {
            font-size: 16px;
            margin-top: 20px;
        }
        h3 {
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 60px;
        }
    }
`;

const QualityAssuranceInfo = styled.div`
    width: 100vw;
    padding: 160px;
    background-color: rgb(245, 245, 245);
    display: flex;
    justify-content: center;
    align-items: center;
    figure {
        width: 580px;
        background-color: rgb(235, 235, 235);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: calc( 80% );
            height: calc( 80% );
        }
    }
    div {
        width: 580px;
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        h2 {
            font-size: 42px;
            margin-bottom: 60px;
        }
        p {
            font-size: 22px;
        }
    }
`;

const TypeList = ({ img, title, subTitle }) => (
    <li>
      <img src={img} alt={title} />
      <p>{title}</p>
      <h3>{subTitle}</h3>
    </li>
  );

export default function ProductIntroduction({ introGuider, changeIntroductionY }) {
    const productIntroductionRef = useRef(null);

    const handleScroll = () => {
        if (productIntroductionRef.current) {
            const IntroductionY = productIntroductionRef.current.getBoundingClientRect().top + window.scrollY;
            changeIntroductionY(IntroductionY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Container ref={productIntroductionRef}>
                <Wrapper>
                    <Title>{introGuider.title}</Title>
                    <SubTitle>{introGuider.subTitle}</SubTitle>
                    <MainImg src={introGuider.MainImg} alt="메인이미지"/>
                    <Title>{introGuider.typeTitle}</Title>
                    <SubTitle>{introGuider.typeSubTitle}</SubTitle>
                    <TypeContainer>
                        {Object.entries(introGuider.typeImgs).map(([key, { title, subTitle, img }]) => (
                            <TypeList key={key} img={img} title={title} subTitle={subTitle} />
                        ))}
                    </TypeContainer>
                    <QualityAssuranceInfo>
                        <figure>
                            <img src={WrrantyCard} />
                        </figure>
                        <div>
                            <h2>100% 품질보증으로<br/>믿을 수 있습니다.</h2>
                            <p>확실한 품질보증 서비스로<br/>불만족 시 100% 재제작 또는 환불해 드립니다!</p>
                        </div>
                    </QualityAssuranceInfo>
                </Wrapper>
            </Container>
        </>
    )
}