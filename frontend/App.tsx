import { GluestackUIProvider } from "@gluestack-ui/themed";
import "services/i18next";
import { config } from "./config/gluestack-ui.config";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "context/authContext";
import { AppProvider } from "context/appContext";
import { ApolloProvider } from "@apollo/client";
import React, { useEffect } from "react";
import { RootStackNavigator } from "navigation/root";
import { client } from "gql/client";
import * as Notifications from "expo-notifications";
import { schedulePushNotification } from "services/notifications";

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  return (
    <GluestackUIProvider config={config}>
      <ApolloProvider client={client}>
        <AppProvider>
          <AuthProvider>
            <NavigationContainer>
              <RootStackNavigator />
            </NavigationContainer>
          </AuthProvider>
        </AppProvider>
      </ApolloProvider>
    </GluestackUIProvider>
  );
}
