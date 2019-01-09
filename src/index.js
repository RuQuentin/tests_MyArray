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
  if (!this.length) {
    return undefined;
  }

  const lastItem = this[this.length - 1];
  delete this[this.length - 1];
  this.length -= 1;

  return lastItem;
};

// ===================== FROM =====================
MyArray.from = function(arrayLike, callback, thisArg = this) {
  const newArray = new MyArray();
  newArray.length = arrayLike.length;

  if (callback) {
    for (let i = 0; i < newArray.length; i += 1) {
      newArray[i] = callback.call(thisArg, arrayLike[i], i, arrayLike);
    }
  } else {
    for (let i = 0; i < newArray.length; i += 1) {
      newArray[i] = arrayLike[i];
    }
  }

  return newArray;
};

// ===================== MAP =====================
MyArray.prototype.map = function(callback, thisArg = this) {
  const newArray = new MyArray();

  for (let i = 0; i < this.length; i += 1) {
    newArray.push(callback.call(thisArg, this[i], i, this));
  }

  return newArray;
};

// =================== forEach ===================
MyArray.prototype.forEach = function(callback, thisArg = this) {
  for (let i = 0; i < this.length; i += 1) {
    callback.call(thisArg, this[i], i, this);
  }
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
MyArray.prototype.filter = function(callback, thisArg = this) {
  const newArray = new MyArray();

  for (let i = 0; i < this.length; i += 1) {
    if (callback.call(thisArg, this[i], i, this)) {
      newArray.push(this[i]);
    }
  }

  return newArray;
};

// =================== SORT ===================
MyArray.prototype.sort = function(callback) {
  function cbDefault(a, b) {
    const result = `${a}` > `${b}` ? 1 : 0;

    return result;
  }

  let buffer = this[0];
  const cb = callback ? callback : cbDefault;

  for (let j = 0; j < this.length; j++) {
    let flag = 0;

    for (let i = 0; i < this.length - 1; i++) {
      if (cb(this[i], this[i + 1]) > 0) {
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
};

// ===================== toString =====================
MyArray.prototype.toString = function() {
  if (this.length === 0) {
    return '';
  }

  let newString = String(this[0]);

  for (let i = 1; i < this.length; i++) {
    newString += `,${this[i]}`;
  }

  return newString;
};

// ===================== FIND =====================
MyArray.prototype.find = function(callback, thisArg = this) {
  for (let i = 0; i < this.length; i += 1) {
    if (callback.call(thisArg, this[i], i, this)) {
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

export default MyArray;