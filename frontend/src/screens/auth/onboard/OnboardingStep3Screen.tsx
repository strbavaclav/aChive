import React, { useEffect, useState } from "react";
import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Heading,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TrashIcon,
  VStack,
} from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { z } from "zod";

import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useOnboard } from "calls/auth/onboard/useOnboard";
import { useAuth } from "context/authContext";

import { PlannedMealType, UserType, useApp } from "context/appContext";
import { OnboardingStackParams } from "navigation/onboarding";
import { FormDateTimePicker, FormInput, FormSelect } from "components/form";
import TipsAccordion from "components/modules/onboarding/TipsAccordion";
import { useTranslation } from "react-i18next";
import { MealPlan } from "components/modules/onboarding/MealPlan";
import { AppModal } from "components/general/AppModal";
import moment from "moment";

const OnboardingStep3Screen = () => {
  const { t } = useTranslation();

  const onboardingNavigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();

  const { onboardMutation } = useOnboard();
  const { setAuthState } = useAuth();
  const { appState, setAppState } = useApp();

  const validationSchema = z.object({
    mealName: z.string().min(1, t("onboarding.step3.error.required")),
    mealSize: z.string().min(1, t("onboarding.step3.error.required")),
    startTime: z.date(),
    endTime: z.date(),
  });

  type FormDataType = z.infer<typeof validationSchema>;

  const getDefaultTime = (hours: number, minutes: number) => {
    const date = new Date();
    date.setHours(hours, minutes);
    return date;
  };

  const defaultStartTime = getDefaultTime(7, 30);
  const defaultEndTime = getDefaultTime(8, 0);

  const [plannedMeals, setPlannedMeals] = useState<PlannedMealType[]>([
    {
      mealName: t("onboarding.step3.labels.breakfast"),
      mealSize: "M",
      startTime: defaultStartTime,
      endTime: defaultEndTime,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<PlannedMealType | undefined>(
    undefined
  );

  const formContext = useForm<FormDataType>({
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    const defaultValues: Partial<FormDataType> = {
      mealName: selectedMeal?.mealName ?? "",
      mealSize: selectedMeal?.mealSize ?? "",
      startTime: selectedMeal?.startTime ?? defaultStartTime,
      endTime: selectedMeal?.endTime ?? defaultEndTime,
    };

    formContext.reset(defaultValues);
  }, [selectedMeal, formContext.reset]);

  const onAddMealHandler = () => {
    setSelectedMeal(undefined);
    setShowModal(true);
  };

  const onSelectMealHandler = (selectedMeal: PlannedMealType) => {
    setShowModal(true);
    setSelectedMeal(selectedMeal);
  };

  const onCloseModalHandler = () => {
    setShowModal(false);
  };

  const onboardHandler = async () => {
    const { userData, onboardData } = appState;

    const { email } = userData ?? {};
    const {
      firstName,
      lastName,
      username,
      gender,
      bornDate,
      body,
      eatHabitGoal,
      stressRecordNote,
      stressRecordValue,
    } = onboardData ?? {};

    const plannedMealsConverted = plannedMeals.map((meal) => ({
      ...meal,
      endTime: meal.endTime ? meal.endTime.toISOString() : "",
      mealName: meal.mealName || "Default Meal Name",
      mealSize: meal.mealSize || "Default Meal Size",
      startTime: meal.startTime ? meal.startTime.toISOString() : "",
    }));

    console.log(stressRecordNote, stressRecordValue, moment().format());

    try {
      const response = await onboardMutation({
        variables: {
          onboardData: {
            email: email!,
            firstName: firstName!,
            lastName: lastName!,
            username: username!,
            gender: gender!,
            bornDate: String(bornDate!),
            body: {
              height: body?.height!,
              weight: body?.weight!,
            },
            eatHabitGoal: eatHabitGoal!,
            plan: plannedMealsConverted,
            stress: {
              timestamp: moment().format(),
              note: stressRecordNote,
              value: stressRecordValue!,
            },
          },
        },
      });
      console.log(response.data?.onboard);
      setAuthState!((prevState) => ({
        ...prevState!,
        onboarded: true,
      }));

      setAppState((prevState) => ({
        ...prevState,
        userData: { ...(response.data?.onboard as UserType) },
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    if (selectedMeal) {
      setPlannedMeals((prevState) =>
        prevState.map((meal) =>
          meal === selectedMeal
            ? {
                ...meal,
                mealName: values.mealName,
                mealSize: values.mealSize,
                startTime: values.startTime,
                endTime: values.endTime,
              }
            : meal
        )
      );
    } else {
      const newMeal = {
        mealName: values.mealName,
        mealSize: values.mealSize,
        startTime: values.startTime,
        endTime: values.endTime,
      };
      setPlannedMeals((prevState) => [...prevState, newMeal]);
    }

    setSelectedMeal(undefined);
    setShowModal(false);
  };

  const onDelete = () => {
    if (selectedMeal) {
      setPlannedMeals((prevState) =>
        prevState.filter((meal) => meal !== selectedMeal)
      );
      setSelectedMeal(undefined);
      setShowModal(false);
    }
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) =>
    console.log(errors);

  const onPress = formContext.handleSubmit(onSubmit, onError);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView alignItems="center" flex={1}>
        <Heading>
          {t("onboarding.step3.title1")}
          <Heading color="$primary500">{t("onboarding.step3.title2")}</Heading>
        </Heading>
        <VStack
          w={"90%"}
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ScrollView w={"100%"} showsVerticalScrollIndicator={false}>
            <VStack w={"100%"} mt={20} gap={10}>
              <Text>{t("onboarding.step3.text.plan1")}</Text>
              <Text>{t("onboarding.step3.text.plan2")}</Text>
              <TipsAccordion />
              <MealPlan
                plannedMeals={plannedMeals}
                onAddMeal={onAddMealHandler}
                onSelectMeal={onSelectMealHandler}
              />
            </VStack>
          </ScrollView>

          <HStack gap={10} pt={20}>
            <Button
              w={"30%"}
              action="secondary"
              onPress={() => onboardingNavigation.navigate("Step2")}
            >
              <ButtonIcon as={ChevronLeftIcon} />
              <ButtonText>{t("onboarding.action.back")}</ButtonText>
            </Button>
            <Button w={"30%"} onPress={onboardHandler}>
              <ButtonText>{t("onboarding.action.start")}</ButtonText>
              <ButtonIcon as={ChevronRightIcon} />
            </Button>
          </HStack>
        </VStack>

        <AppModal
          title={t("onboarding.step3.labels.addMeal")}
          open={showModal}
          onClose={onCloseModalHandler}
          footer={
            <HStack
              w={"100%"}
              justifyContent={selectedMeal ? "space-between" : "flex-end"}
            >
              {selectedMeal && (
                <Button
                  size="sm"
                  borderWidth="$0"
                  onPress={onDelete}
                  action="negative"
                >
                  <ButtonIcon as={TrashIcon} mr={4} />
                  <ButtonText>{t("onboarding.step3.action.delete")}</ButtonText>
                </Button>
              )}
              <Button size="sm" borderWidth="$0" onPress={onPress}>
                {selectedMeal && <ButtonIcon as={EditIcon} mr={4} />}
                <ButtonText>
                  {selectedMeal
                    ? t("onboarding.step3.action.edit")
                    : t("onboarding.step3.action.add")}
                </ButtonText>
                {!selectedMeal && <ButtonIcon as={AddIcon} mr={4} />}
              </Button>
            </HStack>
          }
        >
          <FormProvider {...formContext}>
            <FormInput
              name="mealName"
              placeholder={t("onboarding.step3.placeholders.mealName")}
            />
            <FormSelect
              name="mealSize"
              placeholder={t("onboarding.step3.placeholders.mealSize")}
              options={[
                { label: "XS", value: "XS" },
                { label: "S", value: "S" },
                { label: "M", value: "M" },
                { label: "L", value: "L" },
              ]}
            />

            <FormControlLabel>
              <FormControlLabelText>
                {t("onboarding.step3.labels.timeRange")}
              </FormControlLabelText>
            </FormControlLabel>
            <HStack
              width={"100%"}
              alignItems="center"
              justifyContent="center"
              gap={1}
              p={5}
            >
              <FormDateTimePicker name="startTime" mode="time" />
              <Heading ml={8} top={8}>
                -
              </Heading>
              <FormDateTimePicker name="endTime" mode="time" />
            </HStack>
          </FormProvider>
        </AppModal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep3Screen;
