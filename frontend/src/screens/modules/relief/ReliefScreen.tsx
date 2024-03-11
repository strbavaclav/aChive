import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  FavouriteIcon,
  HStack,
  Heading,
  Icon,
  LockIcon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import DateSlider from "components/custom/DateSlider";
import { FormTextArea } from "components/form/FormTextArea";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

export const validationSchema = z.object({
  stressNote: z.string(),
});

type FormDataType = z.infer<typeof validationSchema>;

export const defaultValues: Partial<FormDataType> = {
  stressNote: "",
};

const stressLevel = [
  "Stressed Out",
  "Very Stressed",
  "Quite Stressed",
  "Moderately Stressed",
  "Somewhat Stressed",
  "Neutral",
  "Slightly Relaxed",
  "Somewhat Relaxed",
  "Moderately Relaxed",
  "Very Relaxed",
  "Peace",
];

const ReliefScreen = () => {
  const [sliderValue, setSliderValue] = React.useState(5);
  const [selectedDay, setSelectedDay] = React.useState(new Date());
  const [showHelp, setShowHelp] = React.useState(false);

  const handleChange = (value: number) => {
    setSliderValue(value);
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  return (
    <DrawerScreenWrapper isBack screenTitle="Stress relief">
      <DateSlider onDaySelect={setSelectedDay} daySelected={selectedDay} />
      <View flex={1} w={"100%"} alignItems="center">
        <VStack w={"80%"} space="lg" pt={10} alignItems="center">
          <FormProvider {...formContext}>
            <HStack alignItems="center" gap={5}>
              <Heading size="sm">How was your day?</Heading>
              <TouchableOpacity
                onPress={() => {
                  setShowHelp((prevState) => !prevState);
                }}
              >
                <Ionicons
                  name={"information-circle-outline"}
                  size={20}
                  color={"#10b981"}
                />
              </TouchableOpacity>
            </HStack>
            <Slider
              minValue={0}
              maxValue={10}
              step={1}
              sliderTrackHeight={5}
              size="md"
              value={sliderValue}
              onChange={(value) => {
                handleChange(value);
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
                <Ionicons
                  name={sliderValue < 5 ? "sad-outline" : "happy-outline"}
                  size={20}
                  color={"white"}
                />
              </SliderThumb>
            </Slider>
            <HStack w={"100%"} justifyContent="space-between">
              <Text>Stressful</Text>
              <VStack justifyContent="center" alignItems="center">
                <Text bold>{sliderValue}</Text>
                <Text bold>{stressLevel[sliderValue]}</Text>
              </VStack>
              <Text>Peaceful</Text>
            </HStack>
            <Text size="sm">Slide the knob to select the level of stress</Text>
            <FormTextArea
              name="note"
              label="Write a note"
              placeholder="Today i was in stress beacause of important meeting with my boss..."
              helperText="This note will help you to understand your stress level on subsequent reading"
            />
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              <ButtonText>Enlist </ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
          </FormProvider>
        </VStack>
        <Image
          w={200}
          h={200}
          mt={20}
          source={require("../../../assets/images/stress.png")}
          resizeMode="contain"
          alt="about"
        />
      </View>
    </DrawerScreenWrapper>
  );
};

export default ReliefScreen;

const styles = StyleSheet.create({});
