import { ChevronsUpDownIcon, HStack, Icon } from "@gluestack-ui/themed";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Meal } from "data/mock/meals";
import { LinearGradient } from "expo-linear-gradient";
import i18next from "i18next";
import { MainDrawerParams } from "navigation/main";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  meal: Meal;
  viewableItems: Animated.SharedValue<ViewToken[]>;
};
const MealCard: React.FC<Props> = React.memo(({ meal, viewableItems }) => {
  const currentLanguage = i18next.language as "cs" | "en";

  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === meal.id)
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0.5),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.9) }],
    };
  });
  return (
    <Animated.View style={rStyle}>
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", { item: meal })}
        style={[
          {
            flexDirection: "row",
            borderRadius: 10,
            marginHorizontal: 5,
            marginVertical: 3,
            height: 150,
            shadowColor: `rgba(0,0,0,0.7)`,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            backgroundColor: "black",
            shadowOpacity: 1,
            shadowRadius: 3,
          },
        ]}
      >
        <ImageBackground
          source={{ uri: meal.image }}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <LinearGradient
            colors={[`rgba(0,0,0,0.9)`, "rgba(0,0,0,0.2)", "transparent"]}
            locations={[0.0, 0.3, 1]}
            style={{ flex: 1, borderRadius: 10, height: "50%" }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <Text style={styles.text}>{meal[currentLanguage].name}</Text>

              <HStack
                justifyContent="center"
                alignItems="center"
                style={{
                  backgroundColor: `rgba(128, 128, 128, 0.75)`,
                  borderRadius: 5,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  position: "absolute",
                  bottom: 10,
                  left: 10,
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
                  backgroundColor: `rgba(39, 180, 110, 0.75)`,
                  borderRadius: 5,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 12,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {meal.time}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 20,
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

export default MealCard;
