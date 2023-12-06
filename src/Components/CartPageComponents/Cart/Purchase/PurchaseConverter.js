export function SaleCalculator(price, limit, amount) {
  let limitPrice = 0;
  let salePrice = 0;
  if (limit > 0 && amount > 0) {
    salePrice = parseInt(price)*((amount)/100);
    if (salePrice > limitPrice) {
      return -limit;
    } else {
      return -salePrice;
    }
  } else if (limit > 0) {
    return -(parseInt(price) - parseInt(limit));
  } else if (amount > 0) {
    return -(parseInt(price)*((100-amount)/100));
  }
}

export function PaymentConvert(payment) {
  if (payment === "credit_card") {
    return "신용카드";
  } else if (payment === "bank_transfer") {
    return "실시간 계좌이체";
  } else if (payment === "deposit_without_bank") {
    return "무통장 입금";
  } else if (payment === "phone") {
    return "휴대폰 결제";
  } else if (payment === "giftcard") {
    return "상품권 결제";
  } else if (payment === "naver_pay") {
    return "네이버 페이";
  } else if (payment === "kakao_pay'") {
    return "카카오 페이";
  } else if (payment === "toss") {
    return "토스";
  }       
};

export function CategoryConvert(productName) {
  if (productName === "포토북") {
    return 2;
  } else if (productName === "팬북") {
    return 3;
  } else if (productName === "졸업앨범") {
    return 4;
  } else if (productName === "티셔츠") {
    return 5;
  } else if (productName === "맨투맨") {
    return 6;
  } else if (productName === "후드티") {
    return 7;
  } else if (productName === "에코백") {
    return 8;
  } else if (productName === "핀셋") {
    return 9;
  } else if (productName === "스마트톡") {
    return 10;
  } else if (productName === "카드지갑") {
    return 11;
  } else if (productName === "네임스티커") {
    return 12;
  } else if (productName === "굿즈스티커") {
    return 13;
  } else if (productName === "머그컵") {
    return 14;
  } else if (productName === "텀블러") {
    return 15;
  } else if (productName === "벽걸이달력") {
    return 16;
  } else if (productName === "탁상달력") {
    return 17;
  } else if (productName === "우드블럭") {
    return 18;
  } 
}

export function OptionConvert(productName, option) {
  let newOptions = [];
  if (productName === "포토북") {
    const sizes = ["27x27", "21.6x21.6", "16.2x16.2"];
    const coatings = ["무광", "유광"];
    const colors = ["블랙", "핑크", "레드", "블루", "민트", "엘로", "오렌지"];
    const inners = ["무광지", "유광지"];
    
    let size = sizes[option[0]];
    let cover = "";
    let coating = coatings[option[2]];
    let color = "";
    let inner = inners[option[4]];

    switch (option[3]) {
      case 0:
        color = "블랙";
        break;
      case 1:
        color = "핑크";
        break;
      case 2:
        color = "레드";
        break;
      case 3:
        color = "블루";
        break;
      case 4:
        color = "민트";
        break;
      case 5:
        color = "엘로";
        break;
      case 6:
        color = "오렌지";
        break;
      default:
        break;
    }

    switch (option[1]) {
      case 0:
        cover = "하드커버";
        newOptions = [size, cover, coating, inner];
        break;
      case 1:
        cover = "레더커버";
        newOptions = [size, cover, color, inner];
        break;
      default:
        break;
    }
  }

  return newOptions;
}