import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import MealCarousel from "components/custom/MealCarousel";
import { Meals } from "data/mock/meals";
import { Heading, ScrollView } from "@gluestack-ui/themed";

const CookBookScreen = () => {
  return (
    <DrawerScreenWrapper isBack screenTitle="Recipes">
      <ScrollView>
        <Heading color="#10b981">Featuring</Heading>
        <MealCarousel data={Meals} />
        <Heading color="#10b981">Cookbook</Heading>
      </ScrollView>
    </DrawerScreenWrapper>
  );
};

export default CookBookScreen;
