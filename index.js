import express from 'express';
import path from 'path';

const app = express();
const publicFolder = path.resolve(__dirname, './src');
app.use(express.static(publicFolder));

if (process.env.NODE_ENV !== 'development') {
  app.get('*', (req, res) => res.sendFile(path.resolve(publicFolder, 'index.html')));
} else {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  // To prevent these from loading in production, we need to use a scoped require
  const { addStarterMiddleware } = require('@vizworx/webpack-starter');
  const webpackConfig = require('./webpack.config.babel').default;
  addStarterMiddleware(app, webpackConfig);
  /* eslint-enable global-require, import/no-extraneous-dependencies */
}

// eslint-disable-next-line no-console
app.listen(3000, () => console.log(`Listening on http://localhost:3000 (${process.env.NODE_ENV})`));
