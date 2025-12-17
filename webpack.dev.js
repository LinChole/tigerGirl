const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const recordsPath = path.resolve(__dirname, 'records.json')

const common = require('./webpack.common.js')

const config = {
  mode: 'development',
  output: {
    filename: '[name].js',
    publicPath: '/' // 打包時檔案解析的路徑
  },
  recordsPath: recordsPath, // 紀錄儲存的位置
  devtool: 'inline-source-map',
  devServer: {
    compress: true, // gzip壓縮
    contentBase: 'src/www', // 指定靜態檔案(不會被打包)放置的目錄
    historyApiFallback: true, // 讓所有定址都導向index.html
    host: 'localhost', // 如果希望localhost之外也能查看，請指定為 0.0.0.0
    hot: true, // 熱模組加載，需搭配plugins的HotModuleReplacementPlugin()元件
    inline: true, // 當元件重新編譯時，建構的訊息會顯示在f12 console
    noInfo: false, // 啟動時和每次儲存時的訊息，不會顯示出來。錯誤和警告仍然會顯示
    open: true, // 每次啟動server都會自動打開瀏覽器
    port: 8008 // 監聽請求的連接埠

    /** 只適用於cli指令 */
    // colors   輸出到cmd上的訊息為彩色
    // progress 將執行進度輸出到cmd上面
  },
  optimization: {
    portableRecords: true // 是否開啟紀錄
  },
  plugins: [
    // 啟動熱模組加載
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(common(config.mode), config)