import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  AddIcon,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRightIcon } from "@gluestack-ui/themed";
import { ChevronLeftIcon } from "@gluestack-ui/themed";
import MealSetupListItem from "components/custom/MealSetupListItem/MealSetupListItem";
import { z } from "zod";

import AppModal from "components/general/AppModal";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "components/form/FormSelect";
import { useOnboard } from "calls/auth/onboard/useOnboard";
import { useAuth } from "context/authContext";
import { FormInput } from "components/form/FormInput";
import { PlannedMealType, UserType, useApp } from "context/appContext";
import { OnboardingStackParams } from "navigation/onboarding";
import { FormDateTimePicker } from "components/form/FormDateTimePicker";

export const validationSchema = z.object({
  mealName: z.string().min(1),
  mealSize: z.string().min(1),
  startTime: z.date(),
  endTime: z.date(),
});

type FormDataType = z.infer<typeof validationSchema>;

export const getDefaultTime = (hours: number, minutes: number) => {
  const date = new Date();
  date.setHours(hours, minutes);
  return date;
};

const OnboardingStep3Screen = () => {
  const onboardingNavigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();

  const { onboardMutation } = useOnboard();
  const { setAuthState } = useAuth();
  const { appState, setAppState } = useApp();

  const defaultStartTime = getDefaultTime(7, 30);
  const defaultEndTime = getDefaultTime(8, 0);

  const [plannedMeals, setPlannedMeals] = useState<PlannedMealType[]>([
    {
      mealName: "Breakfast",
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

  const onSelectMealHandler = (selectedMeal: PlannedMealType) => {
    setShowModal(true);
    setSelectedMeal(selectedMeal);
  };

  const onCloseModalHandler = () => {
    setSelectedMeal(undefined);
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
    } = onboardData ?? {};

    const plannedMealsConverted = plannedMeals.map((meal) => ({
      ...meal,
      endTime: meal.endTime ? meal.endTime.toISOString() : "",
      mealName: meal.mealName || "Default Meal Name",
      mealSize: meal.mealSize || "Default Meal Size",
      startTime: meal.startTime ? meal.startTime.toISOString() : "",
    }));

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
        prevState.map((meal, index) =>
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

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) =>
    console.log(errors);

  const onPress = formContext.handleSubmit(onSubmit, onError);

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
          <ScrollView w={"100%"} showsVerticalScrollIndicator={false}>
            <VStack w={"100%"} mt={20} gap={10}>
              <Text>
                This last step is the most important one. We need to make a
                schedule for your plan to be able to track and improve your
                eating habits.
              </Text>
              <Text>
                How many meals you would like to eat per day, at what time and
                what meal sizes?
              </Text>
              <Accordion width="100%" type="single" isCollapsible={true}>
                <AccordionItem value="NoMeals">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <HStack alignItems="center">
                            <Text bold size="sm">
                              How many meals per day is optimal?
                            </Text>
                            {isExpanded ? (
                              <AccordionIcon as={ChevronUpIcon} />
                            ) : (
                              <AccordionIcon as={ChevronDownIcon} />
                            )}
                          </HStack>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Text size="xs">
                      Nutrition experts tend to recommend eating 3 balanced
                      meals and 1 to 3 snacks per day.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="timeMeal">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <HStack alignItems="center">
                            <Text bold size="sm">
                              When to eat my meals?
                            </Text>
                            {isExpanded ? (
                              <AccordionIcon as={ChevronUpIcon} />
                            ) : (
                              <AccordionIcon as={ChevronDownIcon} />
                            )}
                          </HStack>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Text size="xs">
                      There are a few principles that are good to follow.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="sizeMeal">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <HStack alignItems="center">
                            <Text bold size="sm">
                              What is a meal size?
                            </Text>
                            {isExpanded ? (
                              <AccordionIcon as={ChevronUpIcon} />
                            ) : (
                              <AccordionIcon as={ChevronDownIcon} />
                            )}
                          </HStack>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Text size="xs">T-Shirt sizes XS, S, M, L</Text>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <VStack w={"100%"} mt={10} gap={4}>
                {plannedMeals.map((plannedMeal: PlannedMealType, i) => (
                  <MealSetupListItem
                    key={i}
                    mealName={plannedMeal.mealName!}
                    mealTime={
                      plannedMeal.startTime?.getHours() +
                      ":" +
                      (plannedMeal.startTime?.getMinutes() === 0
                        ? "00"
                        : plannedMeal.startTime?.getMinutes()) +
                      " - " +
                      (plannedMeal.endTime?.getHours() +
                        ":" +
                        (plannedMeal.endTime?.getMinutes() === 0
                          ? "00"
                          : plannedMeal.endTime?.getMinutes()))
                    }
                    mealSize={plannedMeal.mealSize!}
                    onPress={() => {
                      onSelectMealHandler(plannedMeal);
                    }}
                  />
                ))}
                <HStack w={"100%"} alignItems="center" justifyContent="center">
                  <Button
                    w={"20%"}
                    size="sm"
                    onPress={() => setShowModal(true)}
                  >
                    <ButtonText>Add</ButtonText>
                    <ButtonIcon as={AddIcon} />
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </ScrollView>

          <HStack gap={10} pt={20}>
            <Button
              w={"30%"}
              variant="outline"
              onPress={() => onboardingNavigation.navigate("Step2")}
            >
              <ButtonIcon as={ChevronLeftIcon} />
              <ButtonText>Back</ButtonText>
            </Button>
            <Button w={"30%"} onPress={onboardHandler}>
              <ButtonText>Start</ButtonText>
              <ButtonIcon as={ChevronRightIcon} />
            </Button>
          </HStack>
        </VStack>
        <AppModal
          title="Add meal to plan"
          buttonTitle={selectedMeal ? "Save" : "Add"}
          open={showModal}
          onClose={onCloseModalHandler}
          onSubmit={onPress}
        >
          <FormProvider {...formContext}>
            <FormInput
              label="Insert meal name"
              name="mealName"
              placeholder="eg. Breakfast"
            />
            <FormSelect
              name="mealSize"
              placeholder="Select meal size"
              options={["XS", "S", "M", "L"]}
            />

            <FormControlLabel>
              <FormControlLabelText>Choose time range</FormControlLabelText>
            </FormControlLabel>
            <HStack
              width={"100%"}
              alignItems="center"
              justifyContent="center"
              gap={1}
              p={5}
            >
              <FormDateTimePicker name="startTime" mode="time" />
              <Heading ml={8}>-</Heading>
              <FormDateTimePicker name="endTime" mode="time" />
            </HStack>
          </FormProvider>
        </AppModal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep3Screen;
