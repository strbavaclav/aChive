import { View, Image, Heading } from "@gluestack-ui/themed";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import React from "react";
import { useTranslation } from "react-i18next";

const NotificationScreen = () => {
  const { t } = useTranslation();
  return (
    <DrawerScreenWrapper isBack screenTitle={t("notifications.title")}>
      <View flex={1} justifyContent="center" alignItems="center">
        <Image
          w={300}
          h={300}
          source={require("../../../assets/images/notifications.png")}
          resizeMode="contain"
          alt="about"
        />
        <Heading color="gray">{t("notifications.noNotification")}</Heading>
      </View>
    </DrawerScreenWrapper>
  );
};

export default NotificationScreen;
