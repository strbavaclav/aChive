import {
  Badge,
  BadgeIcon,
  BadgeText,
  ChevronsUpDownIcon,
  ClockIcon,
  HStack,
  Icon,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { PlannedMealType } from "context/appContext";
import { MealRecord } from "gql/graphql";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";

import moment from "moment";
import { formatTime } from "utils/formatTime";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type Props = {
  logged?: boolean;
  selectedDate: string;
  recordedMeal?: MealRecord | null;
  plannedMeal?: PlannedMealType;

  onPress?: () => void;
};

type DatRangeProps = {
  plannedMeal?: PlannedMealType;
  recordedMeal?: MealRecord | null;
};

const DateRange: FC<DatRangeProps> = ({ plannedMeal, recordedMeal }) => {
  const plannedStartShow = formatTime(plannedMeal?.startTime!);
  const plannedEndShow = formatTime(plannedMeal?.endTime!);

  const plannedStart = moment(parseInt(String(plannedMeal?.startTime)));
  const plannedEnd = moment(parseInt(String(plannedMeal?.endTime)));

  const recordedTime = moment(recordedMeal?.loggedDateTime);

  const recordedTimeOnly = moment(recordedTime.format("HH:mm:ss"), "HH:mm:ss");

  const today = moment().startOf("day");
  const plannedStartOnly = today
    .clone()
    .add(plannedStart.hour(), "hours")
    .add(plannedStart.minute(), "minutes")
    .add(plannedStart.second(), "seconds");
  const plannedEndOnly = today
    .clone()
    .add(plannedEnd.hour(), "hours")
    .add(plannedEnd.minute(), "minutes")
    .add(plannedEnd.second(), "seconds");

  const isWithinRange = recordedTimeOnly.isBetween(
    plannedStartOnly,
    plannedEndOnly,
    undefined,
    "[]"
  );

  return (
    <VStack alignItems="flex-end">
      <HStack alignItems="center" gap={4}>
        {plannedMeal && (
          <>
            <Icon as={ClockIcon} size="xs" />
            <Text
              size="xs"
              textDecorationLine={
                recordedMeal && !isWithinRange ? "line-through" : undefined
              }
              color={
                recordedMeal && isWithinRange
                  ? "$primary500"
                  : recordedMeal && !isWithinRange
                    ? "#cc0000"
                    : "gray"
              }
            >
              {plannedStartShow} - {plannedEndShow}
            </Text>
          </>
        )}
      </HStack>
      <HStack alignItems="center" gap={4}>
        {!plannedMeal && <Icon as={ClockIcon} size="xs" />}

        {recordedMeal && (
          <Text size="xs">{`${recordedTimeOnly.format("HH:mm")}`}</Text>
        )}
      </HStack>
    </VStack>
  );
};

export const MealPlannerCard: FC<Props> = ({
  logged,
  plannedMeal,
  recordedMeal,

  onPress,
}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        flex={1}
        h={110}
        backgroundColor="white"
        m={2}
        borderRadius={8}
        justifyContent="space-between"
        style={{
          shadowColor: "black",
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
      >
        <HStack justifyContent="space-between" alignItems="center" m={10}>
          <Text bold color="$primary500">
            {plannedMeal?.mealName ?? recordedMeal?.extraMealName ?? ""}
          </Text>

          <DateRange plannedMeal={plannedMeal} recordedMeal={recordedMeal} />
        </HStack>
        <HStack justifyContent="space-between" m={10}>
          <Badge
            size="md"
            variant="solid"
            borderRadius={"$sm"}
            action={
              recordedMeal && recordedMeal.size !== plannedMeal?.mealSize
                ? "error"
                : recordedMeal?.size === plannedMeal?.mealSize
                  ? "success"
                  : "muted"
            }
          >
            <BadgeIcon as={ChevronsUpDownIcon} mr={"$1"} />
            <BadgeText
              size="xs"
              color={
                recordedMeal && recordedMeal.size !== plannedMeal?.mealSize
                  ? "#cc0000"
                  : recordedMeal?.size === plannedMeal?.mealSize
                    ? "$primary500"
                    : "grey"
              }
            >
              {t("general.size")}{" "}
              {recordedMeal &&
              plannedMeal &&
              recordedMeal.size !== plannedMeal?.mealSize
                ? `${plannedMeal?.mealSize} -> ${recordedMeal.size}`
                : !plannedMeal
                  ? recordedMeal?.size
                  : plannedMeal?.mealSize}
            </BadgeText>
          </Badge>

          {logged ? (
            <Ionicons
              name={"checkmark-circle-outline"}
              size={24}
              color={"#10b981"}
            />
          ) : (
            <Ionicons name={"close-circle-outline"} size={24} color={"gray"} />
          )}
        </HStack>
      </View>
    </TouchableOpacity>
  );
};
