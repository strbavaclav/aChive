import { Button, HStack, Text, VStack } from "@gluestack-ui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useAuth } from "context/authContext";

const OAuthButton = () => {
  const { t } = useTranslation();
  const { onAppleSignUp } = useAuth();

  const appleAuth = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });
      if (credentials && credentials.identityToken) {
        onAppleSignUp(credentials.identityToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack justifyContent="center" alignItems="center" gap={10}>
      <Text>- {t("or use")} -</Text>
      <HStack alignItems="center" justifyContent="center" gap={10}>
        <Button
          size="lg"
          action="secondary"
          variant="outline"
          onPress={() =>
            Alert.alert(
              t("Oops.."),
              t("The google authentication is not supported yet!")
            )
          }
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/images/google.png")}
            alt="Google oAuth"
          />
        </Button>
        <Button
          size="lg"
          action="secondary"
          variant="outline"
          onPress={appleAuth}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/images/apple.png")}
            alt="Apple oAuth"
          />
        </Button>
      </HStack>
    </VStack>
  );
};

export default OAuthButton;
