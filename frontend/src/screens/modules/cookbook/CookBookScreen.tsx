import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import MealCarousel from "components/custom/MealCarousel";
import { Meals } from "data/mock/meals";

const CookBookScreen = () => {
  return (
    <DrawerScreenWrapper isBack>
      <View>
        <MealCarousel data={Meals} />
      </View>
    </DrawerScreenWrapper>
  );
};

export default CookBookScreen;

const styles = StyleSheet.create({});
