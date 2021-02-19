const path = require("path");

module.exports = {
  devServer: {
    headers: {
      'Access-Control-allow-Origin': '*',
    }
  },
  publicPath: "/",

  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.s[ca]ss$/i,
          use: [
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ["./node_modules"]
                },
              },
            }
          ]
        }
      ]
    }
  },
};
