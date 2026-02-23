import { useMemo } from "react";
import { Link } from "react-router-dom";

import SaleBadge from "../../../assets/etc/sale.png";
import * as S from "./ListPageStyle";

import Footer from "../../../Components/CommonComponents/Footer";
import LoadingPage from "../../LoadingPage";

/** =========================
 * ✅ 상수 데이터 (포토북 리스트)
 * - item.link, sale, main_img, product_name, description_first/second, price
 *   를 이 컴포넌트가 그대로 쓰고 있음
 * ========================= */
const PHOTOBOOK_PRODUCTS = [
  {
    product_id: 1,
    product_name: "포토북",
    link: "/photobook-overview/",
    main_img: "productImgs/photobook/photobook/photobook_m_l.png",
    description_first: "디자인부터 사이즈까지 취향대로.",
    description_second: "추억을 포토북에 새겨보세요.",
    price: 20000,
    sale: 0, // % (예: 10이면 10% 할인)
  },

  // ✅ 예시(필요하면 네 상품들 추가해서 늘리면 됨)
  // {
  //   product_id: 2,
  //   product_name: "미니 포토북",
  //   link: "/photobook-mini-overview/",
  //   main_img: "productImgs/photobook/mini/mini_main.png",
  //   description_first: "작고 가볍게 들고 다니는",
  //   description_second: "미니 포토북",
  //   price: 15000,
  //   sale: 10,
  // },
];

export default function PhotobookListPage() {
  // ✅ 서버 없이도 항상 렌더 가능
  const photobookList = useMemo(() => PHOTOBOOK_PRODUCTS, []);
  const isPhotobookLoading = true;

  // 데이터가 아예 비어있으면 로딩 페이지 보여주고 싶으면 여기에서 처리 가능
  if (!isPhotobookLoading) return <LoadingPage />;

  return (
    <>
      {photobookList && photobookList.length > 0 ? (
        <>
          <S.Container>
            <S.Wrapper>
              <S.Title>포토북</S.Title>

              <S.ProductOverView>
                {photobookList.map((item) => (
                  <li key={item.product_id}>
                    <Link to={`${item.link}`}>
                      <S.AdditionalInfo>
                        {item.sale > 0 && (
                          <img src={SaleBadge} alt="세일중" className="sale" />
                        )}
                      </S.AdditionalInfo>

                      <S.Figure>
                        <img src={item.main_img} alt={item.product_name} />
                      </S.Figure>

                      <S.ProductName className="name">{item.product_name}</S.ProductName>
                      <S.ProductDetail>{item.description_first}</S.ProductDetail>
                      <S.ProductDetail>{item.description_second}</S.ProductDetail>

                      {item.sale > 0 ? (
                        <S.Price>
                          <del>{item.price.toLocaleString()}</del>
                          <span className="red">
                            {S.priceCalculate(item.price, item.sale).toLocaleString()}원~
                          </span>
                        </S.Price>
                      ) : (
                        <S.Price>
                          <span>{item.price.toLocaleString()}원~</span>
                        </S.Price>
                      )}
                    </Link>
                  </li>
                ))}
              </S.ProductOverView>
            </S.Wrapper>
          </S.Container>

          <Footer />
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}