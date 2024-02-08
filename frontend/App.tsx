import { GluestackUIProvider } from "@gluestack-ui/themed";
import "services/i18next";
import { config } from "./config/gluestack-ui.config";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "context/authContext";
import { AppProvider } from "context/appContext";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { RootStackNavigator } from "navigation/root";
import { client } from "gql/client";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <NavigationContainer>
            <AppProvider>
              <RootStackNavigator />
            </AppProvider>
          </NavigationContainer>
        </AuthProvider>
      </ApolloProvider>
    </GluestackUIProvider>
  );
}
