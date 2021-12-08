module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-runtime'
    /* 'transform-async-to-generator' */
  ]
}
