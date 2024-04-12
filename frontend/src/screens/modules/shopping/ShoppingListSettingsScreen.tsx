import React, { useEffect } from "react";
import { ShoppingOnboarding } from "components/modules/shopping/ShoppingOnboarding";
import { Heading, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainDrawerParams } from "navigation/main";
import { useApp } from "context/appContext";

export const ShoppingListSettingsScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();
  const { refetchUserData } = useApp();

  const onSaveHandler = async () => {
    await refetchUserData();
    navigation.goBack();
  };

  return (
    <View flex={1} backgroundColor="white">
      <ShoppingOnboarding onFinish={onSaveHandler} change />
    </View>
  );
};
