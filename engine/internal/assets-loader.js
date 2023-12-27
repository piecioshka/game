export const EngineAssetsLoader = {
  assetsLoaded: new Map(),

  load(assets) {
    return Promise.all(
      Object.keys(assets).map((key) => this.loadImage(key, assets[key]))
    );
  },

  loadImage(key, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.assetsLoaded.set(key, img);
        resolve(img);
      };
      img.onerror = () => reject();
      img.src = url;
    });
  },

  getLoadedAsset(assetId) {
    return this.assetsLoaded.get(assetId);
  },
};
