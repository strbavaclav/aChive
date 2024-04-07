import * as Notifications from "expo-notifications";

export const logStressTimeNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `aChive`,
      body: `How do you feel today 💚?`,
      sound: "default",
      data: { type: "logStressTime" },
    },
    trigger: { hour: 18, minute: 0, repeats: true },
  }).then(() => console.log(`Notification for stress loging was set!`));
};
