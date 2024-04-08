import * as Notifications from "expo-notifications";
import { t } from "i18next";

export const logStressTimeNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `aChive`,
      body: `${t("notifications.body.logStressTime")} 💚?`,
      sound: "default",
      data: { type: "logStressTime" },
    },
    trigger: { hour: 18, minute: 0, repeats: true },
  }).then(() => console.log(`Notification for stress loging was set!`));
};
