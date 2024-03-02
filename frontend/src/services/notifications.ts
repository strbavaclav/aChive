import { PlannedMealType } from "context/appContext";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export const scheduleMealNotification = async (meal: PlannedMealType) => {
  //TODO: opravit
  const mealTimestamp = meal.startTime;
  const mealTimeFormatted = new Date(parseInt(String(mealTimestamp)));

  console.log(`Notification for ${meal.mealName} was set!`);

  const hour = mealTimeFormatted.getHours();
  const minutes = mealTimeFormatted.getMinutes();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `aChive`,
      body: `Time for ${meal.mealName} 🥗!`,
      sound: "default",
    },
    trigger: { hour: hour, minute: minutes, repeats: true },
  });
};

export const scheduleDailyStressRecord = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `aChive`,
      body: `How do you feel today 💚?`,
      sound: "default",
    },
    trigger: { hour: 15, minute: 0, repeats: true },
  });
};
