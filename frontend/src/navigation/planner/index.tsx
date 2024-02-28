import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealPlannerScreen from "screens/modules/mealplanning/MealPlannerScreen";

export type PlannerStackParams = {
  MealPlanner: undefined;
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
    </PlannerStack.Navigator>
  );
};
