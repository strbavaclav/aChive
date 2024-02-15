import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "screens/auth/login/LoginScreen";
import RegisterScreen from "screens/auth/register/RegisterScreen";
import SplashScreen from "screens/auth/splash/SplashScreen";
import OnboardingStep1Screen from "screens/auth/onboard/OnboardingStep1Screen";
import OnboardingStep2Screen from "screens/auth/onboard/OnboardingStep2Screen";
import OnboardingStep3Screen from "screens/auth/onboard/OnboardingStep3Screen";

export type AuthStackParams = {
  Splash: undefined;
  Register: undefined;
  Login: undefined;
  Onboarding: undefined;
};

export type OnboardingStackParams = {
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParams>();

const screenOptions = {
  headerShown: false,
};

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ animation: "fade" }}
      />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingStackNavigator}
      />
    </AuthStack.Navigator>
  );
};

export const OnboardingStackNavigator = () => {
  return (
    <OnboardingStack.Navigator
      initialRouteName="Step1"
      screenOptions={screenOptions}
    >
      <OnboardingStack.Screen name="Step1" component={OnboardingStep1Screen} />
      <OnboardingStack.Screen name="Step2" component={OnboardingStep2Screen} />
      <OnboardingStack.Screen name="Step3" component={OnboardingStep3Screen} />
    </OnboardingStack.Navigator>
  );
};
