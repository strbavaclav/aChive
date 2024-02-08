import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AppContextType = {
  data: { [key: string]: any } | null;
  setData: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function useAuth(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

const AppProvider = (props: { children: ReactNode }): ReactElement => {
  const [data, setData] = useState<{ [key: string]: any } | null>(null);

  return <AppContext.Provider {...props} value={{ data, setData }} />;
};

export { AppProvider, useAuth };
