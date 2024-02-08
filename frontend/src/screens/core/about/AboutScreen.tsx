import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";

const AboutScreen = () => {
  return (
    <DrawerScreenWrapper isBack>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center" }}>
          This is the About screen. I will handle the all info about the app,
          author and version
        </Text>
      </View>
    </DrawerScreenWrapper>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
