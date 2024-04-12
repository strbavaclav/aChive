import React, { useEffect, useState } from "react";
import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  CloseIcon,
  EditIcon,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Heading,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Spinner,
  Text,
  TrashIcon,
  VStack,
} from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";

import { z } from "zod";

import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlannedMealType, useApp } from "context/appContext";
import { FormDateTimePicker, FormInput, FormSelect } from "components/form";
import TipsAccordion from "components/modules/onboarding/TipsAccordion";
import { useTranslation } from "react-i18next";
import { MealPlan } from "components/modules/onboarding/MealPlan";
import { AppModal } from "components/general/AppModal";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainDrawerParams } from "navigation/main";
import { useChangeMealPlan } from "calls/user/useChangeMealPlan";

export const MealPlannerSettingsScreen = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();

  const { appState, refetchUserData } = useApp();
  const { changeMealPlanMutation } = useChangeMealPlan();

  function convertTimestampsToDates(plannedMeals: PlannedMealType[]) {
    return plannedMeals.map((meal) => {
      const startTime = new Date(parseInt(meal.startTime as unknown as string));
      const endTime = new Date(parseInt(meal.endTime as unknown as string));
      return {
        ...meal,
        startTime,
        endTime,
      };
    });
  }

  const oldPlannedMeals = appState.userData?.plan;
  const updatedOldPlannedMeals = convertTimestampsToDates(
    oldPlannedMeals!
  ) as unknown as PlannedMealType[];


  const validationSchema = z.object({
    _id: z.string(),
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

  const [plannedMeals, setPlannedMeals] = useState<PlannedMealType[]>(
    updatedOldPlannedMeals
  );
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
      _id: selectedMeal?._id ?? "",
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

  const onSaveHandler = async () => {
    setIsLoading(true);
    const plannedMealsConverted = plannedMeals.map((meal) => ({
      _id: meal._id || "",
      endTime: meal.endTime ? meal.endTime.toISOString() : "",
      mealName: meal.mealName || "Default Meal Name",
      mealSize: meal.mealSize || "Default Meal Size",
      startTime: meal.startTime ? meal.startTime.toISOString() : "",
    }));

    try {
      await changeMealPlanMutation({
        variables: {
          newPlan: plannedMealsConverted,
        },
      });
      await refetchUserData();
      setIsLoading(false);
      navigation.goBack();
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
        _id: "",
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

  const onCancelHandler = () => {
    setPlannedMeals(updatedOldPlannedMeals);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView alignItems="center" flex={1}>
        <Heading>
          {t("mealPlanner.change.title1")}
          <Heading color="$primary500">
            {t("mealPlanner.change.title2")}
          </Heading>
        </Heading>
        <VStack
          w={"90%"}
          flex={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ScrollView w={"100%"} showsVerticalScrollIndicator={false}>
            <VStack w={"100%"} mt={20} gap={10}>
              <Text>{t("mealPlanner.change.description1")}</Text>
              <Text>{t("mealPlanner.change.description2")}</Text>
              <TipsAccordion />
              <MealPlan
                plannedMeals={plannedMeals}
                onAddMeal={onAddMealHandler}
                onSelectMeal={onSelectMealHandler}
              />
            </VStack>
          </ScrollView>

          <HStack gap={10} pt={20}>
            <Button w={"30%"} action="secondary" onPress={onCancelHandler}>
              <ButtonIcon as={CloseIcon} mr={4} />
              <ButtonText>{t("general.cancel")}</ButtonText>
            </Button>
            <Button w={"30%"} onPress={onSaveHandler} disabled={isLoading}>
              {isLoading ? (
                <Spinner size={"small"} color="#fff" />
              ) : (
                <>
                  <ButtonText>{t("general.save")}</ButtonText>
                  <ButtonIcon as={EditIcon} ml={4} />
                </>
              )}
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
