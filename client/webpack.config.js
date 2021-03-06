const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: './src/index.tsx',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: 4
    })]
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.html?/,
        use: 'html-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.scss?/,
        use: ['style-loader', 'css-loader'],
        exclude: '/node_modules'
      }
    ]
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ]
}