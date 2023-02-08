module.exports = {
  plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
  // presets: ['@babel/preset-react'],
  presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}]],
}
