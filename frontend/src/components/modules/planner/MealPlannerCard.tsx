import {
  CheckIcon,
  ChevronsUpDownIcon,
  ClockIcon,
  CloseIcon,
  HStack,
  Icon,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlannerStackParams } from "navigation/planner";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  mealId: string;
  mealName: string;
  mealTime: string;
  mealSize: string;
  logged?: boolean;
  selectedDate: string;

  onPress?: () => void;
};

export const MealPlannerCard: FC<Props> = ({
  mealId,
  mealName,
  mealTime,
  mealSize,
  logged,
  selectedDate,

  onPress,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PlannerStackParams>>();

  return (
    <TouchableOpacity
      // onPress={() =>
      //   navigation.navigate("MealPlannerDetail", {
      //     mealId,
      //     selectedDate: selectedDate,
      //   })
      // }
      onPress={onPress}
    >
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
          <Text bold color="#10b981">
            {mealName}
          </Text>

          <HStack alignItems="center" gap={4}>
            <Icon as={ClockIcon} size="xs" />
            <Text size="xs">{mealTime}</Text>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between" m={10}>
          <HStack alignItems="center">
            <Icon as={ChevronsUpDownIcon} size="sm" />
            <Text size="xs">SIZE {mealSize}</Text>
          </HStack>
          {logged ? (
            <Icon as={CheckIcon} size="xl" color="#10b981" />
          ) : (
            <Icon as={CloseIcon} size="xl" color="gray" />
            // <Button
            //   onPress={() => onLogMeal()}
            //   size="xs"
            //   position="absolute"
            //   bottom={0}
            //   right={0}
            //   m={4}
            //   ref={buttonRef}
            // >
            //   <Text color="white">LOG</Text>
            // </Button>
          )}
        </HStack>
      </View>
    </TouchableOpacity>
  );
};
