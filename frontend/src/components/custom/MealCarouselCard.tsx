import { Meal } from "data/mock/meals";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  width: number;
  item: Meal;
  index: number;
  x: SharedValue<number>;
};

const MealCarouselCard: FC<Props> = ({ width, item, index, x }) => {
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 2) * width, (index - 1) * width, index * width],
      [0.8, 1, 0.8]
    );
    return { transform: [{ scale }] };
  });

  return (
    <TouchableOpacity
      style={{
        width: width,
      }}
    >
      <Animated.View style={[styles.imageContainer, style]}>
        <ImageBackground source={{ uri: item.image }} style={styles.image}>
          <LinearGradient
            colors={[
              `rgba(0,0,0,0.9)`,
              "rgba(0,0,0,0.2)",
              "transparent",
              `rgba(0,0,0,0.6)`,
            ]}
            locations={[0.0, 0.3, 0.6, 1]}
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
              <Text style={styles.text}>{item.name}</Text>

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
                  {item.time}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default MealCarouselCard;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    backgroundColor: "lightgreen",
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
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
