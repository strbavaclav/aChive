import { StyleSheet } from "react-native";
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

const ReliefScreen = () => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const handleChange = (value: number) => {
    setSliderValue(value);
  };
  return (
    <DrawerScreenWrapper isBack screenTitle="Stress relief">
      <DateSlider />
      <View flex={1} w={"100%"} alignItems="center">
        <VStack w={"80%"} space="lg" pt={10} alignItems="center">
          <Heading size="sm">How was your day?</Heading>
          <Slider
            minValue={0}
            maxValue={5}
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
              <Icon as={FavouriteIcon} color="white" size="md" />
            </SliderThumb>
          </Slider>
          <HStack w={"100%"} justifyContent="space-between">
            <Text>Stressful</Text>
            <Text bold>{sliderValue}</Text>
            <Text>Peaceful</Text>
          </HStack>
          <Text size="sm">Slide the knob to select the level of stress</Text>
          <FormTextArea
            label="Write a note"
            placeholder="Today i was in stress beacause of important meeting with my boss..."
            helperText="This note will help you to understand your stress level"
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
        </VStack>
      </View>
    </DrawerScreenWrapper>
  );
};

export default ReliefScreen;

const styles = StyleSheet.create({});
