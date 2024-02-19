import { Text, View } from "@gluestack-ui/themed";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import React from "react";

const NotificationScreen = () => {
  return (
    <DrawerScreenWrapper isBack screenTitle="Notifications">
      <View flex={1} p={10}>
        <Text>NotificationScreen</Text>
      </View>
    </DrawerScreenWrapper>
  );
};

export default NotificationScreen;
