import React from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronLeftIcon,
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
import { FormSelect, FormTextArea } from "components/form";

import { useApp } from "context/appContext";
import { OnboardingStackParams } from "navigation/onboarding";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { z } from "zod";
import { useTranslation } from "react-i18next";
import { StressSlider } from "components/modules/stress/StressSlider";

const OnboardingStep2Screen = () => {
  const { setAppState } = useApp();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();

  const validationSchema = z.object({
    eatHabitGoal: z.string().min(1, t("onboarding.step2.error.eatingGoal")),
    stressRecordValue: z.number(),
    stressRecordNote: z.string(),
  });

  type FormDataType = z.infer<typeof validationSchema>;

  const defaultValues: Partial<FormDataType> = {
    eatHabitGoal: "",
    stressRecordValue: 5,
    stressRecordNote: "",
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    const { eatHabitGoal, stressRecordValue, stressRecordNote } = values;
    setAppState((prevState) => ({
      ...prevState,
      onboardData: {
        ...prevState.onboardData,
        eatHabitGoal,
        stressRecordValue,
        stressRecordNote,
      },
    }));
    navigation.navigate("Step3");
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) =>
    console.log(errors);

  const onPress = formContext.handleSubmit(onSubmit, onError);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView alignItems="center" flex={1}>
        <Heading>
          {t("onboarding.step2.title1")}
          <Heading color="$primary500">{t("onboarding.step2.title2")}</Heading>
        </Heading>
        <VStack
          flex={1}
          w={"90%"}
          justifyContent="space-between"
          alignItems="center"
        >
          <ScrollView w={"100%"} showsVerticalScrollIndicator={false}>
            <FormProvider {...formContext}>
              <VStack w={"100%"} space="lg" mt={20}>
                <Text textAlign="center">
                  {t("onboarding.step2.text.eatingGoal")}
                </Text>
                <FormSelect
                  name="eatHabitGoal"
                  options={[
                    { label: t("eatingGoal.more"), value: "more" },
                    { label: t("eatingGoal.less"), value: "less" },
                    { label: t("eatingGoal.consistent"), value: "consistent" },
                  ]}
                  placeholder={t("onboarding.step2.label.eatingGoal")}
                />
                <Text>{t("onboarding.step2.text.stress1")}</Text>
                <Text>{t("onboarding.step2.text.stress2")}</Text>

                <StressSlider name="stressRecordValue" label={""} />

                <VStack mt={30} space="md">
                  <FormTextArea
                    name="stressRecordNote"
                    label={t("onboarding.step2.label.stress")}
                    placeholder={t("onboarding.step2.label.stressNote")}
                  />
                </VStack>
              </VStack>
            </FormProvider>
          </ScrollView>
        </VStack>
        <HStack gap={10}>
          <Button
            w={"30%"}
            action="secondary"
            onPress={() => navigation.navigate("Step1")}
          >
            <ButtonIcon as={ChevronLeftIcon} />
            <ButtonText>{t("onboarding.action.back")}</ButtonText>
          </Button>
          <Button w={"30%"} onPress={onPress}>
            <ButtonText>{t("onboarding.action.next")}</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </HStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep2Screen;
