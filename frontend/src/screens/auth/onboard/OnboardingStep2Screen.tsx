import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronLeftIcon,
  ChevronRightIcon,
  FavouriteIcon,
  HStack,
  Heading,
  Icon,
  KeyboardAvoidingView,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormSelect } from "components/form/FormSelect";
import { FormTextArea } from "components/form/FormTextArea";
import { OnboardingStackParams } from "navigation/auth";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { z } from "zod";

export const validationSchema = z.object({
  email: z.string().email("Incorect Email!").min(5),
  password: z.string().min(1, "Password must be filled!"),
});

type FormDataType = z.infer<typeof validationSchema>;

export const defaultValues: Partial<FormDataType> = {
  email: "test@be.com",
  password: "Abeceda123",
};

const OnboardingStep2Screen = () => {
  const [stress, setStress] = useState(5);
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
                name="goal"
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
              <Text size="xs">
                Slide the knob to select the level of stress
              </Text>
              <HStack w={"100%"} justifyContent="center" alignItems="center">
                <Slider
                  w={"85%"}
                  mt={20}
                  minValue={0}
                  maxValue={10}
                  step={1}
                  sliderTrackHeight={5}
                  size="md"
                  value={stress}
                  onChange={(value) => {
                    setStress(value);
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    alignItems="center"
                    justifyContent="center"
                    width={30}
                    height={25}
                  >
                    <Icon as={FavouriteIcon} color="white" size="md" />
                  </SliderThumb>
                </Slider>
              </HStack>
              <HStack w={"100%"} justifyContent="space-between">
                <Text>Stressful</Text>
                <Text bold>{stress}</Text>
                <Text>Peaceful</Text>
              </HStack>
              <VStack mt={30} space="md">
                <FormTextArea
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
          <Button w={"30%"} onPress={() => navigation.navigate("Step3")}>
            <ButtonText>Next step</ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </HStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingStep2Screen;
