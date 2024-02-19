import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealPlannerDetailScreen from "screens/modules/mealplanning/MealPlannerDetailScreen";
import MealPlannerScreen from "screens/modules/mealplanning/MealPlannerScreen";

export type PlannerStackParams = {
  MealPlanner: undefined;
  MealPlannerDetail: undefined;
};

const PlannerStack = createNativeStackNavigator<PlannerStackParams>();

const screenOptions = {
  headerShown: false,
};

export const PlannerStackNavigator = () => {
  return (
    <PlannerStack.Navigator
      initialRouteName="MealPlanner"
      screenOptions={screenOptions}
    >
      <PlannerStack.Screen name="MealPlanner" component={MealPlannerScreen} />
      <PlannerStack.Screen
        name="MealPlannerDetail"
        component={MealPlannerDetailScreen}
      />
    </PlannerStack.Navigator>
  );
};
