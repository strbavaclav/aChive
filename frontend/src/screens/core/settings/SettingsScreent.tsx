import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";

const SettingsScreen = () => {
  return (
    <DrawerScreenWrapper isBack screenTitle="App settings">
      <View>
        <Text>SettingsScreen</Text>
        <Text>language</Text>
        <Text>dark mode</Text>
        <Text>Acknowledgments - what the SW use</Text>
      </View>
    </DrawerScreenWrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
