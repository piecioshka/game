export const Storage = {
  create(key, val) {
    try {
      const value = JSON.stringify(val);
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(err);
    }
  },

  read(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  update(key, val) {
    this.create(key, val);
  },

  delete(key) {
    localStorage.removeItem(key);
  },
};
