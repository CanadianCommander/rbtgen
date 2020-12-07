const path = require("path");

module.exports = {
  devServer: {
    headers: {
      'Access-Control-allow-Origin': '*',
    }
  },
  publicPath: "http://localhost:8080/app/",

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
