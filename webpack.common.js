const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const srcPath = path.resolve(__dirname, 'src')
const configPath = path.resolve(__dirname, 'config')
const buildPath = path.resolve(__dirname, 'dist')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const indexPath = path.resolve(srcPath, 'app/index.js')
const cssPath = path.resolve(srcPath, 'app/styles')
const imgPath = path.resolve(srcPath, 'app/images')
const wwwPath = path.resolve(srcPath, 'www')
const reactPath = path.resolve(nodeModulesPath, 'react/dist/react.min.js')
const reactdomPath = path.resolve(nodeModulesPath, 'react-dom/dist/react-dom.min.js')

const config = mode => {
  // 判斷目前的佈署環境 (開發|上線)
  const devMode = mode !== 'production'
  console.log('mode', mode)

  const use = [
    {
      loader: devMode
        ? 'style-loader'
        : MiniCssExtractPlugin.loader,
      options: {
        hmr: devMode
      }
    }, {
      loader: 'css-loader',
      /**
       *【importLoaders】
      * 解決由於 css-loader 處理文件導入 (@import) 的方式
      * 導致 postcss-loader 不能正常使用的問題
      */
      options: { importLoaders: 1 }
    }, {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: [
              // 'last 10 Chrome versions',
              // 'last 5 Firefox versions',
              'Safari >= 6',
              'ie > 8',
              '> 1%',
              'last 2 versions'
              // 'not ie <= 8'
            ]
          })
        ]
      }
    }
  ]

  return {
    entry: {
      app: [indexPath] // 輸入檔案
    },
    output: {
      path: buildPath // 打包後輸出的目錄
    },
    module: {
      noParse: [reactPath, reactdomPath],
      rules: [
        {
          use: [
            'thread-loader',
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true // 是否開啟快取
              }
            }
          ],
          test: /\.jsx?$/i, // .js & .jsx
          include: srcPath,
          exclude: /node_modules/
        }, {
          use: use,
          test: /\.css$/i,
          include: cssPath,
          exclude: /node_modules/
        }, {
          use: [...use, 'stylus-loader'],
          test: /\.styl(us)?$/i,
          include: cssPath,
          exclude: /node_modules/
        }, {
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[hash].[ext]'
            }
          },
          test: /\.(jpe?g|png|gif|svg|bmp|ico)$/i,
          include: imgPath,
          exclude: /node_modules/
        }, {
          use: {
            loader: 'file-loader',
            options: {
              name: 'font/[hash].[ext]'
            }
          },
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      modules: [srcPath, nodeModulesPath],
      extensions: ['.js', '.jsx', '.css', '.styl', '.json'], // 忽略附檔名
      alias: {
        // 放入自定義的模組 e.g. clipboard: clipboardPath
        Config: path.resolve(__dirname, 'config.json'),
        glConfig: path.resolve(configPath, 'config.json')
      }
    },
    // https://medium.com/anna-hsaio-%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E8%A8%98/webpack-%E9%97%9C%E6%96%BCsplitchunks%E7%9A%84%E5%A4%A7%E5%B0%8F%E4%BA%8B-f26d3985e028
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: true,
        cacheGroups: {
          config: {
            test: /[\\/]config[\\/]/,
            chunks: 'all',
            name: 'config',
            priority: 1,
            enforce: true
          },
          commons: {
            test: /[\\/]src[\\/]app[\\/]components[\\/]utils[\\/]/,
            chunks: 'all',
            name: 'common', // 分割出來的檔案命名
            priority: 2, // 檔案的優先順序，數字越大表示優先級越高
            minSize: 0 // 文件在壓縮前的最小大小，默認值為 30000 bytes
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendor',
            priority: 3,
            // name (module) {
            //   // get the name. E.g. node_modules/packageName/not/this/part.js
            //   // or node_modules/packageName
            //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

            //   // npm package names are URL-safe, but some servers don't like @ symbols
            //   return `npm.${packageName.replace('@', '')}`
            // },
            enforce: true
          }
        }
      }
    },
    plugins: [
      // 移動靜態檔案至指定目錄
      new CopyWebpackPlugin({
        patterns: [{
          from: wwwPath,
          noErrorOnMissing: true // 允許複製空資料夾
        }]
      }),
      // 自動生成.html檔案
      new HtmlWebpackPlugin({
        title: 'Project Website',
        template: 'src/public/index.html',
        inject: true
        // minify: {
        //   removeComments: true, // 清理html中的註釋
        //   removeEmptyElements: false, // 清理內容為空的元素
        //   collapseWhitespace: true, // 清理html中的空格、換行符
        //   minifyCSS: true, // 壓縮html內的樣式
        //   minifyJS: true, // 壓縮html內的js (not working)
        //   preserveLineBreaks: false // 保留換行符
        // }
      }),
      // HtmlWebpackPlugin擴充套件
      new ScriptExtHtmlWebpackPlugin({
        defer: ['app', 'npm', 'runtime']
      }),
      // 將css打包獨立成一個檔案
      new MiniCssExtractPlugin({
        filename: `${devMode ? 'styles' : 'styles-[contenthash]'}.css`
      })
    ]
  }
}

module.exports = mode => config(mode) 