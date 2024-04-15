import { Meal } from "data/mock/meals";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  meal: Meal;
};
const NutritionBar: FC<Props> = ({ meal }) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#27B46E",
        padding: 10,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "bold", color: "white", marginBottom: 5 }}>
          {t("recipes.detail.macros.cals")}
        </Text>
        <Text style={{ color: "white" }}>{meal.nutrition?.calories} </Text>
      </TouchableOpacity>
      <View style={{ borderLeftWidth: 1, borderColor: "white" }} />
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "bold", color: "white", marginBottom: 5 }}>
          {t("recipes.detail.macros.protein")}
        </Text>
        <Text style={{ color: "white" }}>{meal.nutrition?.protein} g</Text>
      </TouchableOpacity>
      <View style={{ borderLeftWidth: 1, borderColor: "white" }} />

      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "bold", color: "white", marginBottom: 5 }}>
          {t("recipes.detail.macros.carbs")}
        </Text>
        <Text style={{ color: "white" }}>{meal.nutrition?.carbs} g</Text>
      </TouchableOpacity>
      <View style={{ borderLeftWidth: 1, borderColor: "white" }} />

      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "bold", color: "white", marginBottom: 5 }}>
          {t("recipes.detail.macros.fat")}
        </Text>
        <Text style={{ color: "white" }}>{meal.nutrition?.fat} g</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NutritionBar;
