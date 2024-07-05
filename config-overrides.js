const path = require('path')
const { addDecoratorsLegacy, override } = require('customize-cra')

module.exports = config => ({
  ...override(addDecoratorsLegacy())(config),
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/ui/components'),
      '@views': path.resolve(__dirname, 'src/ui/views'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@typings': path.resolve(__dirname, './src/typings'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
})
