import * as Notifications from "expo-notifications";

export const cancelNotificationsGroup = async (type: string) => {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  for (const notification of scheduledNotifications) {
    if (notification.content.data?.type === type) {
      await Notifications.cancelScheduledNotificationAsync(
        notification.identifier
      ).then(() => console.log(`notification ${type} canceled`));
    }
  }
};
