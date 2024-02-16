import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ChevronRightIcon,
  Fab,
  FabIcon,
  FabLabel,
  HStack,
  Heading,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormInput } from "components/form/FormInput";
import { FormSelect } from "components/form/FormSelect";
import { OnboardingStackParams } from "navigation/auth";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, SafeAreaView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { z } from "zod";
import { RulerPicker } from "react-native-ruler-picker";

export const validationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  userName: z.string().min(1),
});

type FormDataType = z.infer<typeof validationSchema>;

export const defaultValues: Partial<FormDataType> = {
  firstName: "",
  lastName: "",
  userName: "",
};

const OnboardingStep1Screen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView alignItems="center" flex={1}>
        <Heading>
          Tell us more about <Heading color="#10b981">you!</Heading>
        </Heading>
        <VStack
          mt={10}
          w={"90%"}
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <FormProvider {...formContext}>
            <VStack w={"100%"}>
              <FormInput
                name="firstName"
                placeholder="What's your first name?"
              />
              <FormInput name="lastName" placeholder="And your last name?" />
              <FormInput
                name="userName"
                placeholder="How should we call you?"
              />
              <FormSelect
                name="gender"
                placeholder="What's your gender?"
                options={["Male", "Female", "Other"]}
              />
              <VStack>
                <HStack alignItems="center" mt={20}>
                  <Text mb={8}>When were you born?</Text>
                  <DateTimePicker
                    value={new Date("1995-01-01")}
                    accentColor="#10b981"
                  />
                </HStack>
              </VStack>
              <VStack justifyContent="space-between">
                <VStack mt={30}>
                  <Text>What's your weight?</Text>
                  <Box mt={40} justifyContent="center" alignItems="center">
                    <RulerPicker
                      min={0}
                      max={190}
                      initialValue={67}
                      step={0.1}
                      height={40}
                      width={Dimensions.get("window").width - 40}
                      valueTextStyle={{ fontSize: 15 }}
                      unitTextStyle={{ fontSize: 15 }}
                      indicatorHeight={40}
                      fractionDigits={1}
                      shortStepHeight={10}
                      longStepHeight={30}
                      stepWidth={4}
                      decelerationRate={"normal"}
                      indicatorColor="#10b981"
                      onValueChange={(number) => console.log(number)}
                      onValueChangeEnd={(number) => console.log(number)}
                      unit="kg"
                    />
                  </Box>
                </VStack>
                <VStack mt={30}>
                  <Text>What's your height?</Text>
                  <Box mt={40} justifyContent="center" alignItems="center">
                    <RulerPicker
                      min={0}
                      max={240}
                      initialValue={175}
                      step={0.5}
                      height={40}
                      width={Dimensions.get("window").width - 40}
                      valueTextStyle={{ fontSize: 15 }}
                      unitTextStyle={{ fontSize: 15 }}
                      indicatorHeight={40}
                      fractionDigits={1}
                      shortStepHeight={10}
                      longStepHeight={30}
                      stepWidth={4}
                      decelerationRate={"normal"}
                      indicatorColor="#10b981"
                      onValueChange={(number) => console.log(number)}
                      onValueChangeEnd={(number) => console.log(number)}
                      unit="cm"
                    />
                  </Box>
                </VStack>
              </VStack>
            </VStack>
          </FormProvider>
          <Button w={"60%"} onPress={() => navigation.navigate("Step2")}>
            <ButtonText>Next step</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep1Screen;
