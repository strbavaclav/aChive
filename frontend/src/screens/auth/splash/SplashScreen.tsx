import { Heading, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { AuthStackParams } from "navigation/auth";

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + 20)),
      200
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + 30)),
      300
    );

    setTimeout(() => navigation.navigate("Login"), 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#10b981",
      }}
    >
      <StatusBar style="light" />

      <Animated.View
        style={{
          backgroundColor: "#ffffff4A",
          padding: ring1padding,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: "#ffffff4A",
            padding: ring2padding,
          }}
        >
          <Heading size="4xl" color="white">
            aChive
          </Heading>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
