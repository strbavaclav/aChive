import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "screens/auth/login/LoginScreen";
import RegisterScreen from "screens/auth/register/RegisterScreen";
import SplashScreen from "screens/auth/splash/SplashScreen";

export type AuthStackParams = {
  Splash: undefined;
  Register: undefined;
  Login: undefined;
  Onboarding: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const screenOptions = {
  headerShown: false,
};

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Splash"
      screenOptions={screenOptions}
    >
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ animation: "fade" }}
      />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};
