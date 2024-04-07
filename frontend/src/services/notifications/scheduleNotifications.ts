import { cancelNotificationsGroup } from "./cancelNotifications";
import { logStressTimeNotification } from "./logStressTimeNotification";
import { UserType } from "context/appContext";
import { schedulePlannerMealTimeNotification } from "./plannerMealTimeNotification";
import { logMealTimeNotification } from "./logMealTimeNotification";
import { listCreationTimeNotification } from "./listCreationTimeNotification";
import { shoppingTimeNotification } from "./shoppingTimeNotification";

export const scheduleNotifications = async (
  type: string,
  userData: UserType
) => {
  await cancelNotificationsGroup(type);

  switch (type) {
    case "plannerMealTime":
      if (userData && userData.plan) {
        userData?.plan.forEach((meal) => {
          schedulePlannerMealTimeNotification(meal).catch(console.error);
        });
      }
      break;

    case "logMealTime":
      if (userData && userData.plan) {
        userData?.plan.forEach((meal) => {
          logMealTimeNotification(meal).catch(console.error);
        });
      }
      break;

    case "listCreationTime":
      if (userData && userData.shopping) {
        listCreationTimeNotification(userData.shopping);
      }
      break;

    case "shoppingTime":
      if (userData && userData.shopping) {
        shoppingTimeNotification(userData.shopping);
      }
      break;

    case "logStressTime":
      logStressTimeNotification();
      break;

    default:
      break;
  }
};
