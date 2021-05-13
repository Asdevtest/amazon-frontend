const path = require("path")

module.exports = config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.alias,
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@navigation': path.resolve(__dirname, 'src/navigation'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@components': path.resolve(__dirname, 'src/ui/components'),
        '@views': path.resolve(__dirname, 'src/ui/views'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  })
