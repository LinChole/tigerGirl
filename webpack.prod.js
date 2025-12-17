const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { HashedModuleIdsPlugin } = require('webpack')

const common = require('./webpack.common.js')

const config = {
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash].js',
    publicPath: '/' // 打包時檔案解析的路徑
  },
  // devtool: 'source-map',
  optimization: {
    minimizer: [
      // 壓縮JS
      new TerserPlugin({
        test: /\.js(x)?(\?.*)?$/i,
        exclude: /node_modules/,
        cache: true, // 啟用/禁用文件緩存
        parallel: true, // 啟用/禁用多進程並行運行
        /**
         * terserOptions: https://github.com/terser-js/terser#minify-options
         * compress: https://github.com/terser-js/terser#compress-options
         * output: https://github.com/terser-js/terser#output-options
         * output/compress article: https://segmentfault.com/a/1190000008995453
         */
        terserOptions: {
          compress: {
            warnings: false, // 當刪除沒有用處的代碼時，顯示警告
            drop_console: true // 刪除console.*函數
          },
          output: {
            beautify: false, // 是否美化輸出代碼
            comments: false // 保留所有註釋
          }
        }
      }),
      // 壓縮CSS
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    // 每次打包都會先刪除該目錄
    new CleanWebpackPlugin(['dist']),
    // 穩定 webpack 的 hash
    new HashedModuleIdsPlugin()
  ]
}

module.exports = merge(common(config.mode), config)
