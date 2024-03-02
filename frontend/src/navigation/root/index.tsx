import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useApp } from "context/appContext";
import { useAuth } from "context/authContext";
import { AuthStackNavigator } from "navigation/auth";
import { MainDrawerNavigator } from "navigation/main";
import { OnboardingStackNavigator } from "navigation/onboarding";

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
  const { appState } = useApp();

  return (
    <RootNavigator.Navigator screenOptions={screnOptions}>
      {authState?.authenticated && authState.onboarded && appState.userData ? (
        <RootNavigator.Screen
          name="MainNavigator"
          component={MainDrawerNavigator}
        />
      ) : authState?.authenticated && !authState.onboarded ? (
        <RootNavigator.Screen
          name="OnboardingNavigator"
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
