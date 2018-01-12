const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // плагин минимизации

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'), // устанавливаем путь к сборке
    publicPath: '/dist/', // устанавливаем публичный путь, по которому файл будет доступен
    filename: 'build.js', // устанавливаем имя файла сборки
  },
  module: {
    // добавляем модуль vue-loader для загрузки компонентов
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
          },
          // buble: {
          //   transforms: {
          //     arrow: false,
          //     templateString: false
          //   }
          // }
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new UglifyJSPlugin()],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
    },
  },
};
