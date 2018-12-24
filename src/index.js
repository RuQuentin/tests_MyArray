class MyArray {
  constructor(...argumentsArr) {
    const argLength = argumentsArr.length;

    if (argLength === 1 && typeof argumentsArr[0] === 'number') {
      for (let i = 0; i < argumentsArr[0]; i += 1) {
        this[i] = undefined;
      }
      this.length = argumentsArr[0];
    } else {
      for (let i = 0; i < argLength; i += 1) {
        this[i] = argumentsArr[i];
      }
      this.length = argLength;
    }
  }

  * [Symbol.iterator]() {
    for (const key in this) {
      if (Object.hasOwnProperty.call(this, key)) {
        yield this[key];
      }
    }
  }
}

// ===================== PUSH =====================
MyArray.prototype.push = function(...argumentsArr) {
  const argLength = argumentsArr.length;

  for (let i = 0; i < argLength; i += 1) {
    this[String(this.length)] = argumentsArr[i];
    this.length += 1;
  }
  return this.length;
};

// ===================== POP =====================
MyArray.prototype.pop = function() {
  const lastItem = this[String(this.length - 1)];
  delete this[String(this.length - 1)];

  if (this.length) {
    this.length -= 1;
  }
  return lastItem;
};

// ===================== FROM =====================
MyArray.from = function(arrayLike, callback, thisArg) {
  const newArray = new MyArray();
  const argLength = arrayLike.length;
  const context = thisArg ? thisArg : this;

  if (callback) {
    for (let i = 0; i < argLength; i += 1) {
      newArray[i] = callback.call(context, arrayLike[i], i, arrayLike);
    }
  }

  if (!callback && !thisArg) {
    for (let i = 0; i < argLength; i += 1) {
      newArray[i] = arrayLike[i];
    }
  }

  newArray.length = argLength;

  return newArray;
};

// ===================== MAP =====================
MyArray.prototype.map = function(callback, thisArg) {
  const newArray = new MyArray();
  const arrLength = this.length;

  if (thisArg) {
    for (let i = 0; i < arrLength; i += 1) {
      newArray.push(callback.call(thisArg, this[i], i, this));
    }
  } else {
    for (let i = 0; i < arrLength; i++) {
      newArray.push(callback(this[i], i, this));
    }
  }

  return newArray;
};

// =================== forEach ===================
MyArray.prototype.forEach = function(callback, thisArg) {
  const arrLength = this.length;

  if (thisArg) {
    for (let i = 0; i < arrLength; i += 1) {
      callback.call(thisArg, this[i], i, this);
    }
  } else {
    for (let i = 0; i < arrLength; i++) {
      callback(this[i], i, this);
    }
  }
  return undefined;
};

