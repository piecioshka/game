const Storage = {
  put(key, val) {
    return localStorage.setItem(key, JSON.stringify(val));
  },

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};

module.exports = {
  Storage,
};
