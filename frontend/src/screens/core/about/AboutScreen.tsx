import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import { Image, View, Text, VStack } from "@gluestack-ui/themed";
import { Linking, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";

export const AboutScreen = () => {
  const { t } = useTranslation();

  return (
    <DrawerScreenWrapper isBack screenTitle={t("navigation.aboutApp")}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/about.png")}
          style={{ width: "100%", height: 350 }}
          resizeMode="contain"
          alt="about"
        />
        <VStack
          marginHorizontal={20}
          gap={10}
          justifyContent="center"
          alignItems="center"
        >
          <Text style={{ textAlign: "center" }}>{t("about.description")}</Text>
          <Text style={{ textAlign: "center", fontStyle: "italic" }}>
            {t("about.thesisName")}
          </Text>
          <Text style={{ textAlign: "center" }} mt={10}>
            {t("about.feedback")}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:achiveapp@gmail.com")}
          >
            <Text color="$primary500" textDecorationLine="underline">
              achiveapp@gmail.com
            </Text>
          </TouchableOpacity>
        </VStack>
        <View flex={1} justifyContent="center" alignItems="center" gap={10}>
          <Image
            w={50}
            h={50}
            source={require("../../../assets/images/icon.png")}
            resizeMode="contain"
            alt="about"
          />
          <VStack justifyContent="center" alignItems="center">
            <Text>aChive v{Constants.expoConfig?.version}</Text>
            <Text>{t("about.byAuthor")}</Text>
            <Text>&copy; 2024</Text>
          </VStack>
        </View>
      </View>
    </DrawerScreenWrapper>
  );
};
