export function OptionPriceCalculator( price, operator, optionPrice ) {
  let updatedPrice = 0;
  if (operator === "*") {
    updatedPrice = price * optionPrice;
  } else if (operator === "+") {
    updatedPrice = price + optionPrice;
  }
  if (operator === "") {
    updatedPrice = price;
  }
  return parseInt((updatedPrice) / 10) * 10;
}

// 포토북 메인 이미지 지정
export function PhotobookMainImgSetter( selectedOptionIndexes, productImgs) {
  let newMainImg = '';
  if (productImgs && productImgs.length > 0) {
      if (selectedOptionIndexes[1] === 0) {
          if (selectedOptionIndexes[2] === 0) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[0].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[1].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[2].img;};
          } else if (selectedOptionIndexes[2] === 1) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[3].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[4].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[5].img;};
          }
      } else if (selectedOptionIndexes[1] === 1) {
          if (selectedOptionIndexes[3] === 0) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[6].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[7].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[8].img;};
          } else if (selectedOptionIndexes[3] === 1) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[9].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[10].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[11].img;};
          } else if (selectedOptionIndexes[3] === 2) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[12].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[13].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[14].img;};
          } else if (selectedOptionIndexes[3] === 3) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[15].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[16].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[17].img;};
          } else if (selectedOptionIndexes[3] === 4) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[18].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[19].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[20].img;};
          } else if (selectedOptionIndexes[3] === 5) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[21].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[22].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[23].img;};
          } else if (selectedOptionIndexes[3] === 6) {
              if (selectedOptionIndexes[0] === 0) {newMainImg = productImgs[24].img;} else
              if (selectedOptionIndexes[0] === 1) {newMainImg = productImgs[25].img;} else
              if (selectedOptionIndexes[0] === 2) {newMainImg = productImgs[26].img;};
          }
      }
  }
  return newMainImg;
}