import React, { FC } from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { PlannedMealType } from "context/appContext";
import MealSetupListItem from "components/custom/MealSetupListItem/MealSetupListItem";
import { AddIcon } from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

type Props = {
  plannedMeals: PlannedMealType[];
  onSelectMeal: (plannedMeal: PlannedMealType) => void;
  onAddMeal: () => void;
};

export const MealPlan: FC<Props> = ({
  plannedMeals,
  onAddMeal,
  onSelectMeal,
}) => {
  const { t } = useTranslation();

  return (
    <VStack
      w={"100%"}
      mt={10}
      gap={4}
      backgroundColor="#efefef"
      padding={6}
      borderRadius={8}
    >
      {plannedMeals.map((plannedMeal: PlannedMealType, i) => (
        <MealSetupListItem
          key={i}
          mealName={plannedMeal.mealName!}
          mealTime={
            plannedMeal.startTime?.getHours() +
            ":" +
            (plannedMeal.startTime?.getMinutes() === 0
              ? "00"
              : plannedMeal.startTime?.getMinutes()) +
            " - " +
            (plannedMeal.endTime?.getHours() +
              ":" +
              (plannedMeal.endTime?.getMinutes() === 0
                ? "00"
                : plannedMeal.endTime?.getMinutes()))
          }
          mealSize={plannedMeal.mealSize!}
          onPress={() => {
            onSelectMeal(plannedMeal);
          }}
        />
      ))}
      <HStack w={"100%"} alignItems="center" justifyContent="center">
        <Button w={"30%"} size="sm" onPress={onAddMeal}>
          <ButtonText>{t("onboarding.step3.action.add")}</ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      </HStack>
    </VStack>
  );
};
