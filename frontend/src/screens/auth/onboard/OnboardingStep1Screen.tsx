import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  ChevronRightIcon,
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
import React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { SafeAreaView } from "react-native";

import { z } from "zod";
import { OnboardingStackParams } from "navigation/onboarding";
import { FormDateTimePicker } from "components/form/FormDateTimePicker";
import { FormRulerPicker } from "components/form/FormRulerPicker";
import { useApp } from "context/appContext";

export const validationSchema = z.object({
  firstName: z.string().min(2, "First name is required!"),
  lastName: z.string().min(2, "Last name is required!"),
  username: z.string().min(5, "Username is too short"),
  gender: z.string().min(1, "Gender must be selected"),
  bornDate: z.date(),
  height: z.number(),
  weight: z.number(),
});

type FormDataType = z.infer<typeof validationSchema>;

export const defaultValues: Partial<FormDataType> = {
  firstName: "",
  lastName: "",
  username: "",
  gender: "",
  bornDate: new Date(),
  height: 175,
  weight: 65,
};

const OnboardingStep1Screen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();

  const { setAppState } = useApp();

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    const { firstName, lastName, username, gender, bornDate, height, weight } =
      values;
    setAppState((prevState) => ({
      ...prevState,
      onboardData: {
        ...prevState.onboardData,
        firstName,
        lastName,
        username,
        gender,
        bornDate,
        body: { weight, height },
      },
    }));
    navigation.navigate("Step2");
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) =>
    console.log(errors);

  const onPress = formContext.handleSubmit(onSubmit, onError);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
                name="username"
                placeholder="How should we call you?"
              />
              <FormSelect
                name="gender"
                placeholder="What's your gender?"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
              />
              <VStack>
                <HStack alignItems="center" mt={20}>
                  <Text mb={8}>When were you born?</Text>
                  <FormDateTimePicker name="bornDate" />
                </HStack>
              </VStack>
              <VStack justifyContent="space-between">
                <FormRulerPicker
                  name="weight"
                  label="What's your weight?"
                  initialValue={65}
                  max={190}
                  min={0}
                  step={0.1}
                  unit="kg"
                />
                <FormRulerPicker
                  name="height"
                  label="What's your height?"
                  initialValue={175}
                  max={240}
                  min={0}
                  step={0.5}
                  unit="cm"
                />
              </VStack>
            </VStack>
          </FormProvider>
          <Button w={"60%"} onPress={onPress}>
            <ButtonText>Next step</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep1Screen;
