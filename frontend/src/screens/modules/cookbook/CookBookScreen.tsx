import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import MealCarousel from "components/custom/MealCarousel";
import { Meals } from "data/mock/meals";
import { Heading, Image, ScrollView, View } from "@gluestack-ui/themed";

const CookBookScreen = () => {
  return (
    <DrawerScreenWrapper isBack screenTitle="Recipes">
      <ScrollView style={{ flex: 1, marginHorizontal: 5, height: "100%" }}>
        <Heading color="#10b981">Featuring</Heading>
        <MealCarousel data={Meals} />
        <Heading color="#10b981">Cookbook</Heading>
        <View flex={1} justifyContent="center" alignItems="center" h={200}>
          <Image
            source={require("../../../assets/images/recipes.png")}
            mt={100}
            style={{ width: "100%", height: 250 }}
            resizeMode="contain"
            alt="cookbook"
          />
          <Heading color="grey">This is just a feature preview...</Heading>
        </View>
      </ScrollView>
    </DrawerScreenWrapper>
  );
};

export default CookBookScreen;
