'use strict';

const pkg = require('../../package.json');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'string-replace-loader',
        options: {
          search: '{{engine.version}}',
          replace: pkg.version,
        },
      },
    ],
  },
};
