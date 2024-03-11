import React, { Dispatch, FC, SetStateAction } from "react";
import DayPicker from "components/custom/DayPicker";
import {
  Button,
  ButtonIcon,
  ButtonText,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HStack,
  Heading,
  Image,
  SafeAreaView,
  View,
} from "@gluestack-ui/themed";
import { FormDateTimePicker } from "components/form/FormDateTimePicker";
import { Text } from "@gluestack-ui/themed";
import Animated, {
  FadeIn,
  FadeOut,
  FadeOutLeft,
} from "react-native-reanimated";

type FormInputKeys = {
  daySelectorKey: string;
  timeStartPickerKey: string;
  timeEndPickerKey: string;
};

type buttons = {
  next: () => void;
};

type Props = {
  imagePathKey: keyof typeof imageMap;
  formKeys: FormInputKeys;
  title?: string;
  description?: string;
  nextBtn?: boolean;
  previousBtn?: boolean;
  submitBtn?: boolean;

  onNextStep?: () => void;
  onPreviousStep?: () => void;
  onStart?: () => void;
};

const imageMap = {
  prep: require("../../../assets/images/prep.png"),
  shop: require("../../../assets/images/shopping.png"),
};

export const ShoppingOnboardingPart: FC<Props> = (props) => {
  const {
    imagePathKey,
    formKeys,
    title,
    description,
    previousBtn,
    onNextStep,
    onPreviousStep,
    onStart,
    submitBtn,
  } = props;
  const imageSource = imageMap[imagePathKey];

  return (
    <SafeAreaView flex={1} alignItems="center" justifyContent="space-between">
      <Animated.View
        entering={FadeIn}
        exiting={FadeOutLeft}
        style={{ alignItems: "center", gap: 20 }}
      >
        <Image
          source={imageSource}
          h={300}
          w={300}
          resizeMode="contain"
          alt="shopping"
        />
        <Heading>{title}</Heading>
        <Text textAlign="justify" m={24} mb={0} mt={0}>
          {description}
        </Text>
        <DayPicker name={formKeys.daySelectorKey} />
        <HStack alignItems="center" gap={20}>
          <FormDateTimePicker
            name={formKeys.timeStartPickerKey}
            mode="time"
            label="From"
          />
          <Heading top={12}>-</Heading>
          <FormDateTimePicker
            name={formKeys.timeEndPickerKey}
            mode="time"
            label="Till"
          />
        </HStack>
      </Animated.View>

      <View style={{ width: "100%" }}>
        <HStack justifyContent="center">
          {previousBtn && (
            <Button
              m={10}
              w={"30%"}
              action="secondary"
              onPress={onPreviousStep}
            >
              <ButtonIcon as={ChevronLeftIcon} />
              <ButtonText>Back</ButtonText>
            </Button>
          )}

          {submitBtn ? (
            <Button m={10} w={"30%"} onPress={onStart}>
              <ButtonText>Start</ButtonText>
              <ButtonIcon as={CheckIcon} />
            </Button>
          ) : (
            <Button m={10} w={"30%"} onPress={onNextStep}>
              <ButtonText>Next</ButtonText>
              <ButtonIcon as={ChevronRightIcon} />
            </Button>
          )}
        </HStack>
      </View>
    </SafeAreaView>
  );
};
