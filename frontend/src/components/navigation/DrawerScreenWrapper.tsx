import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import {
  DrawerNavigationProp,
  useDrawerProgress,
} from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainDrawerParams } from "navigation/main";

type Props = {
  children: ReactNode;
  isBack?: boolean;
  isNotification?: boolean;
  isSettings?: boolean;
  screenTitle?: string;
};
const DrawerScreenWrapper: React.FC<Props> = ({
  children,
  isBack,
  isNotification,
  isSettings,
  screenTitle,
}) => {
  const statusBarHeight = Constants.statusBarHeight;
  const progress = useDrawerProgress();

  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { scale: interpolate(progress.value, [0, 1], [1, 0.8], "clamp") },
      {
        rotateY:
          interpolate(progress.value, [0, 1], [0, -0.2], "clamp") + "rad",
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 26], "clamp"),
  }));
  return (
    <Animated.View
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          shadowColor: "black",
          shadowOffset: { width: -3, height: 6 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        },
        animatedStyle,
      ]}
    >
      <HStack
        style={{
          marginTop: statusBarHeight,
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name={"menu"} size={26} color={"#10b981"} />
        </TouchableOpacity>
        <Box style={{ flex: 1, justifyContent: "center" }}>
          <Text
            textAlign="center"
            bold={screenTitle ? false : true}
            size="lg"
            color="#10b981"
          >
            {screenTitle ? screenTitle : "aChive"}
          </Text>
        </Box>

        <Box
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {isBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name={"arrow-back-circle-outline"}
                size={26}
                color={"#10b981"}
              />
            </TouchableOpacity>
          )}
          {isNotification && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <Ionicons
                name={"notifications-outline"}
                size={24}
                color={"#10b981"}
              />
            </TouchableOpacity>
          )}
          {isSettings && (
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Ionicons name={"settings"} size={24} color={"#10b981"} />
            </TouchableOpacity>
          )}
        </Box>
      </HStack>
      {children}
    </Animated.View>
  );
};

export default DrawerScreenWrapper;
