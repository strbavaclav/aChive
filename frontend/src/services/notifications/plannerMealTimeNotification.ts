import * as Notifications from "expo-notifications";

import { PlannedMealType } from "context/appContext";
import { t } from "i18next";

export const schedulePlannerMealTimeNotification = async (
  meal: PlannedMealType
) => {
  const mealTimestamp = meal.startTime;
  const mealTimeFormatted = new Date(parseInt(String(mealTimestamp)));

  const hour = mealTimeFormatted.getHours();
  const minutes = mealTimeFormatted.getMinutes();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `aChive`,
      body: `${t("notifications.body.plannerMealTime")} ${meal.mealName} 🥗!`,
      sound: "default",
      data: { type: "plannerMealTime" },
    },
    trigger: { hour: hour, minute: minutes, repeats: true },
  }).then(() => console.log(`Notification for ${meal.mealName} was set!`));
};
