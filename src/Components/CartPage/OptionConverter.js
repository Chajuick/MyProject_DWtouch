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