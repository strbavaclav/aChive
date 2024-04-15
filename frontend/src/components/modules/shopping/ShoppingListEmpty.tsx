import { Heading, Image, Text, View } from "@gluestack-ui/themed";
import React from "react";
import { useTranslation } from "react-i18next";

const ShoppingListEmpty = () => {
  const { t } = useTranslation();
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Image
        w={200}
        h={200}
        source={require("../../../assets/images/empty.png")}
        resizeMode="contain"
        alt="toShop"
      />
      <Heading>{t("shoppingList.empty.title")}</Heading>
      <Text bold>{t("shoppingList.empty.description")}</Text>
    </View>
  );
};

export default ShoppingListEmpty;
