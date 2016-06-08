/*global process*/
const path = require("path");
const merge = require("webpack-merge");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const validate = require("webpack-validator");
const parts = require("./lib/parts");

const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build"),
  style: path.join(__dirname, "app/sass", "main.scss")
};

const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app
  },

  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      "react": "react-lite",
      "react-dom": "react-lite"
    }
  },

  output: {
    path: PATHS.build,
    filename: "[name].js"
  },

  plugins: [
    new NpmInstallPlugin({
      save: true // --save
    }),
    new HtmlWebpackPlugin({
      title: "Hello!",
      template: PATHS.app + "/templates/index.ejs",
      excludeChunks: ["style.[chunkhash].js"]
    })
  ],

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ["eslint"],
        include: PATHS.app
      }
    ],
    loaders: [
      // Set up jsx. This accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
        loaders: ["babel?cacheDirectory"],
        // Parse only app files! Without this it will go through entire project.
        // In addition to being slow, that will most likely result in an error.
        include: PATHS.app
      }
    ]
  }
};

var config;
switch(process.env.npm_lifecycle_event) {
  case "build":
  case "stats":
    config = merge(
      common,
      {
        devtool: "source-map",
        output: {
          path: PATHS.build,
          publicPath: "/",
          filename: "[name].[chunkhash].js",
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: "[chunkhash].js"
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        "process.env.NODE_ENV",
        "production"
      ),
      parts.extractBundle({
        name: "vendor",
        entries: ["react", "react-dom"]
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style)
    );
    break;

  default:
    config = merge(
      common,
      {
        devtool: "eval-source-map"
      },
      parts.setupCSS(PATHS.style),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}
module.exports = validate(config);
