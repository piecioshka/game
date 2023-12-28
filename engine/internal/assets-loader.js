export const EngineAssetsLoader = {
  assetsLoaded: new Map(),

  load(assets) {
    return Promise.all(
      Object.keys(assets).map((assetId) =>
        this.loadImage(assetId, assets[assetId]),
      ),
    );
  },

  loadImage(assetId, url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.assetsLoaded.set(assetId, img);
        resolve(img);
      };
      img.onerror = (reason) => reject(reason);
      img.src = url;
    });
  },

  getLoadedAsset(assetId) {
    return this.assetsLoaded.get(assetId);
  },
};
