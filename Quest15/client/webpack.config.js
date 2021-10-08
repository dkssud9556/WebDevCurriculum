const path = require( 'path' );
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: `./src/ts/index${process.env.NODE_ENV === 'test' ? '-test' : ''}.ts`,
    login: `./src/ts/login${process.env.NODE_ENV === 'test' ? '-test' : ''}.ts`
  },
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Main app",
      minify: {
        collapseWhitespace: true
      },
      template: "./index.html",
      filename: "index.html",
      chunks: ['index'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      title: "Login app",
      minify: {
        collapseWhitespace: true
      },
      template: "./login.html",
      filename: "login.html",
      chunks: ['login'],
      hash: true
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist/'),
    port: 3000
  }
};
