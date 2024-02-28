import HomeScreen from "screens/home/HomeScreen";
import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import ProfileScreen from "screens/core/profile/ProfileScreen";
import MealPlannerScreen from "screens/modules/mealplanning/MealPlannerScreen";
import EducationScreen from "screens/modules/education/EducationScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ReactNode, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomDrawer from "components/navigation/CustomDrawer";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import AboutScreen from "screens/core/about/AboutScreen";
import ShoppingListScreen from "screens/modules/shopping/ShoppingListScreen";
import CookBookScreen from "screens/modules/cookbook/CookBookScreen";
import ReliefScreen from "screens/modules/relief/ReliefScreen";
import SettingsScreen from "screens/core/settings/SettingsScreent";
import { useNavigation } from "@react-navigation/native";
import NotificationScreen from "screens/core/notification/NotificationScreen";
import { PlannerStackNavigator } from "navigation/planner";

type Props = { children: ReactNode };

export type MainTabsParams = {
  Home: undefined;
  Profile: undefined;
  Planner: undefined;
  Insights: undefined;
};

export type MainDrawerParams = {
  Main: undefined;
  Settings: undefined;
  About: undefined;
  Shopping: undefined;
  Cookbook: undefined;
  StressRelief: undefined;
  Notifications: undefined;
};

const MainTab = createBottomTabNavigator<MainTabsParams>();
const MainDrawer = createDrawerNavigator<MainDrawerParams>();

const TabScreenOptions = ({
  route,
}: BottomTabScreenProps<
  MainTabsParams,
  keyof MainTabsParams
>): BottomTabNavigationOptions => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName: string;
    let iconColor: string;

    if (route.name === "Home") {
      iconName = "dashboard";
      iconColor = focused ? "#10b981" : "#555";
    } else if (route.name === "Profile") {
      iconName = focused ? "person" : "person-outline";
      iconColor = focused ? "#10b981" : "#555";
    } else if (route.name === "Planner") {
      iconName = "access-time";
      iconColor = focused ? "#10b981" : "#555";
    } else if (route.name === "Insights") {
      iconName = "library-books";
      iconColor = focused ? "#10b981" : "#555";
    } else {
      iconName = "ios-alert";
      iconColor = "#555";
    }

    return (
      <MaterialIcons name={iconName as "tab"} size={size} color={iconColor} />
    );
  },
  tabBarLabel: route.name === "Home" ? "Dashboard" : route.name,
  tabBarActiveTintColor: "#10b981",
  headerShown: false,
  tabBarStyle: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    borderBottomLeftRadius: 15,
    shadowRadius: 5,
    borderTopWidth: 1,
    backgroundColor: "white",
  },
});

export const MainTabNavigator = () => {
  const navigation = useNavigation();

  const state = navigation.getState();
  const route = state?.routes[state.index] ?? {};
  const currentScreen = route.state?.index
    ? route.state?.routes[route.state.index]?.name
    : route.name;

  const screenTitle =
    currentScreen === "Planner"
      ? "Meal planner"
      : currentScreen === "Insights"
        ? "Eating hacks"
        : currentScreen === "Profile"
          ? "My Profile"
          : undefined;

  return (
    <DrawerScreenWrapper
      isNotification={currentScreen === "Profile" ? false : true}
      isSettings={currentScreen === "Profile" ? true : false}
      screenTitle={screenTitle}
    >
      <MainTab.Navigator
        initialRouteName="Home"
        screenOptions={TabScreenOptions}
      >
        <MainTab.Screen name="Home" component={HomeScreen} />
        <MainTab.Screen name="Planner" component={PlannerStackNavigator} />
        <MainTab.Screen name="Insights" component={EducationScreen} />
        <MainTab.Screen name="Profile" component={ProfileScreen} />
      </MainTab.Navigator>
    </DrawerScreenWrapper>
  );
};

export const MainDrawerNavigator = () => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#10b981", "#46bfa7"]}>
      <MainDrawer.Navigator
        initialRouteName="Main"
        drawerContent={(props) => {
          return <CustomDrawer navigation={props.navigation} />;
        }}
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          overlayColor: `transparent`,
          drawerStyle: {
            flex: 1,
            backgroundColor: "transparent",
            width: "55%",
          },
          sceneContainerStyle: { backgroundColor: "transparent" },
        }}
      >
        <MainDrawer.Screen
          name={"Main"}
          component={MainTabNavigator}
          options={{ headerTitle: "" }}
        />
        <MainDrawer.Screen
          name={"About"}
          component={AboutScreen}
          options={{ headerTitle: "" }}
        />
        <MainDrawer.Screen
          name={"Shopping"}
          component={ShoppingListScreen}
          options={{ headerTitle: "" }}
        />
        <MainDrawer.Screen
          name={"Cookbook"}
          component={CookBookScreen}
          options={{ headerTitle: "" }}
        />
        <MainDrawer.Screen
          name={"StressRelief"}
          component={ReliefScreen}
          options={{ headerTitle: "" }}
        />
        <MainDrawer.Screen
          name={"Settings"}
          component={SettingsScreen}
          options={{ headerTitle: "" }}
        />
        <MainDrawer.Screen
          name={"Notifications"}
          component={NotificationScreen}
          options={{ headerTitle: "" }}
        />
      </MainDrawer.Navigator>
    </LinearGradient>
  );
};
