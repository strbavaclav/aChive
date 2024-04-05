import { View, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import {
  Box,
  ChevronsUpDownIcon,
  ClockIcon,
  Divider,
  HStack,
  Heading,
  Icon,
  Text,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

type Props = {
  mealName: string;
  mealSize: string;
  mealTime: string;
  onPress: () => void;
};

const MealSetupListItem: FC<Props> = ({
  mealName,
  mealSize,
  mealTime,
  onPress,
}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 80,
          margin: 2,
          borderRadius: 8,
          backgroundColor: "white",
          shadowColor: "black",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          padding: 8,
          justifyContent: "center",
        }}
      >
        <HStack justifyContent="space-evenly" alignItems="center">
          <Box flex={1} alignItems="center">
            <Heading color="$primary500" size="sm" textAlign="center">
              {mealName}
            </Heading>
          </Box>
          <Divider orientation="vertical" />
          <Box flex={1} alignItems="center">
            <HStack alignItems="center">
              <Icon as={ChevronsUpDownIcon} size="xs" mr={"$1"} />
              <Text size={"xs"}>
                {t("onboarding.step3.labels.size")} {mealSize}
              </Text>
            </HStack>
          </Box>
          <Divider orientation="vertical" />
          <Box flex={1} alignItems="center">
            <HStack alignItems="center">
              <Icon as={ClockIcon} size="xs" mr={"$1"} />
              <Text size="xs">{mealTime}</Text>
            </HStack>
          </Box>
        </HStack>
      </View>
    </TouchableOpacity>
  );
};

export default MealSetupListItem;
