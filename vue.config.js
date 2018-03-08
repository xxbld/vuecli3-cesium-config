
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const cesiumSource = 'node_modules/cesium/Source'
// const cesiumWorkers = '../Build/Cesium/Workers'
module.exports = {
  configureWebpack: {
    plugins: [
      // 拷贝Cesium资源目录
      new CopyWebpackPlugin([{
        from: path.join(cesiumSource, 'Assets'),
        to: 'Assets'
      },
      {
        from: path.join(cesiumSource, 'Widgets'),
        to: 'Widgets'
      },
      {
        from: path.join(cesiumSource, 'ThirdParty'),
        to: 'ThirdParty'
      }
      ]),
      new CopyWebpackPlugin([{
        from: path.join(cesiumSource, '../Build/Cesium/ThirdParty/Workers'),
        to: 'ThirdParty/Workers'
      },
      {
        from: path.join(cesiumSource, '../Build/Cesium/Workers'),
        to: 'Workers'
      }
      ]),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify('')
      }),
      // Split cesium into a seperate bundle
      new webpack.optimize.CommonsChunkPlugin({
        name: 'cesium',
        minChunks: function (module) {
          return module.context && module.context.indexOf('cesium') !== -1
        }
      })
    ]
  },
  chainWebpack: config => {
    config
      .node.set('fs', 'empty').end()
      .resolve.alias.set('cesium', path.resolve(__dirname, cesiumSource)).end().end()
      .amd({
        toUrlUndefined: true
      })
    // 禁止Cesium警告: require function is used in a way in which dependencies cannot be statically extracted
    //   .module.set('unknownContextCritical', false).set('unknownContextRegExp', /^.\/.*$/)
    // strip-pragma-loader 删除编译指示
    // 这个插件webpack3无法加载可以不用
    //   .rule()
    //   .include
    //   .add(path.resolve(__dirname, cesiumSource))
    //   .end()
    //   .post()
    //   .pre()
    //   .test(/\.js$/)
    //   .use('strip')
    //   .loader('strip-pragma-loader')
    //   .options({
    //     pragmas: {
    //       debug: false
    //     }
    //   })
    //   .end()
    //   .end()
  }
}
