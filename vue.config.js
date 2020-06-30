const { singleInstances } = require("vue-cli-plugin-drupal-pdb");

// Set this to the path in Drupal where your pdb_vue 'dist' directory lives.
const drupalPath = "/themes/custom/rackspace/libraries/calculator/dist";

module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
  // Disable filename hashing in Drupal.
  filenameHashing: false,
  // Generate individual files for each instance.
  pages: singleInstances(),
  // Set the public path so images will work.
  publicPath: process.env.NODE_ENV === "production" ? drupalPath : "/",
};
