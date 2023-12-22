export function CategoryConvert(productName) {
  let categoryNum = 0;
  if (productName === "포토북") {
    categoryNum = 2;
  } else if (productName === "팬북") {
    categoryNum = 3;
  } else if (productName === "졸업앨범") {
    categoryNum = 4;
  } else if (productName === "티셔츠") {
    categoryNum = 5;
  } else if (productName === "맨투맨") {
    categoryNum = 6;
  } else if (productName === "후드티") {
    categoryNum = 7;
  } else if (productName === "에코백") {
    categoryNum = 8;
  } else if (productName === "핀셋") {
    categoryNum = 9;
  } else if (productName === "스마트톡") {
    categoryNum = 10;
  } else if (productName === "카드지갑") {
    categoryNum = 11;
  } else if (productName === "네임스티커") {
    categoryNum = 12;
  } else if (productName === "굿즈스티커") {
    categoryNum = 13;
  } else if (productName === "머그컵") {
    categoryNum = 14;
  } else if (productName === "텀블러") {
    categoryNum = 15;
  } else if (productName === "벽걸이달력") {
    categoryNum = 16;
  } else if (productName === "탁상달력") {
    categoryNum = 17;
  } else if (productName === "우드블럭") {
    categoryNum = 18;
  }

  return categoryNum;
}