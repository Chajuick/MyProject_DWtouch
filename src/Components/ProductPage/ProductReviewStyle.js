import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    background-color: rgb(250, 250, 250);
    color: #191919;
`;

export const Wrapper = styled.div`
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

export const Title = styled.h1`
    font-size: 42px;
    margin-bottom: 20px;
    padding-top: 120px;
`;

export const TableSeparator = styled.div`
    margin-top: 80px;
    margin-bottom: 20px;
    width:1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>div {
        display: flex;
        justify-content: left;
        align-items: center;
    }
`;

export const ViewMethodSelector = styled.div`
    color: rgb(80, 80, 80);
    padding: 0 20px;
    position: relative;
    span:hover {
        cursor: pointer;
        text-decoration: underline;
        text-align: center;
    }
    ul {
        position: absolute;
        top: 30px;
        left: 8px;
        border: 1px solid black;
        background-color: white;
        padding: 15px;
        list-style: none;
        box-shadow: 2px 4px 4px rgba(40, 40, 40, 0.2);
        li {
            color: rgb(120, 120, 120);
            margin-bottom: 4px;
        }
        li:hover {
            cursor: pointer;
            text-decoration: underline;
            color: rgb(40, 40, 40);
        }
    }
`;

export const WriteReviewBtn = styled.button`
    background-color: rgb(20, 20, 20);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 14px 30px;
    cursor: pointer;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: all 400ms;
    &:hover {
    background-color: rgb(230, 230, 230);
    color: rgb(20, 20, 20);
    }
`;

export const FilterReviewBtn = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    &:first-child {
        margin-right: 10px;
    }
    &:last-child {
        margin-left: 10px;
    }
    &.sel {
        font-weight: 800;
    }
`;

export const ReviewTable = styled.div`
`;

export const TableHead = styled.div`
    border-top: 2px solid rgb(80, 80, 80);
    background-color: rgb(245, 245, 245);
    width: 1200px;
        ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            li {
                font-weight: 400;
                padding: 15px 0;
                text-align: center;
            }
            li:first-child {
                width: calc( 65% );
            }
            li:nth-child(2) {
                width: calc( 15% );
            }
            li:nth-child(3) {
                width: calc( 10% );
            }
            li:last-child {
                width: calc( 10% );
            }
        }
`;

export const TableBody = styled.div`
    width: 1200px;
    &>ul {
        display: flex;
        justify-content: row;
        align-items: center;
        list-style: none;
        border-bottom: 1px solid rgb(230, 230, 230);
    }
`;

export const ReviewContentBox = styled.li`
    width: calc( 65% );
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 50px 20px;
    &>div:last-child {
        display: flex;
        flex-direction: column;
        align-items: start;
        height: 160px;
        margin-left: 40px;
        &>span {
            font-size: 16px;
            color: rgb(80, 80, 80);
        }
    }
`;

export const ContentHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    margin-bottom: 20px;
`;

export const ContentTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    h3 {
        font-size: 18px;
        margin-bottom: 10px;
    }
    p {
        font-size: 16px;
        color: rgb(120, 120, 120);
    }
`;

export const ReviewStarBox = styled.li`
    width: calc( 15% );
    display: flex;
    flex-direction: row;
    justify-content: center;
    img {
        width: calc( 15% );
    }
`;
export const ReviewEditBox = styled.li`
    width: calc( 10% );
    text-align: center;
`;

export const MainImg = styled.div`
    width: 160px;
    min-width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(240, 240, 240);
    box-shadow: 0 0 1px 1px rgba(40, 40, 40, 0);
    transition: all 400ms;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 2px 2px rgba(40, 40, 40, 0.1);
    }
    img {
        max-width: 60%;
        height: auto;
    }
`;

export const SubImg = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 10px;
    transition: all 400ms;
    box-shadow: 0 0 1px 1px rgba(40, 40, 40, 0);
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 1px 1px rgba(40, 40, 40, 0.4);
    }
`;

export const TableNumSelector = styled.div`
    width: 1200px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 100px;
    button {
        background-color: rgb(250, 250, 250);
        border: 1px solid rgb(180, 180, 180);
        color: rgb(80, 80, 80);
        width: 45px;
        height: 45px;
        transition: all 400ms;
        text-align: center;
        margin: 0 2px;
    }
    button:hover {
        background-color: rgb(40, 40, 40);
        border: 1px solid rgb(40, 40, 40);
        color: rgb(250, 250, 250);
        cursor: pointer;
    }
    button.sel {
        background-color: rgb(40, 40, 40);
        border: 1px solid rgb(40, 40, 40);
        color: rgb(250, 250, 250);
    }
`;