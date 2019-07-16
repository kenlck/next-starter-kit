const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');

const prod = process.env.NODE_ENV === 'production';

module.exports = withImages(withCss(withFonts(withSass({
  publicRuntimeConfig: {
    PRODUCTION: prod,
  },
  // exportPathMap: () => ({
  //   '/': { page: '/' },
  // }),
  postcssLoaderOptions: {
    parser: true,
  },
}))));
