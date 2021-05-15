const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'app', 'component', 'SDApp.ts'), // enntry file
  resolve: { extensions: ['.ts', '.js'] },
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src/'),
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      // module.css이면 lit-element용 css
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          {
            loader: 'lit-scss-loader', // lit-element에서 사용가능한 css 형태로 변경
          },
        ],
      },
      // moduleX .css이면 그냥 스타일 적용
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: '/img/',
            },
          },
        ],
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'video/',
              publicPath: '/video/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'font/',
              publicPath: '/font/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public/', to: '' }],
    }),
    new HtmlWebpackPlugin({ template: './src/app/index.html' }),
  ],
};
