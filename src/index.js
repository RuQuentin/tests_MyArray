class MyArray {
  constructor(...argumentsArr) {
    this.length = argumentsArr.length;

    if (this.length === 1 && typeof argumentsArr[0] === 'number') {
      for (let i = 0; i < argumentsArr[0]; i += 1) {
        this[i] = undefined;
      }
      this.length = argumentsArr[0];
    } else {
      for (let i = 0; i < this.length; i += 1) {
        this[i] = argumentsArr[i];
      }
    }
  }

  * [Symbol.iterator]() {
    for (const key in this) {
      if (Object.hasOwnProperty.call(this, key)) {
        yield this[key];
      }
    }
  }

  [Symbol.toPrimitive](hint) {
    function concatenateProperties() {
      let newString = '';

      if (this.length !== 0) {
        newString = `${Object.keys(this)[0]}: ${Object.values(this)[0]}`;

        for (let i = 1; i < 5; i++) {
          newString = `${newString}, ${Object.keys(this)[i]}: ${Object.values(this)[i]}`;
        }
      }
      return `First 5 properties are - ${newString}`;
    }

    function sumProperties() {
      let sum = 0;

      for (let i = 0; i < this.length; i++) {
        if (typeof Object.values(this)[i] === 'number') {
          sum += Object.values(this)[i];
        }
      }
      return sum;
    }

    switch (hint) {
    case 'string':
      return concatenateProperties.call(this);
    case 'number':
      return sumProperties.call(this);
    default:
      return 'WTF?!';
    }
  }
}

// ===================== PUSH =====================
MyArray.prototype.push = function(...argumentsArr) {
  const argLength = argumentsArr.length;

  for (let i = 0; i < argLength; i += 1) {
    this[this.length] = argumentsArr[i];
    this.length += 1;
  }
  return this.length;
};

// ===================== POP =====================
MyArray.prototype.pop = function() {
  const lastItem = this[this.length - 1];
  delete this[this.length - 1];

  if (this.length) {
    this.length -= 1;
  }
  return lastItem;
};

// ===================== FROM =====================
MyArray.from = function(arrayLike, callback, thisArg) {
  const newArray = new MyArray();
  newArray.length = arrayLike.length;
  const context = thisArg !== undefined ? thisArg : this;

  if (callback) {
    for (let i = 0; i < newArray.length; i += 1) {
      newArray[i] = callback.call(context, arrayLike[i], i, arrayLike);
    }
  }

  if (!callback && !thisArg) {
    for (let i = 0; i < newArray.length; i += 1) {
      newArray[i] = arrayLike[i];
    }
  }

  return newArray;
};

// ===================== MAP =====================
MyArray.prototype.map = function(callback, thisArg) {
  const newArray = new MyArray();
  const context = thisArg !== undefined ? thisArg : this;

  for (let i = 0; i < this.length; i += 1) {
    newArray.push(callback.call(context, this[i], i, this));
  }

  return newArray;
};

// =================== forEach ===================
MyArray.prototype.forEach = function(callback, thisArg) {
  const context = thisArg !== undefined ? thisArg : this;

  for (let i = 0; i < this.length; i += 1) {
    callback.call(context, this[i], i, this);
  }

  return undefined;
};

// =================== REDUCE ====================
MyArray.prototype.reduce = function(callback, initValue) {
  if (this.length === 0 && initValue === undefined) {
    throw new TypeError('You haven`t passed any value needed');
  }

  let accumulator = initValue !== undefined ? initValue : this[0];

  if (initValue === undefined) {
    for (let i = 1; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  if (initValue !== undefined) {
    for (let i = 0; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

// ===================== FILTER =====================
MyArray.prototype.filter = function(callback, thisArg) {
  const newArray = new MyArray();
  const context = thisArg !== undefined ? thisArg : this;

  for (let i = 0; i < this.length; i += 1) {
    if (callback.call(context, this[i], i, this)) {
      newArray.push(this[i]);
    }
  }

  return newArray;
};

// =================== SORT ===================
MyArray.prototype.sort = function(callback) {
  let buffer = this[0];

  switch (callback) {
  case undefined:
    for (let j = 0; j < this.length; j++) {
      let flag = 0;

      for (let i = 0; i < this.length - 1; i++) {
        if (String(this[i]) > String(this[i + 1])) {
          buffer = this[i];
          this[i] = this[i + 1];
          this[i + 1] = buffer;
          flag += 1;
        }
      }

      if (flag === 0) {
        break;
      }
    }
    return this;

  default:
    for (let j = 0; j < this.length; j++) {
      let flag = 0;

      for (let i = 0; i < this.length - 1; i++) {
        if (callback(this[i], this[i + 1]) > 0) {
          buffer = this[i];
          this[i] = this[i + 1];
          this[i + 1] = buffer;
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
  if (this.length === 0) {
    return '';
  }

  let newString = String(this[0]);

  for (let i = 1; i < this.length; i++) {
    newString = `${newString},${this[i]}`;
  }

  return newString;
};

// ===================== FIND =====================
MyArray.prototype.find = function(callback, thisArg) {
  const context = thisArg !== undefined ? thisArg : this;

  for (let i = 0; i < this.length; i += 1) {
    if (callback.call(context, this[i], i, this)) {
      const targetElement = this[i];

      return targetElement;
    }
  }
};

// ===================== SLICE =====================
MyArray.prototype.slice = function(begin, end) {
  const newArray = new MyArray();
  let from = 0;
  let to = this.length;

  if (begin > this.length) {
    return newArray;
  }

  if (begin > 0) {
    from = begin;
  }

  if (begin < 0 && Math.abs(begin) < this.length) {
    from = this.length + begin;
  }

  if (end < 0) {
    to = this.length + end;
  }

  if (end >= 0 && end <= this.length) {
    to = end;
  }

  for (let i = from; i < to; i++) {
    newArray.push(this[i]);
  }

  return newArray;
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
//           value: that[i++]
//         };
//       } else {
//         return {
//           done: true
//         };
//       }
//     }
//   };
// };

export default MyArray;