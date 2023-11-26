import styled from "styled-components";

export const OptSelectContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    position: relative;
    background-color: rgb(250, 250, 250);
    display: flex;
    justify-content: space-between;
    padding-top: 100px;
    padding-bottom: 40px;
`;

export const MainImg = styled.img`
    width: 752px;
    height: 752px;
`;

export const ProductOptSelector = styled.div`
    display: flex;
    flex-direction: column;
    color: rgb(80, 80, 80);
    font-size: 14px;
`;

export const OptTitle = styled.h2`
    font-size: 24px;
    color: rgb(40, 40, 40);
    padding-bottom: 10px;
`;

export const DetailOpt = styled.div`
width: 380px;   
    &>div {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    }
`;

export const DetailTitle = styled.h3`
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 14px;
`;

export const OptSelectBtn = styled.div`
    width: calc( 100% / 3 - 5px );
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 10px 0;
    background: none;
    border: 1px solid rgba(40, 40, 40, 0.2);
    transition: all 600ms;
    color: rgb(100, 100, 100);
    text-align: center;
    &.sel {
        border: 1px solid rgba(40, 40, 40, 0.8);
        box-shadow: 0 0 1px 1px rgba(40, 40, 40, 0.3);
    }
    &:hover {
        cursor: pointer;
        border: 1px solid rgba(40, 40, 40, 1);
        box-shadow: 0 0 1px 1px rgba(40, 40, 40, 0.3);
  }
`;

export const Counter = styled.div`
    margin-bottom: 30px;
    padding: 8px 0;
    border: 1px solid rgb(150, 150, 150);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 400ms;
    button {
        font-size: 20px;
        padding: 0 5px;
        border: none;
        background: none;
        cursor: pointer;
    }
    &:hover {
        border: 1px solid rgba(40, 40, 40, 1);
        box-shadow: 0 0 1px 1px rgba(40, 40, 40, 0.3);
    }
`;

export const NumSelector = styled.input`
    width: 100px;
    border: none;
    text-align: center;
    background: none;
    outline: none;
`;

export const PriceViewer = styled.div`
    padding: 30px 0;
    display: flex;
    font-size: 18px;
    justify-content: space-between;
    align-items: center; 
    p:last-child {
        del {
            color: rgb(190, 190, 190);
            margin-right: 5px;
        }
        b {
            color: rgba(250, 50, 50, 0.7);
        }
    }
`;

export const PurchaseBtn = styled.button`
    background-color: rgb(20, 20, 20);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 14px 0;
    cursor: pointer;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: all 400ms;
    &:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(20, 20, 20);
    }
`;

export const DetailGuider = styled.ul`
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    li {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3px;
    }
`;