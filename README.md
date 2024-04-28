# 👋 Greetings from aChive README.md 📗

This is the project Readme file where all the information concerning the project will be stored.
For the local work on this project you will need the *nodejs (^v18) & yarn (^v1.22)* tools and iOS emulator or physical device with Expo Go app installed.

## [FE] - aChive React Native mobile app

1. Install the project packages by running the *yarn* command in the frontend directory.
2. Run application by the *yarn start* command
3. In the console press "i" which will open the application on your iOS emulator, or just scan QR code using your physical device running Expo Go app.

If you want to download new GraphQL schema run the *yarn graphql* command.
If you want to use local backend application is mandatory to change the httpLink URI in "frontend/src/gql/client.ts ln: 38 to localhost:4000/graphql.

## [BE] - aChiveBE

1. Install the project packages by running the *yarn* command in the backend directory.
2. Run application localy by the *yarn run dev* command

If you want to generate new GraphQL schema run the *yarn build* command and then *yarn graphql* command