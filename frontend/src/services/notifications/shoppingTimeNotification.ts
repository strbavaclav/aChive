import * as Notifications from "expo-notifications";
import { ShoppingListSettingsType } from "context/appContext";
import { t } from "i18next";

export const shoppingTimeNotification = async (
  shopping: ShoppingListSettingsType
) => {
  const days = shopping.shopDays;
  const timestamp = shopping.shopStartTime;
  const timeFormatted = new Date(parseInt(String(timestamp)));

  const hour = timeFormatted.getHours();
  const minute = timeFormatted.getMinutes();

  if (days) {
    for (const weekday of days) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `aChive`,
          body: `${t("notifications.body.shoppingTime")} 🛒!`,
          sound: "default",
          data: { type: "shoppingTime" },
        },
        trigger: {
          hour,
          minute,
          weekday,
          repeats: true,
        },
      }).then(() => console.log(`Notification for shopping was set!`));
    }
  }
};
