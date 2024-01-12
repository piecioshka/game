# Development

## How to build an application?

```bash
npm run build               # Development mode
npm run build:development   # Development mode
npm run build:production    # Production mode
```

_Open `dist/` directory in browser by `npm start`._

## How to develop an application?

```bash
npm run dev     # Use webpack-dev-server
```

_Open `dist/` directory in browser by `npm start`._

## Remove generated directory

```bash
npm run clear       # Remove only dist/
npm run clear:all   # Remove dist/ & node_modules/
```

## 🧪 Analysis of bundle file weight

If you would like to check how much a bundle file weight:

```bash
npm run build:development -- --env.addons bundleanalyzer
npm run build:production -- --env.addons bundleanalyzer
```

## 🧩 Webpack Addons

When would you like a modified Webpack configuration, please add a new "addon" to [webpack/addons/](webpack/addons/) directory.

Each addon will be merge via `webpack-merge`.

See examples:

- [webpack.bundleanalyzer.js](webpack/addons/webpack.bundleanalyzer.js)

## How to run addons?

```bash
npm run build:development -- --env addons=singleAddon
npm run build:production -- --env addons=firstAddon,secondAddon
```
