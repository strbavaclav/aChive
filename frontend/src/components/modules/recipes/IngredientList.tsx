import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IngredientItem from "./IngredientItem";
import { Heading } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

type Props = {
  ingredients: string[];
};
const IngredientList: React.FC<Props> = ({ ingredients }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Heading mb={10}>{t("recipes.detail.ingredients")}</Heading>

      {ingredients.map((ingredient, index) => (
        <IngredientItem key={index} ingredient={ingredient} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});

export default IngredientList;
