import { Button, HStack, Text, VStack } from "@gluestack-ui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";

const OAuthButton = () => {
  const { t } = useTranslation();
  return (
    <VStack justifyContent="center" alignItems="center" gap={10}>
      <Text>- {t("or use")} -</Text>
      <HStack alignItems="center" justifyContent="center" gap={10}>
        <Button size="lg" action="secondary" variant="outline">
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/images/google.png")}
            alt="Google oAuth"
          />
        </Button>
        <Button size="lg" action="secondary" variant="outline">
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
