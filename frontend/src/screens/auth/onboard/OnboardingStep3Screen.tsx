import { SafeAreaView } from "react-native";
import React, { useState } from "react";
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
import { OnboardingStackParams } from "navigation/auth";
import { ChevronRightIcon } from "@gluestack-ui/themed";
import { ChevronLeftIcon } from "@gluestack-ui/themed";
import { MainDrawerParams } from "navigation/main";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import MealSetupListItem from "components/custom/MealSetupListItem/MealSetupListItem";
import { z } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppModal from "components/general/AppModal";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "components/form/FormInput";
import { FormSelect } from "components/form/FormSelect";
import { useOnboard } from "calls/auth/onboard/useOnboard";
import { useAuth } from "context/authContext";

export const validationSchema = z.object({
  mealName: z.string().min(1),
  mealSize: z.string().min(1),
  mealTime: z.string().min(1),
});

type SelectedMealType = {
  mealName: string;
  mealSize: string;
  mealTime: string;
};

type FormDataType = z.infer<typeof validationSchema>;

const OnboardingStep3Screen = () => {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();
  const onboardingNavigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();

  const { onboardMutation } = useOnboard();
  const { setAuthState, authState } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<
    SelectedMealType | undefined
  >(undefined);

  const defaultValues: Partial<FormDataType> = {
    mealName: selectedMeal ? selectedMeal?.mealName : "",
    mealSize: selectedMeal ? selectedMeal.mealSize : "",
    mealTime: selectedMeal ? selectedMeal.mealTime : "",
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    values: {
      mealName: selectedMeal ? selectedMeal.mealName : "",
      mealSize: selectedMeal ? selectedMeal.mealSize : "",
      mealTime: selectedMeal ? selectedMeal.mealTime : "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const mealPlannedMocks = [
    {
      mealName: "second breakfast",
      mealTime: "7:30 - 9:00",
      mealSize: "M",
    },
    {
      mealName: "Lunch",
      mealTime: "12:00 - 13:00",
      mealSize: "L",
    },
    { mealName: "Snack", mealTime: "15:00 - 15:30", mealSize: "S" },
  ];

  var startTime = new Date();
  var endTime = new Date();

  startTime.setHours(7);
  startTime.setMinutes(30);
  endTime.setHours(8);
  endTime.setMinutes(0);

  const onSelectMealHandler = (selectedMeal: SelectedMealType) => {
    setShowModal(true);
    setSelectedMeal(selectedMeal);
  };

  const onCloseModalHandler = () => {
    setShowModal(false);
  };

  const onAddMealHandler = () => {
    setSelectedMeal(undefined);
    setShowModal(true);
  };

  const onboardHandler = async () => {
    try {
      await onboardMutation({
        variables: {
          onboardData: {
            email: "test@test.cz",
            firstName: "alfred",
            lastName: "las",
            username: "petr",
            gender: "male",
            bornDate: "2015-03-25",
            body: {
              height: 176.5,
              weight: 76.4,
            },
            eatHabitGoal: "eat more",
            plan: [
              {
                mealName: "breakfast",
                mealSize: "S",
                startTime: "2024-02-16T07:30:00Z",
                endTime: "2024-02-16T07:30:00Z",
              },
              {
                mealName: "lunch",
                mealSize: "L",
                startTime: "2024-02-16T07:30:00Z",
                endTime: "2024-02-16T07:30:00Z",
              },
            ],
          },
        },
      });
      setAuthState!((prevState) => ({
        ...prevState!,
        onboarded: true,
      }));
    } catch (e) {
      console.log(e);
    }
  };

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
                {mealPlannedMocks.map((plannedMeal, i) => (
                  <MealSetupListItem
                    key={i}
                    mealName={plannedMeal.mealName}
                    mealTime={plannedMeal.mealTime}
                    mealSize={plannedMeal.mealSize}
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
          buttonTitle="Add"
          open={showModal}
          onClose={onCloseModalHandler}
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
              <DateTimePicker value={startTime} mode="time" />
              <Heading ml={8}>-</Heading>
              <DateTimePicker value={endTime} mode="time" />
            </HStack>
          </FormProvider>
        </AppModal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep3Screen;
