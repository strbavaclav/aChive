import {
  Badge,
  BadgeIcon,
  BadgeText,
  Button,
  CheckIcon,
  ChevronsUpDownIcon,
  ClockIcon,
  CloseIcon,
  GlobeIcon,
  HStack,
  Icon,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlannerStackParams } from "navigation/planner";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  mealName: string;
  mealTime: string;
  mealSize: string;
  logged?: boolean;
  onLogMeal: () => void;
  buttonRef: React.MutableRefObject<null>;
};

const MealPlanCard: FC<Props> = ({
  mealName,
  mealTime,
  mealSize,
  logged,
  onLogMeal,
  buttonRef,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PlannerStackParams>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("MealPlannerDetail")}>
      <View
        flex={1}
        h={110}
        backgroundColor="white"
        m={2}
        borderRadius={8}
        style={{
          shadowColor: "black",
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
      >
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={10}
          ml={10}
        >
          <Text color="#10b981">{mealName}</Text>

          <HStack alignItems="center" gap={4}>
            <Icon as={ClockIcon} size="xs" />
            <Text size="xs">{mealTime}</Text>
          </HStack>
        </HStack>
        <Badge ml={10} action="muted" borderRadius="$md" size="md" w={"20%"}>
          <BadgeIcon as={ChevronsUpDownIcon} />
          <BadgeText>SIZE {mealSize}</BadgeText>
        </Badge>
        {logged ? (
          <Icon
            as={CheckIcon}
            size="xl"
            color="#10b981"
            position="absolute"
            bottom={5}
            right={5}
          />
        ) : (
          <Icon
            as={CloseIcon}
            size="xl"
            // color="#10b981"
            position="absolute"
            bottom={5}
            right={5}
          />
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
      </View>
    </TouchableOpacity>
  );
};

export default MealPlanCard;
