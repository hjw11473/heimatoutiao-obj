const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/views')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        devServer: {
            open: true,
            port: 7924,
            host: 'localhost'
        },
        // 路径别名
        resolve: {
            alias: {
                cpns,
                views
            }
        }
    }
})
