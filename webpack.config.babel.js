import path from 'path';
import webpackStarter from '@vizworx/webpack-starter';

export default webpackStarter({
  html: { title: 'NWN Chat Viewer' },
  entry: './src/index.jsx',
  output: { path: path.resolve('dist') },
  styles: {
    sass: true,
  },
});
