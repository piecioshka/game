function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      console.log('[*] Image %s loaded.', url);
      resolve();
    };
    img.onerror = () => reject();
    img.src = url;
  });
}

const AssetsLoader = {
  loadImages(images) {
    return Promise.all(images.map(loadImage));
  },
};

module.exports = {
  AssetsLoader,
};
