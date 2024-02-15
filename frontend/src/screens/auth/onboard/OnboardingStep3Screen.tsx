import { SafeAreaView } from "react-native";
import React from "react";
import {
  Button,
  HStack,
  Heading,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardingStackParams } from "navigation/auth";
import { ChevronRightIcon } from "@gluestack-ui/themed";
import { ChevronLeftIcon } from "@gluestack-ui/themed";
import { MainDrawerParams } from "navigation/main";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const OnboardingStep3Screen = () => {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();
  const onboardingNavigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView alignItems="center" flex={1}>
        <Heading>
          Set up your <Heading color="#10b981">plan!</Heading>
        </Heading>
        <VStack
          w={"90%"}
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack w={"100%"} mt={20}>
            <Text>
              This step is the most crucial one. We need to make a schedule for
              your plan to be able to track and improve your eating habits.
            </Text>
            <Text>Add food per day, name, time range, size</Text>
          </VStack>
          <HStack gap={10}>
            <Button
              w={"30%"}
              variant="outline"
              onPress={() => onboardingNavigation.navigate("Step2")}
            >
              <ButtonIcon as={ChevronLeftIcon} />
              <ButtonText>Back</ButtonText>
            </Button>
            <Button w={"30%"} onPress={() => navigation.navigate("Main")}>
              <ButtonText>Start</ButtonText>
              <ButtonIcon as={ChevronRightIcon} />
            </Button>
          </HStack>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep3Screen;
