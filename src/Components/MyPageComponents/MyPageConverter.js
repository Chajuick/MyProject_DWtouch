export function NeedAmount(item, grade, amount) {
  if (grade === 1) {
    if (item === 0) {
      return 1;
    } else if (item === 1) {
      return 0;
    }
  } else if (grade === 2) {
    if (item === 0) {
      return 3 - amount;
    } else if (item === 1) {
      return 0;
    }
  } else if (grade === 3) {
    if (item === 0) {
      return 5 - amount;
    } else if (item === 1) {
      if (amount > 100000) {
        return 0;
      } else {
        return 100000 - amount;
      }
    }
  } else if (grade === 4) {
    if (item === 0) {
      return 10 - amount;
    } else if (item === 1) {
      if (amount > 500000) {
        return 0;
      } else {
        return 500000 - amount;
      }
    }
  } 
}