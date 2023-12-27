class Enum {
  constructor(hashmap) {
    Object.keys(hashmap).forEach((key) => {
      this[key] = String(hashmap[key]);
      this[this[key]] = key;
    });
  }
}

export { Enum };
