'use strict';

const path = require('path');
const root = path.join(__dirname, '..', '..');
const merge = require('webpack-merge');

module.exports = (env) => {
  let config = {
    entry: {
      main: path.join(root, 'src', 'main'),
    },

    output: {
      filename: 'main.js',
      path: path.join(root, 'dist'),
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
            name: '[name].[ext]',
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
  if (!env || !env.addons) return [];
  if (typeof env.addons === 'string') return env.addons.split(',');
  return env.addons;
}
