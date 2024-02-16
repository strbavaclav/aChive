import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "context/authContext";
import { AuthStackNavigator, OnboardingStackNavigator } from "navigation/auth";
import { MainDrawerNavigator } from "navigation/main";

export type RootStackParams = {
  AuthNavigator: undefined;
  MainNavigator: undefined;
  OnboardingNavigator: undefined;
};

const RootNavigator = createNativeStackNavigator<RootStackParams>();

const screnOptions = {
  headerShown: false,
};

export const RootStackNavigator = () => {
  const { authState } = useAuth();

  return (
    <RootNavigator.Navigator screenOptions={screnOptions}>
      {authState?.authenticated && authState.onboarded ? (
        <RootNavigator.Screen
          name="MainNavigator"
          component={MainDrawerNavigator}
        />
      ) : authState?.authenticated && !authState.onboarded ? (
        <RootNavigator.Screen
          name="AuthNavigator"
          component={OnboardingStackNavigator}
        />
      ) : (
        <RootNavigator.Screen
          name="AuthNavigator"
          component={AuthStackNavigator}
        />
      )}
    </RootNavigator.Navigator>
  );
};
