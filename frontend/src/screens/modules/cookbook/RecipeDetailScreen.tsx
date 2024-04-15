import { Alert, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import { useTranslation } from "react-i18next";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  ChevronsUpDownIcon,
  HStack,
  Heading,
  Icon,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import { Meals } from "data/mock/meals";

import IngredientList from "components/modules/recipes/IngredientList";
import RecipeInstructions from "components/modules/recipes/RecipeInstructions";
import NutritionBar from "components/modules/recipes/NutritionBar";
import { LinearGradient } from "expo-linear-gradient";
import { MainDrawerParams } from "navigation/main";
import i18next from "i18next";

const RecipeDetailScreen = () => {
  const { t } = useTranslation();
  const currentLanguage = i18next.language as "cs" | "en";

  const route = useRoute<RouteProp<MainDrawerParams, "RecipeDetail">>();

  const meal = route.params?.item;

  return (
    <DrawerScreenWrapper
      isRecipeDetail
      screenTitle={meal[currentLanguage].name}
    >
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          <View>
            <ImageBackground source={{ uri: meal.image }} style={styles.image}>
              <LinearGradient
                colors={[
                  `rgba(0, 0, 0,0.8)`,
                  `rgba(0, 0, 0,0.2)`,
                  "transparent",
                ]}
                locations={[1, 0.7, 0]}
                style={{
                  flex: 1,
                }}
              >
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: `rgba(128, 128, 128, 0.75)`,
                    borderRadius: 5,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    position: "absolute",
                    right: 10,
                    top: 10,
                  }}
                >
                  <Icon as={ChevronsUpDownIcon} color="white" mr={4} />
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 12,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {meal.size}
                  </Text>
                </HStack>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    marginBottom: 6,
                  }}
                >
                  <Heading color="white" size="2xl" m={6}>
                    {meal[currentLanguage].name}
                  </Heading>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        </View>
        <NutritionBar meal={meal} />

        <View style={{ backgroundColor: "white" }}>
          <Text style={{ margin: 10, textAlign: "justify" }}>
            {meal[currentLanguage].description}
          </Text>
        </View>

        <View style={{ backgroundColor: "white" }}>
          {meal[currentLanguage].ingredients && (
            <IngredientList ingredients={meal[currentLanguage]?.ingredients!} />
          )}
        </View>

        <RecipeInstructions
          instructions={meal[currentLanguage].instructions!}
        />
        <View h={50} />
      </ScrollView>
    </DrawerScreenWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    flex: 1,
  },
  text: {
    lineHeight: 25,
    margin: 0,
    padding: 0,
    fontSize: 20,
    fontFamily: "Helvetica Neue",
    fontWeight: "500",
    color: "white",
    textAlign: "left",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
  },
});

export default RecipeDetailScreen;
