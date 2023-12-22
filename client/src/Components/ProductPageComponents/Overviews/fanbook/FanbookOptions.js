// 이미지
import MainImg from "../../../../assets/products/introImgs/products_introImgs_fanbook.jpg";
import SubImgIdol from "../../../../assets/products/introImgs/products_introImgs_fanbook_idol.jpg";
import SubImgSports from "../../../../assets/products/introImgs/products_introImgs_fanbook_sports.jpg";
import SubImgMovie from "../../../../assets/products/introImgs/products_introImgs_fanbook_movie.jpg";
import SubImgBook from "../../../../assets/products/introImgs/products_introImgs_fanbook_book.jpg";

export const options = [
  ["사이즈 ( cm )", "27x27", "21.6x21.6", "16.2x16.2"],
  ["커버", "하드커버", "레더커버"],
  ["커버코팅", "무광", "유광"],
  ["커버색상", "블랙", "핑크", "레드", "블루", "민트", "엘로", "오렌지"],
  ["내지", "무광지", "유광지"],
];

export const optFamily = {
  isFamily: true,
  parentsOpt: 1,
  childOpts: {
      childOpt1: 2,
      childOpt2: 3,
  },
  priceModifier: [
      ["*", 2, 1.5, 1],
      ["+", 0, 4000],
      null,
      null,
      null,
  ]
};

export const introGuider = {
  title: "넘치는 팬심을 표현해보아요.",
  subTitle: "당신의 열정을 담아두고 사랑을 그려보아요.",
  MainImg: MainImg, 
  typeTitle: "당신의 소중한 열정을 나만의 팬북에 담아보아요.",
  typeSubTitle: "순간의 감정을 특별하게 기록하고, 사랑을 평생 간직해요.",
  typeImgs: {
    typeImg1: {
      title: "좋아하는 아이돌의 무대를",
      subTitle: "#아이돌팬북 #기억해보자",
      img: SubImgIdol,
    },
    typeImg2: {
      title: "최애 스포츠 팀의 활약을",
      subTitle: "#스포츠팬북 #추억살리기",
      img: SubImgSports,
    },
    typeImg3: {
      title: "인생작을 즐겨본 영화 감상일지",
      subTitle: "#영화팬북 #나만의리뷰",
      img: SubImgMovie,
    },
    typeImg4: {
      title: "책 속에서 만난 소설 속 영웅들을",
      subTitle: "#도서팬북 #마음과함께",
      img: SubImgBook,
    }
  }
};

export const detailTextGuider = {
  detail1: [
      ["상품 기본 정보"],
      ["유의사항", 
      "포토북 제작 특성상 모니터 화면(기기)에 따라 색상이 다르게 보일 수 있습니다.",
      "포토북은 편집한 그대로 제작 및 발송 됩니다."],
      ["품질보증기준",
      "본 제품은 SNAPS Assurance의 엄격한 품질검사를 통과하였고 라이선스를 보증합니다.",
      "본 제품의 품질에 이상이 있으실 경우 주문일로부터 7일 이내에 100% 재제작 또는 환불 가능합니다."],
      ["교환 / 반품 안내",
      "커스텀 제품 특성상 제작 중 취소 불가합니다.",
      "커스텀 제품 특성상 교환/반품이 불가합니다(불량제외)."],
      ["고객만족센터",
      "1577-4701"],
  ],
  detail2: [
      ["유의사항 안내"],
      ["인쇄 유의사항", 
      "스냅스에서 제공하는 시스템은 RGB 인쇄에 맞춰져 있습니다. RGB 이미지를 준비해 주세요.",
      "ICC profile 파일인 경우 색감 원본 그대로 제작되지 않을 수 있습니다.",
      "ICC profile 해제는 이미지 변환 소프트웨어를 사용하여 재저장 한 후 사용가능합니다.",
      "선명한 인쇄를 위해 권장 해상도 이상의 이미지를 준비해 주세요. 편집기 내에서 느낌표 아이콘이 뜰 경우 인쇄가 흐리게 나올 수 있습니다."],
      ["제본 유의사항",
      "스냅스 포토북은 pur제본으로, 책이 완전히 펼쳐지는 것은 불량이 아닙니다.",
      "제본 특성 상 책등과 내지가 완전히 붙어있지 않을 수 있으나, 내구성 및 품질에는 영향이 없습니다."],
  ],
};