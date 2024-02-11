import {
  Button,
  ClockIcon,
  HStack,
  Icon,
  Text,
  View,
} from "@gluestack-ui/themed";
import React, { FC } from "react";

type Props = {
  mealName: string;
  mealTime: string;
  onLogMeal: () => void;
  buttonRef: React.MutableRefObject<null>;
};

const MealPlanCard: FC<Props> = ({
  mealName,
  mealTime,
  onLogMeal,
  buttonRef,
}) => {
  return (
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
      <HStack justifyContent="space-between" alignItems="center" m={10}>
        <Text color="#10b981">{mealName}</Text>
        <HStack alignItems="center" gap={4}>
          <Icon as={ClockIcon} size="md" />
          <Text>{mealTime}</Text>
        </HStack>
      </HStack>
      <Button
        onPress={() => onLogMeal()}
        size="xs"
        position="absolute"
        bottom={0}
        right={0}
        m={4}
        ref={buttonRef}
      >
        <Text color="white">LOG</Text>
      </Button>
    </View>
  );
};

export default MealPlanCard;
