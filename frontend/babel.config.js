module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            calls: "./src/calls",
            assets: "./src/assets",
            components: "./src/components",
            constants: "./src/constants",
            context: "./src/context",
            data: "./src/data",
            gql: "./src/gql",
            hooks: "./src/hooks",
            locales: "./src/locales",
            navigation: "./src/navigation",
            screens: "./src/screens",
            services: "./src/services",
            styles: "./src/styles",
            types: "./src/types",
          },
        },
      ],
    ],
  };
};
