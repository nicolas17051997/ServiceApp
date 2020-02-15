//const path = require('path');
//const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//module.exports = {
//  mode: 'development',
//  entry: {
//    'polyfills': './ClientApp/polyfills.ts',
//    'app': './ClientApp/main.ts'
//  },
//  output: {
//    path: path.resolve(__dirname, './wwwroot/dist'),     // путь к каталогу выходных файлов - папка public
//    publicPath: '/dist/',
//    filename: "[name].js"       // название создаваемого файла
//  },
//  resolve: {
//    extensions: ['.ts', '.js']
//  },
//  module: {
//    rules: [   //загрузчик для ts
//      {
//        test: /\.ts$/, // определяем тип файлов
//        use: [
//          {
//            loader: 'awesome-typescript-loader',
//            options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
//          },
//          'angular2-template-loader'
//        ]
//      }, {
//        test: /\.html$/,
//        loader: 'html-loader'
//      }, {
//        test: /\.css$/,
//        include: path.resolve(__dirname, 'ClientApp/app'),
//        loader: 'raw-loader',
//      }
//    ]
//  },
//  plugins: [
//    new webpack.ContextReplacementPlugin(
//      /angular(\\|\/)core/,
//      path.resolve(__dirname, 'ClientApp'),
//       // каталог с исходными файлами
//      {} // карта маршрутов
//    ),
//    new HtmlWebpackPlugin({
//      template: './src/index.html',
//      filename: 'index.html',
//      inject: 'body'
//    }),
//    new webpack.DefinePlugin({
//      // global app config object
//      config: JSON.stringify({
//        apiUrl: 'http://localhost:4000'
//      })
//    })
//  ],
//  optimization: {
//    splitChunks: {
//      chunks: 'all',
//    },
//    runtimeChunk: true
//  },
//  devServer: {
//    historyApiFallback: true
//  }
//};
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/app/'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      // global app config object
      config: JSON.stringify({
        apiUrl: 'http://localhost:5001'
      })
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true
  },
  devServer: {
    historyApiFallback: true
  }
};
