import { User } from "gql/graphql";
import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AppState {
  userData?: User;
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

  const value = {
    appState,
    setAppState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
