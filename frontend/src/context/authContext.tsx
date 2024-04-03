import { SIGN_IN_MUTATION } from "calls/auth/login/useSignIn";
import { SIGN_UP_MUTATION } from "calls/auth/register/useSignUp";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

import { client } from "gql/client";
import { useApp, UserType } from "./appContext";
import { GET_USER_DATA_QUERY } from "calls/user/useGetUserData";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import i18next from "i18next";
import { APPLE_SIGN_UP_MUTATION } from "calls/auth/register/useAppleSignUp";

interface AuthState {
  token?: string | null;
  authenticated: boolean;
  onboarded?: boolean;
  tokenLoading?: boolean;
}

interface AuthContextProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  onSignUp: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  onAppleSignUp: (token: string) => Promise<void>;
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
    tokenLoading: true,
  });
  const { setAppState } = useApp();
  const toast = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await SecureStore.getItemAsync("jwt");

      if (token) {
        setAuthState((prevState) => ({
          ...prevState,
          tokenLoading: true,
        }));
        try {
          const response = await client.query({ query: GET_USER_DATA_QUERY });
          const { data } = response;
          setAppState((prevState) => ({
            ...prevState,
            userData: { ...(data.getUserData as UserType) },
          }));
          setAuthState({
            token,
            authenticated: true,
            onboarded: data?.getUserData?.onboarded,
            tokenLoading: false,
          });
          i18next.changeLanguage(response.data.getUserData?.language);
        } catch (error) {
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Toast nativeID={toastId} action="error" variant="accent">
                  <VStack space="xs">
                    <ToastTitle>Oops... Your session expired!</ToastTitle>
                    <ToastDescription>
                      Please sign in to get back to your progress.
                    </ToastDescription>
                  </VStack>
                </Toast>
              );
            },
          });
          console.log(error);
          await SecureStore.deleteItemAsync("jwt");
          setAuthState({
            token: null,
            authenticated: false,
            onboarded: false,
            tokenLoading: false,
          });
        }
      } else {
        setAuthState({
          token: null,
          authenticated: false,
          onboarded: false,
          tokenLoading: false,
        });
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

        setAppState((prevState) => ({
          ...prevState,
          userData: { ...prevState.userData, email },
        }));

        await SecureStore.setItemAsync("jwt", String(newUser?.token));
      }
    } catch (error) {
      throw error;
    }
  };

  const appleSignUp = async (token: string) => {
    try {
      const result = await client.mutate({
        mutation: APPLE_SIGN_UP_MUTATION,
        variables: { token },
      });

      const newUser = result.data?.appleSignUp;

      if (newUser) {
        await setAuthState({
          token: newUser?.token,
          authenticated: true,
          onboarded: newUser?.onboarded,
        });

        setAppState((prevState) => ({
          ...prevState,
          userData: { ...prevState.userData, email: newUser.email },
        }));

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
        userData: result.data?.signIn as UserType,
      }));

      await setAuthState({
        token: token!,
        authenticated: true,
        onboarded: onboarded,
      });

      i18next.changeLanguage(result.data?.signIn.language);

      await SecureStore.setItemAsync("jwt", String(token));
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("jwt");

    setAuthState({
      token: null,
      authenticated: false,
      onboarded: false,
      tokenLoading: false,
    });
  };

  const value = {
    authState,
    setAuthState,
    onSignUp: signUp,
    onAppleSignUp: appleSignUp,
    onSignIn: signIn,
    onSignOut: signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
