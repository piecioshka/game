'use strict';

const path = require('path');
const root = path.join(__dirname, '..', '..');
const merge = require('webpack-merge');

module.exports = (env) => {
  let config = {
    entry: {
      'no-collision-and-gravity': path.join(root, 'examples', 'no-collision-and-gravity', 'main'),
    },

    output: {
      filename: '[name]/main.js',
      path: path.join(root, 'dist'),
    },

    resolve: {
      alias: {
        '@engine': path.join(root, 'engine')
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: '[folder]/[name].[ext]',
          },
        },
      ],
    },

    devServer: {
      overlay: true,
    },
  };

  // Addons
  const addons = getAddons(env);
  addons.forEach((addon) => {
    config = merge.default(
      config,
      require(path.join(root, 'webpack', 'addons', `webpack.${addon}`)),
    );
  });

  return config;
};

function getAddons(env) {
  if (!env || !env.addons) {
    return [];
  }
  if (typeof env.addons === 'string') {
    return env.addons.split(',');
  }
  return env.addons;
}
