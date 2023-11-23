import { useState, useEffect, useRef } from "react";
import { Icon } from '@iconify/react';
import styled from "styled-components";
import ZeroStar from '../../assets/user/review/review_zero_star.png';
import HalfStar from '../../assets/user/review/review_half_star.png';
import PerfectStar from '../../assets/user/review/review_perfect_star.png';
import * as S from './ProductReviewStyle';
import * as MS from '../Modal/ModalStyle';

const viewMethod = ["최신순(오름차순)", "최신순(내림차순)", "별점순(오름차순)", "별점순(내림차순)"];

export default function ProductReview({ changeReviewY, productName }) {
    const productReviewRef = useRef(null);
    const [reviewContent, setReviewContent] = useState([]);
    const [filteredReviewContent, setFilteredReviewContent] = useState([]);
    const [currentReviews, setCurrentReviews] = useState([]);
    const [selectedReviewType, setSelectedReviewType] = useState("all");
    const [viewMethodNum, setViewMethodNum] = useState(0);
    const [viewMethodDisplay, setViewMethodDisplay] = useState(false);
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const viewMethodSelectorRef = useRef(null);
    const [imgView, setImgView] = useState(false);
    const [imgModalLink, setImgModalLink] = useState('');
    // 현재 페이지 상태 관리
    const [currentPage, setCurrentPage] = useState(1);

    const handleScroll = () => {
        if (productReviewRef.current) {
            const reviewY = productReviewRef.current.getBoundingClientRect().top + window.scrollY;
            changeReviewY(reviewY);
        }
    };

    function reivewLoader() {   
        fetch(`http://localhost:3001/api/products/reviewTable`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productName }),
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        // 서버에서 받아온 데이터 처리
        setReviewContent(data.review);
        setIsReviewLoading(true);
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                viewMethodSelectorRef.current &&
                !viewMethodSelectorRef.current.contains(event.target)
            ) {
                setViewMethodDisplay(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        reivewLoader();
    },[isReviewLoading]);

    function transformStar(number) {
        const maxStars = 5;
        const fullStars = Math.floor(number);
        const hasHalfStar = number % 1 !== 0;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
          stars.push(<img key={i} src={PerfectStar} alt="Perfect Star" />);
        }
        if (hasHalfStar) {
          stars.push(<img key={fullStars} src={HalfStar} alt="Half Star" />);
        }
        const remainingStars = maxStars - fullStars - (hasHalfStar? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
          stars.push(<img key={fullStars + i + 1} src={ZeroStar} alt="Zero Star" />);
        }
        return stars;
    }

    useEffect(() => {
        if (reviewContent && reviewContent.length > 0) {
            if (selectedReviewType === "all") {
                setFilteredReviewContent(reviewContent);
            } else if (selectedReviewType === "photo") {
                setFilteredReviewContent(reviewContent.filter(item => item.review_photo.length >= 2));
            }
        }
    },[reviewContent, selectedReviewType]);

    const sortedReviewContent = filteredReviewContent && filteredReviewContent.length > 0 && [...filteredReviewContent]; // 복사해서 새로운 배열 생성

    if (sortedReviewContent && sortedReviewContent.length > 0) {
        if ( viewMethodNum === 0) {
            // 최신순 정렬
            sortedReviewContent.sort((a, b) => new Date(b.review_edit_date) - new Date(a.review_edit_date));
        } else if ( viewMethodNum === 1) {
            // 오래된 순 정렬
            sortedReviewContent.sort((a, b) => new Date(a.review_edit_date) - new Date(b.review_edit_date));
        } else if ( viewMethodNum === 2) {
            // 높은 순 정렬
            sortedReviewContent.sort((a, b) => b.review_star_points - a.review_star_points);
        } else if ( viewMethodNum === 3) {
            // 낮은 순 정렬
            sortedReviewContent.sort((a, b) => a.review_star_points - b.review_star_points);
        }
    }

    // 페이지당 리뷰 수
    const reviewsPerPage =  5;
    // 현재 페이지의 리뷰 목록 계산
    const startIndex =  (currentPage - 1) * reviewsPerPage;
    const endIndex =  startIndex + reviewsPerPage;
    useEffect(() => {
        if (filteredReviewContent && filteredReviewContent.length > 0) {
            setCurrentReviews(sortedReviewContent.slice(startIndex, endIndex));
        }
    },[startIndex, endIndex, currentPage, filteredReviewContent, viewMethodNum]);
    // 페이지 수 계산
    const pageCount =  sortedReviewContent && sortedReviewContent.length > 0 && Math.ceil(sortedReviewContent.length / reviewsPerPage);
    // 10페이지 단위로 끊어서 보이도록 설정
    const visiblePageCount = 10;
    const startPage =  Math.floor((currentPage - 1) / visiblePageCount) * visiblePageCount + 1;
    const endPage =  Math.min(startPage + visiblePageCount - 1, pageCount);

    function changeViewMethod(item) {
        if (item === "최신순(오름차순)") {
            setViewMethodNum(0);
        } else if (item === "최신순(내림차순)") {
            setViewMethodNum(1);
        } else if (item === "별점순(오름차순)") {
            setViewMethodNum(2);
        } else if (item === "별점순(내림차순)") {
            setViewMethodNum(3);
        }
        setViewMethodDisplay(false);
    }

    // 페이지 변경 함수
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function openImgModal(photo) {
        setImgView(true);
        setImgModalLink(photo);
    }
    function closeImgModal() {
        setImgView(false);
    }

    return (
        <>
        <S.Container ref={productReviewRef}>
            <S.Wrapper>
                <S.Title>리뷰</S.Title>
                <S.TableSeparator>
                    <div>
                        <S.FilterReviewBtn
                            className={selectedReviewType === "all" ? "sel" : ""}
                            onClick={() => setSelectedReviewType("all")}
                        >전체리뷰&#40;{reviewContent? reviewContent.length : 0}&#41;</S.FilterReviewBtn>|
                        <S.FilterReviewBtn
                            className={selectedReviewType === "photo" ? "sel" : ""}
                            onClick={() => setSelectedReviewType("photo")}
                        >포토리뷰&#40;{reviewContent? reviewContent.filter(item => item.review_photo.length >= 2).length : 0}&#41;</S.FilterReviewBtn>
                    </div>
                    <div>
                        <S.ViewMethodSelector ref={viewMethodSelectorRef}>
                            <span onClick={() => setViewMethodDisplay(!viewMethodDisplay)}>{viewMethod[viewMethodNum]}
                                <Icon icon="icon-park-solid:down-one" rotate={viewMethodDisplay? 2:0} />
                            </span>
                            <ul style={{ display: viewMethodDisplay? "block" : "none" }}>
                                {viewMethod.filter((_, index) => index !== viewMethodNum).map((item, index) => (
                                    <li key={index} onClick={() => changeViewMethod(item)}>{item}</li>
                                ))}
                            </ul>
                        </S.ViewMethodSelector>
                        <S.WriteReviewBtn>리뷰쓰기</S.WriteReviewBtn>
                    </div>
                </S.TableSeparator>
                <S.ReviewTable>
                        <S.TableHead>
                            <ul>
                                <li>리뷰내용</li>
                                <li>별점</li>
                                <li>작성일자</li>
                                <li>작성자</li>
                            </ul>
                        </S.TableHead>
                        <S.TableBody>
                            {currentReviews && currentReviews.length > 0 &&
                            currentReviews.map((item, index) => (
                                <ul key={index}>
                                    <S.ReviewContentBox>
                                        {item.review_photo.length > 0 &&
                                            <S.MainImg onClick={() => openImgModal(item.review_photo[0])}>
                                                <img src={item.review_photo[0]} />
                                            </S.MainImg>
                                        }
                                        <div>
                                            <S.ContentHeader>
                                                {item.review_photo.length >= 2 &&
                                                    item.review_photo.slice(1).map((photoItem, photoIndex) => (
                                                        <S.SubImg key={photoIndex} src={photoItem} onClick={() => openImgModal(photoItem)}/>
                                                    ))
                                                }
                                                <S.ContentTitle>
                                                    <h3>{item.review_title}</h3>
                                                    <p>{item.review_product_name}-{item.review_product_option}</p>
                                                </S.ContentTitle>
                                            </S.ContentHeader>
                                            <span>{item.review_content}</span>
                                        </div>
                                    </S.ReviewContentBox>
                                    <S.ReviewStarBox>{transformStar(item.review_star_points)}</S.ReviewStarBox>
                                    <S.ReviewEditBox>{new Date(item.review_edit_date).toISOString().slice(0, 10)}</S.ReviewEditBox>
                                    <S.ReviewEditBox>{item.review_editor.replace(/(.)(?<=.)(?=.$)/g,'*')}</S.ReviewEditBox>
                                </ul>
                            ))}
                        </S.TableBody>
                        <S.TableNumSelector>
                            <div>
                                {/* 이전 페이지 버튼 */}
                                <button onClick={() => changePage(1)} disabled={currentPage === 1}>
                                    <Icon icon="bi:play-fill" rotate={2} />
                                </button>
                                {/* 페이지 버튼들 생성 */}
                                {Array.from({ length: visiblePageCount }, (_, index) => startPage + index)
                                    .filter((pageNumber) => pageNumber <= pageCount)
                                    .map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => changePage(pageNumber)}
                                        className={currentPage === pageNumber ? 'sel' : ''}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                {/* 다음 페이지 버튼 */}
                                <button onClick={() => changePage(pageCount)} disabled={currentPage === pageCount}>
                                    <Icon icon="bi:play-fill" />
                                </button>
                            </div>
                        </S.TableNumSelector>
                </S.ReviewTable>
            </S.Wrapper>
        </S.Container>
        <MS.Overlay $showModal={imgView} />
        <MS.Modal $showModal={imgView} >
            <MS.ModalCloseBtn type="button" onClick={closeImgModal}>&times;</MS.ModalCloseBtn>
            <img src={imgModalLink}/>
        </MS.Modal>
        </>
    )
}