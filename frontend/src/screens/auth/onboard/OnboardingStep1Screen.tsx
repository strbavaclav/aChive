import React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronRightIcon,
  HStack,
  Heading,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { z } from "zod";
import { OnboardingStackParams } from "navigation/onboarding";
import { useApp } from "context/appContext";
import { useTranslation } from "react-i18next";
import {
  FormDateTimePicker,
  FormInput,
  FormRulerPicker,
  FormSelect,
} from "components/form";

const OnboardingStep1Screen = () => {
  const { setAppState } = useApp();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();

  const validationSchema = z.object({
    firstName: z.string().min(1, t("onboarding.step1.error.required")),
    lastName: z.string().min(2, t("onboarding.step1.error.required")),
    username: z.string().min(5, t("onboarding.step1.error.shortUsername")),
    gender: z.string().min(1, t("onboarding.step1.error.required")),
    bornDate: z.date(),
    height: z.number(),
    weight: z.number(),
  });

  type FormDataType = z.infer<typeof validationSchema>;

  const defaultValues: Partial<FormDataType> = {
    firstName: "",
    lastName: "",
    username: "",
    gender: "",
    bornDate: new Date(),
    height: 175,
    weight: 65,
  };

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
          {t("onboarding.step1.title1")}
          <Heading color="$primary500">{t("onboarding.step1.title2")}</Heading>
        </Heading>
        <VStack
          mt={10}
          w={"90%"}
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ScrollView w={"100%"} showsVerticalScrollIndicator={false}>
            <FormProvider {...formContext}>
              <VStack w={"100%"}>
                <FormInput
                  name="firstName"
                  placeholder={t("onboarding.step1.label.firstName")}
                />
                <FormInput
                  name="lastName"
                  placeholder={t("onboarding.step1.label.lastName")}
                />
                <FormInput
                  name="username"
                  placeholder={t("onboarding.step1.label.username")}
                />
                <FormSelect
                  name="gender"
                  placeholder={t("onboarding.step1.label.gender")}
                  options={[
                    { label: t("gender.Male"), value: "Male" },
                    { label: t("gender.Female"), value: "Female" },
                    { label: t("gender.Other"), value: "Other" },
                  ]}
                />
                <VStack justifyContent="center">
                  <HStack alignItems="center" mt={10}>
                    <Text top={6}>{t("onboarding.step1.label.born")}</Text>
                    <FormDateTimePicker name="bornDate" />
                  </HStack>
                </VStack>
                <VStack justifyContent="space-between">
                  <FormRulerPicker
                    name="weight"
                    label={t("onboarding.step1.label.weight")}
                    initialValue={65}
                    max={190}
                    min={0}
                    step={0.1}
                    unit="kg"
                  />
                  <FormRulerPicker
                    name="height"
                    label={t("onboarding.step1.label.height")}
                    initialValue={175}
                    max={240}
                    min={0}
                    step={0.5}
                    unit="cm"
                  />
                </VStack>
              </VStack>
            </FormProvider>
          </ScrollView>
          <Button w={"60%"} onPress={onPress}>
            <ButtonText>{t("onboarding.action.next")}</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep1Screen;
