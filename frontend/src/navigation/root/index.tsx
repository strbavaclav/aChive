import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "context/authContext";
import { AuthStackNavigator } from "navigation/auth";
import { MainDrawerNavigator } from "navigation/main";

export type RootStackParams = {
  AuthNavigator: undefined;
  MainNavigator: undefined;
};

const RootNavigator = createNativeStackNavigator<RootStackParams>();

const screnOptions = {
  headerShown: false,
};

export const RootStackNavigator = () => {
  const { authState } = useAuth();

  return (
    <RootNavigator.Navigator screenOptions={screnOptions}>
      {authState?.authenticated ? (
        <RootNavigator.Screen
          name="MainNavigator"
          component={MainDrawerNavigator}
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
