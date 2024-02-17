import { SIGN_IN_MUTATION } from "calls/auth/login/useSignIn";
import { SIGN_UP_MUTATION } from "calls/auth/register/useSignUp";
import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

import { client } from "gql/client";
import { useApp } from "./appContext";
import { GET_USER_DATA_QUERY } from "calls/user/useGetUserData";
import { User } from "gql/graphql";

interface AuthState {
  token?: string | null;
  authenticated: boolean;
  onboarded?: boolean;
}

interface AuthContextProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  onSignUp: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: false,
    onboarded: false,
  });
  const { setAppState } = useApp();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await SecureStore.getItemAsync("jwt");
      if (token) {
        try {
          const { data } = await client.query({ query: GET_USER_DATA_QUERY });
          setAppState((prevState) => ({
            ...prevState,
            userData: { ...data.getUserData, password: "", token: "" },
          }));
          setAuthState({
            token,
            authenticated: true,
            onboarded: data.getUserData.onboarded,
          });
        } catch (error) {
          console.error(error);
          await SecureStore.deleteItemAsync("jwt");
          setAuthState({ token: null, authenticated: false, onboarded: false });
        }
      }
    };

    initializeAuth();
  }, [setAppState]);

  const signUp = async (
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      const result = await client.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: { authData: { email, password, passwordConfirm } },
      });

      const newUser = result.data?.signUp;

      if (newUser) {
        await setAuthState({
          token: newUser?.token,
          authenticated: true,
          onboarded: newUser?.onboarded,
        });

        await SecureStore.setItemAsync("jwt", String(newUser?.token));
      }
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await client.mutate({
        mutation: SIGN_IN_MUTATION,
        variables: { authData: { email, password } },
      });

      const token = result.data?.signIn?.token;
      const onboarded = result.data?.signIn.onboarded;

      await setAppState!((prevState) => ({
        ...prevState!,
        userData: result.data?.signIn as User,
      }));

      await setAuthState({
        token: token!,
        authenticated: true,
        onboarded: onboarded,
      });

      await SecureStore.setItemAsync("jwt", String(token));
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("jwt");

    setAuthState({ token: null, authenticated: false, onboarded: false });
  };

  const value = {
    authState,
    setAuthState,
    onSignUp: signUp,
    onSignIn: signIn,
    onSignOut: signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