// =================== REDUCE ====================
MyArray.prototype.reduce = function(callback, initValue) {
  const arrLength = this.length;

  if (arrLength === 0 && initValue === undefined) {
    throw new TypeError('You haven`t passed any value needed');
  }

  let accumulator = initValue !== undefined ? initValue : this[0];

  if (initValue === undefined) {
    for (let i = 1; i < arrLength; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  if (initValue !== undefined) {
    for (let i = 0; i < arrLength; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

// ===================== FILTER =====================
MyArray.prototype.filter = function(callback, thisArg) {
  const newArray = new MyArray();
  const arrLength = this.length;

  if (thisArg) {
    for (let i = 0; i < arrLength; i += 1) {
      if (callback.call(thisArg, this[i], i, this)) {
        newArray.push(this[i]);
      }
    }
  } else {
    for (let i = 0; i < arrLength; i++) {
      if (callback(this[i], i, this)) {
        newArray.push(this[i]);
      }
    }
  }
  return newArray;
};

// =================== SORT ===================
MyArray.prototype.sort = function(callback) {
  const arrLength = this.length;
  let buffer = this[String(0)];

  switch (callback) {
  case undefined:
    for (let j = 0; j < arrLength; j++) {
      let flag = 0;

      for (let i = 0; i < arrLength - 1; i++) {
        if (String(this[i]) > String(this[String(i + 1)])) {
          buffer = this[i];
          this[i] = this[String(i + 1)];
          this[String(i + 1)] = buffer;
          flag += 1;
        }
      }

      if (flag === 0) {
        break;
      }
    }
    return this;

  default:
    for (let j = 0; j < arrLength; j++) {
      let flag = 0;

      for (let i = 0; i < arrLength - 1; i++) {
        if (callback(this[i], this[String(i + 1)]) > 0) {
          buffer = this[i];
          this[i] = this[String(i + 1)];
          this[String(i + 1)] = buffer;
          flag += 1;
        }
      }

      if (flag === 0) {
        break;
      }
      return this;
    }
  }
};

// ===================== toString =====================
MyArray.prototype.toString = function() {
  const arrLength = this.length;

  if (arrLength === 0) {
    return '';
  }

  let newString = String(this[String(0)]);

  for (let i = 1; i < arrLength; i++) {
    newString = `${newString},${this[i]}`;
  }

  return newString;
};

// ===================== FIND =====================
MyArray.prototype.find = function(callback, thisArg) {
  const arrLength = this.length;

  if (thisArg) {
    for (let i = 0; i < arrLength; i += 1) {
      if (callback.call(thisArg, this[i], i, this)) {
        const targetElement = this[i];

        return targetElement;
      }
    }
  } else {
    for (let i = 0; i < arrLength; i++) {
      if (callback(this[i], i, this)) {
        const targetElement = this[i];

        return targetElement;
      }
    }
  }
};

// ===================== REST =====================
// MyArray.prototype[Symbol.iterator] = function() {
//   let i = 0;
//   const arrLength = this.length;
//   const that = this;

//   return {
//     next(arr1) {
//       if (i < arrLength) {
//         return {
//           done: false,
//           value: that[String(i++)]
//         };
//       } else {
//         return {
//           done: true
//         };
//       }
//     }
//   };
// };

// === Test INPUT DATA
// const arr1 = new MyArray("sdfs", 5, { name: "ivan" }, [15, 12]);

// === Test CONSTRUCTOR
// const arr2 = new MyArray(2, "h", "uiu", 1);
// console.log(arr2.length);
// console.log(arr2);

// === Test LENGTH
// console.log(arr1.length);
// console.log(arr1.hasOwnProperty(length));

// === Test PUSH
// arr1.push(6, 12);
// console.log(arr1.push(6, 12));
// console.log(arr1);

// === Test POP
// console.log(arr1.pop());
// console.log(arr1);

// === Test FROM
// const objectAside = Object.create({ 0: 2 });
// const arr2 = MyArray.from([[2, 1], { 0: 1, 1: "654" }, 3, "dsfsdf"]);
// const arr2 = MyArray.from("sdfsdfs");
// const arr2 = MyArray.from([1, 2, 3], someFunction, objectAside);
// console.log(arr2);
// const arr3 = Array.from([1, 2, 3], someFunction, objectAside);
// console.log(arr3);

// === Test MAP
// const arr2 = new MyArray(1, 2, "abc", 4, 5);
// function someFunction(item, index, array) {
//   return `${item} is an element #${index}  in array ${array} and!!! ${this[0]}`;
// return item;
// }
// const objectAside = Object.create({ 0: 2 });
// const arr3 = arr2.map(item => item * 2);
// const arr3 = arr2.map(someFunction, objectAside);
// console.log(arr3);
// // console.log(arr3[1] === arr2[1]);

// === Test forEach
// const objectAside = Object.create({ 0: 2 });
// const arr2 = new MyArray(1, 2, "abc", 4, 5);
// const arr3 = new MyArray();
// function someFunction(item, index, array) {
// console.log(
// `${item} is an element #${index}  in array ${array} and!!! ${this[0]}`
// );
//   arr3[index] = item;
// }
// arr2.forEach(someFunction, objectAside);
// console.log(arr2[1] === arr3[1]);

// === Test REDUCE
// function callback(accumulator, item) {
//   return accumulator + item;
// }
// function callback(accumulator, item) {
//   return accumulator.concat(item);
// }
// const initValue = 52;
// const arr2 = new MyArray([0, 1], [2, 3], [4, 5]);
// let b = arr2.reduce(callback, [-2, -1]);
// console.log(b);

// const initValue = 52;
// const arr2 = [2, 3, 5];
// let b = arr2.reduce(callback, initValue);
// console.log(b);

// === Test FILTER
// const objectAside = Object.create({ 0: 2 });
// const arr2 = new MyArray(1, 256, "abc", 4, 51.56);
// function someFunction(item, index, array) {
//   if (this[0] == 2) return Number.isInteger(item);
// }
// const arr3 = arr2.filter(someFunction);
// console.log(arr3);

// === Test SORT
// const arr2 = new MyArray(5, 2, 3, 8, 6, 0, 89, 7, 90, 100, 2000);
// arr2.sort((a, b) => a - b);
// console.log(arr2);

// === Test ToString
// const arr2 = new MyArray([2, 1], { 0: 1, 1: "654" }, 3, "dsfsdf");
// const arr3 = arr2.toString();
// console.log(arr3);

// === Test REST
// const realArr = [...arr1];
// console.log(arr1.length);
// console.log(realArr)

export default MyArray;