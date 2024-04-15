import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  ChevronsUpDownIcon,
  HStack,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Meal } from "data/mock/meals";
import { LinearGradient } from "expo-linear-gradient";
import i18next from "i18next";
import { MainDrawerParams } from "navigation/main";
import React, { FC } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { EatingHabitTipType } from "screens/modules/education/EducationScreen";

type Props = {
  width: number;
  item: EatingHabitTipType;
  index: number;
  x: SharedValue<number>;
  onPress: (item: EatingHabitTipType) => void;
};

const DefaultTipCard: FC<Props> = ({ width, item, index, x, onPress }) => {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();
  const currentLanguage = i18next.language as "cs" | "en";

  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * width, (index - 1) * width, index * width],
      [0.8, 1, 0.8]
    );
    return { transform: [{ scale }] };
  });

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Animated.View style={[styles.imageContainer, style]}>
        <Box
          style={{
            backgroundColor: "white",
            height: 100,
            borderRadius: 8,
            justifyContent: "center",
            padding: 10,
          }}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <HStack justifyContent="center" alignItems="center" gap={10}>
              <Ionicons name="bulb-outline" size={26} color={"#10b981"} />
              <VStack>
                <Text size="lg" style={{ color: "#10b981" }}>
                  {item[currentLanguage].name}
                </Text>
                <Text size="sm" style={{ color: "grey" }}>
                  {item[currentLanguage].description}
                </Text>
              </VStack>
            </HStack>
            <Ionicons
              name={"chevron-forward-outline"}
              size={26}
              color={"#10b981"}
            />
          </HStack>
        </Box>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DefaultTipCard;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 6,
    overflow: "hidden",
    width: 300,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
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
