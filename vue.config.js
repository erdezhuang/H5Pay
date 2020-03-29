// vue.config.js
// Gzip 压缩
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  // 输出文件
  publicPath: './',

  // 不生成map文件
  productionSourceMap: false,

  // 配置Gzip
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, //匹配文件名
        threshold: 10240,//对超过10k的数据压缩
        deleteOriginalAssets: false //不删除源文件
      }),
    ],
    externals: {
      // 'vue': 'Vue', // 左侧vue是我们自己引入时候要用的，右侧是开发依赖库的主人定义的不能修改
      // 'vue-router': 'VueRouter',
      // 'axios': 'axios',
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options =>
        Object.assign(options, {
          limit: 10240,
        })
      );
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
  },

  runtimeCompiler: false,

  //增加vue.config.js文件配置css
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // require('postcss-pxtorem')({ // 把px单位换算成rem单位
          //   // rootValue: 18, // 换算的基数(设计图750的根字体为32)
          //   // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
          //   propList: ['*']
          // })
          require('postcss-px-to-viewport')({
            "viewportWidth": "750",
            "unitPrecision": "3",
            "viewportUnit": "vw",
            "selectorBlackList": ["van"],
            "minPixelValue": 1,
            "mediaQuery": false
          }),
          require('cssnano')({
            "preset": "advanced",
            "autoprefixer": false,
            "postcss-zindex": false
          })
        ]
      },
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "@/style/main.scss";`
      },
    }
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
