import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import { Image } from "@gluestack-ui/themed";

const AboutScreen = () => {
  return (
    <DrawerScreenWrapper isBack screenTitle="About app">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center" }}>
          This is the About screen. I will handle the all info about the app,
          author and version
        </Text>
        <Image
          source={require("../../../assets/images/about.png")}
          style={{ width: "100%", height: 350 }}
          resizeMode="contain"
          alt="about"
        />
      </View>
    </DrawerScreenWrapper>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
