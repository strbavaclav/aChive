import { Text, View, Image, Heading } from "@gluestack-ui/themed";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import React from "react";

const NotificationScreen = () => {
  return (
    <DrawerScreenWrapper isBack screenTitle="Notifications">
      <View flex={1} justifyContent="center" alignItems="center">
        <Image
          w={300}
          h={300}
          source={require("../../../assets/images/notifications.png")}
          resizeMode="contain"
          alt="about"
        />
        <Heading color="gray">No notifications yet...</Heading>
      </View>
    </DrawerScreenWrapper>
  );
};

export default NotificationScreen;
