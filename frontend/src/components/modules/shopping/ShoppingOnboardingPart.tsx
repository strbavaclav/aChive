import React, { FC } from "react";
import DayPicker from "components/custom/DayPicker";
import {
  Button,
  ButtonIcon,
  ButtonText,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  EditIcon,
  HStack,
  Heading,
  Image,
  SafeAreaView,
  View,
} from "@gluestack-ui/themed";
import { FormDateTimePicker } from "components/form/FormDateTimePicker";
import { Text } from "@gluestack-ui/themed";
import Animated, { FadeIn, FadeOutLeft } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainDrawerParams } from "navigation/main";
import { useNavigation } from "@react-navigation/native";

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
  cancelBtn?: boolean;
  changeHeading?: boolean;

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
    changeHeading,
    cancelBtn,
  } = props;
  const { t } = useTranslation();
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();

  const imageSource = imageMap[imagePathKey];

  return (
    <SafeAreaView flex={1} alignItems="center" justifyContent="space-between">
      <Animated.View
        entering={FadeIn}
        exiting={FadeOutLeft}
        style={{ alignItems: "center", gap: 20 }}
      >
        {changeHeading && (
          <Heading>
            {t("mealPlanner.change.title1")}
            <Heading color="$primary500">
              {t("mealPlanner.change.title2")}
            </Heading>
          </Heading>
        )}

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
          {cancelBtn && (
            <Button
              m={10}
              w={"30%"}
              action="secondary"
              onPress={() => navigation.goBack()}
            >
              <ButtonIcon as={CloseIcon} />
              <ButtonText>{t("general.cancel")}</ButtonText>
            </Button>
          )}
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
              <ButtonText>{changeHeading ? "Save" : "Start"}</ButtonText>
              <ButtonIcon as={changeHeading ? EditIcon : CheckIcon} ml={4} />
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
