import React, { FC } from "react";
import {
  Box,
  CheckCircleIcon,
  CloseCircleIcon,
  HStack,
  Heading,
  Icon,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useApp } from "context/appContext";
import { useTranslation } from "react-i18next";

type Props = {
  loading: boolean;
  recordedMealsCount: number;
};

export const MealPlannerProgressBar: FC<Props> = ({
  loading,
  recordedMealsCount,
}) => {
  const { appState } = useApp();
  const { t } = useTranslation();

  const planLength = appState.userData?.plan?.length ?? 0;

  return (
    <Box
      w={"100%"}
      h={"12%"}
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
      style={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}
    >
      {loading ? (
        <Text>{t("general.loading...")}.</Text>
      ) : (
        <VStack w={"75%"} justifyContent="center" alignItems="center">
          <Heading size="sm">{t("mealPlanner.footer.dailyProgress")}</Heading>
          <HStack justifyContent="center" alignItems="center" gap={10}>
            {recordedMealsCount < planLength && (
              <Progress
                value={
                  appState.userData && appState.userData.plan
                    ? (recordedMealsCount / appState.userData.plan.length) * 100
                    : 0
                }
                h={8}
              >
                <ProgressFilledTrack h={8} />
              </Progress>
            )}
            <Icon
              as={
                recordedMealsCount >= planLength
                  ? CheckCircleIcon
                  : CloseCircleIcon
              }
              size="xl"
              color={recordedMealsCount >= planLength ? "$primary500" : "gray"}
            />
          </HStack>
          <Text size="md">
            {recordedMealsCount} {t("mealPlanner.footer.of")}{" "}
            {appState.userData && appState.userData.plan
              ? appState.userData.plan.length
              : 0}{" "}
            {t("mealPlanner.footer.meals")}
          </Text>
        </VStack>
      )}
    </Box>
  );
};
