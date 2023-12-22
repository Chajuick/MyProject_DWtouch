// 이미지
import MainImg from "../../../../assets/products/introImgs/products_introImgs_photobook.jpg";
import SubImgWedding from "../../../../assets/products/introImgs/products_introImgs_photobook_wedding.png";
import SubImgCouple from "../../../../assets/products/introImgs/products_introImgs_photobook_couple.png";
import SubImgTravel from "../../../../assets/products/introImgs/products_introImgs_photobook_travel.png";
import SubImgBaby from "../../../../assets/products/introImgs/products_introImgs_photobook_baby.png";

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
  title: "당신의 추억을 간직해드려요.",
  subTitle: "시간을 되돌릴 순 없지만 순간을 다시 마주할 수 있어요.",
  MainImg: MainImg, 
  typeTitle: "당신의 소중한 추억들을 나만의 포토북에 새겨보아요.",
  typeSubTitle: "저장만 해두기에는 아까운 추억, 잊혀지지 않도록 평생 간직해요.",
  typeImgs: {
    typeImg1: {
      title: "여행에서 보았던 멋진 순간들을",
      subTitle: "#여행포토북 #담아보자",
      img: SubImgTravel,
    },
    typeImg2: {
      title: "눈 깜빡할 새 자라는 아이의 모습들을",
      subTitle: "#육아포토북 #남겨보자",
      img: SubImgBaby,
    },
    typeImg3: {
      title: "행복했던 만남의 감정들을",
      subTitle: "#커플포토북 #새겨보자",
      img: SubImgCouple,
    },
    typeImg4: {
      title: "변하지 않을 가장 아름다운 약속을",
      subTitle: "#웨딩포토북 #기념하자",
      img: SubImgWedding,
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