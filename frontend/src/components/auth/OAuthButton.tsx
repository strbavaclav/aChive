import {
  Button,
  HStack,
  Text,
  Toast,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useAuth } from "context/authContext";
import { useToast } from "@gluestack-ui/themed";
import { ToastDescription } from "@gluestack-ui/themed";

type Props = {
  signUp?: boolean;
  signIn?: boolean;
};

const OAuthButton: FC<Props> = ({ signUp, signIn }) => {
  const { t } = useTranslation();
  const { onAppleSignUp, onAppleSignIn } = useAuth();
  const toast = useToast();

  const appleAuth = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });
      if (credentials && credentials.identityToken) {
        if (signIn) {
          onAppleSignIn(credentials.identityToken);
        }
        if (signUp) {
          onAppleSignUp(credentials.identityToken);
        }
      }
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="accent">
              <VStack space="xs">
                <ToastTitle>Oops... Something went worng!</ToastTitle>
                <ToastDescription>Please try again later.</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
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
