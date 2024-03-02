import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { scheduleMealNotification } from "services/notifications";
import * as Notifications from "expo-notifications";

type OnboardDataType = {
  body?: { height?: number; weight?: number };
  bornDate?: Date;
  eatHabitGoal?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  plan?: PlannedMealType[];
  username?: string;
  stressRecordValue?: number;
  stressRecordNote?: string;
};

export type UserType = {
  _id?: string;
  body?: BodyInfoType;
  bornDate?: string;
  eatHabitGoal?: string;
  email: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  plan?: PlannedMealType[];
  username?: string;
};

export type PlannedMealType = {
  _id?: string;
  mealName?: string;
  mealSize?: string;
  startTime?: Date;
  endTime?: Date;
};

type BodyInfoType = {
  height?: number;
  weight?: number;
};

interface AppState {
  userData?: UserType;
  onboardData?: OnboardDataType;
}

interface AppContextProps {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useApp = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [appState, setAppState] = useState<AppState>({});

  useEffect(() => {
    Notifications.cancelAllScheduledNotificationsAsync();

    console.log("App state changed and notifications cleared: []");
    appState.userData &&
      appState.userData?.plan &&
      appState?.userData?.plan.forEach((meal) => {
        scheduleMealNotification(meal).catch(console.error);
      });
  }, [appState]);

  const value = {
    appState,
    setAppState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
