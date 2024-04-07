import * as Notifications from "expo-notifications";
import { ShoppingListSettingsType } from "context/appContext";
import { t } from "i18next";

export const listCreationTimeNotification = async (
  shopping: ShoppingListSettingsType
) => {
  const days = shopping.prepDays;
  const timestamp = shopping.prepStartTime;
  const timeFormatted = new Date(parseInt(String(timestamp)));

  const hour = timeFormatted.getHours();
  const minute = timeFormatted.getMinutes();

  if (days) {
    for (const weekday of days) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `aChive`,
          body: `${t("notifications.body.listCreationTime")} 🗒️!`,
          sound: "default",
          data: { type: "listCreationTime" },
        },
        trigger: {
          hour,
          minute,
          weekday,
          repeats: true,
        },
      });
      console.log(`Notification for list creation was set!`);
    }
  }
};
