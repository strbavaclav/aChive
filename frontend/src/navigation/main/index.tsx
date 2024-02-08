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
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomDrawer from "components/navigation/CustomDrawer";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import AboutScreen from "screens/core/about/AboutScreen";
import ShoppingListScreen from "screens/modules/shopping/ShoppingListScreen";

type Props = { children: ReactNode };

export type MainTabsParams = {
  Home: undefined;
  Profile: undefined;
  Planner: undefined;
  Education: undefined;
};

export type MainDrawerParams = {
  Main: undefined;
  Settings: undefined;
  About: undefined;
  Shopping: undefined;
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
    } else if (route.name === "Education") {
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
  return (
    <DrawerScreenWrapper isNotification>
      <MainTab.Navigator
        initialRouteName="Home"
        screenOptions={TabScreenOptions}
      >
        <MainTab.Screen name="Home" component={HomeScreen} />
        <MainTab.Screen name="Planner" component={MealPlannerScreen} />
        <MainTab.Screen name="Education" component={EducationScreen} />
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
      </MainDrawer.Navigator>
    </LinearGradient>
  );
};
