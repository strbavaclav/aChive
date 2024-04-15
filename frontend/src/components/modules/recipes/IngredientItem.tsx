import { Text, View } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";

type Props = { ingredient: string };
const IngredientItem: React.FC<Props> = ({ ingredient }) => {
  return (
    <View style={styles.ingredient} m={1}>
      <Text>{ingredient}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ingredient: {
    minHeight: 40,
    padding: 6,
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: "white",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});

export default IngredientItem;
