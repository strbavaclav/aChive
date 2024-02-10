import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";

const ShoppingListScreen = () => {
  return (
    <DrawerScreenWrapper isBack screenTitle="Shopping list">
      <View>
        <Text>ShoppingListScreen</Text>
      </View>
    </DrawerScreenWrapper>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({});
