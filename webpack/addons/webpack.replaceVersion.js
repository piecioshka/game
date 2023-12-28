'use strict';

const pkg = require('../../package.json');

const revision = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()
  .substring(0, 7);

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'string-replace-loader',
        options: {
          search: '{{engine.version}}',
          replace: `Build v${pkg.version}-${revision}`,
        },
      },
    ],
  },
};
