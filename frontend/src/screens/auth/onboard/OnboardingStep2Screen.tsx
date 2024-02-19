import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronLeftIcon,
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
import { FormSelect } from "components/form/FormSelect";
import { FormSlider } from "components/form/FormSlider";
import { FormTextArea } from "components/form/FormTextArea";
import { useApp } from "context/appContext";
import { OnboardingStackParams } from "navigation/onboarding";
import React from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { SafeAreaView } from "react-native";
import { z } from "zod";

export const validationSchema = z.object({
  eatHabitGoal: z.string().min(1, "Goal must be selected!"),
  stressRecordValue: z.number(),
  stressRecordNote: z.string(),
});

type FormDataType = z.infer<typeof validationSchema>;

export const defaultValues: Partial<FormDataType> = {
  eatHabitGoal: "",
  stressRecordValue: 5,
  stressRecordNote: "",
};

const OnboardingStep2Screen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParams>>();

  const { setAppState } = useApp();

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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView alignItems="center" flex={1}>
        <Heading>
          Describe your <Heading color="#10b981">goals!</Heading>
        </Heading>
        <VStack
          flex={1}
          w={"90%"}
          justifyContent="space-between"
          alignItems="center"
        >
          <FormProvider {...formContext}>
            <VStack w={"100%"} space="lg" mt={20}>
              <Text>First we need to lay out your eating habit goal!</Text>
              <FormSelect
                name="eatHabitGoal"
                options={["Eat more", "Eat less", "Be consistent"]}
                placeholder="I would like to..."
              />
              <Text>
                Stress in our life has a big effect on how we eat. In this step
                you will determine how stressed you feel at the moment.
              </Text>
              <Text>
                On the scale 1 (extreme stress) - 10 (no stress at all) how much
                stress are we facing together?
              </Text>

              <FormSlider name="stressRecordValue" label={""} />

              <VStack mt={30} space="md">
                <FormTextArea
                  name="stressRecordNote"
                  label="Could you elaborate on it?"
                  placeholder="I feel stressed because of..."
                />
              </VStack>
            </VStack>
          </FormProvider>
        </VStack>

        <HStack gap={10}>
          <Button
            w={"30%"}
            variant="outline"
            onPress={() => navigation.navigate("Step1")}
          >
            <ButtonIcon as={ChevronLeftIcon} />
            <ButtonText>Back</ButtonText>
          </Button>
          <Button w={"30%"} onPress={onPress}>
            <ButtonText>Next step</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </HStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep2Screen;
