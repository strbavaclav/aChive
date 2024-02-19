import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingStep1Screen from "screens/auth/onboard/OnboardingStep1Screen";
import OnboardingStep2Screen from "screens/auth/onboard/OnboardingStep2Screen";
import OnboardingStep3Screen from "screens/auth/onboard/OnboardingStep3Screen";

export type OnboardingStackParams = {
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
};

const OnboardingStack = createNativeStackNavigator<OnboardingStackParams>();

const screenOptions = {
  headerShown: false,
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
