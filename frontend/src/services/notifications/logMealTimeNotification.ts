import * as Notifications from "expo-notifications";

import { PlannedMealType } from "context/appContext";
import { t } from "i18next";

export const logMealTimeNotification = async (meal: PlannedMealType) => {
  const mealTimestamp = meal.endTime;
  const mealTimeFormatted = new Date(parseInt(String(mealTimestamp)));

  const hour = mealTimeFormatted.getHours();
  const minutes = mealTimeFormatted.getMinutes();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `aChive`,
      body: `${t("notifications.body.logMealTime")} ${meal.mealName} 👀!`,
      sound: "default",
      data: { type: "logMealTime" },
    },
    trigger: { hour: hour, minute: minutes, repeats: true },
  }).then(() =>
    console.log(`Notification for logging ${meal.mealName} was set!`)
  );
};
