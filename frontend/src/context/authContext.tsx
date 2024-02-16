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

interface AuthContextProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    onboarded: boolean;
  };
  onSignUp?: (
    email: string,
    username: string,
    password: string
  ) => Promise<any>;
  onSignIn?: (email: string, password: string) => Promise<any>;
  onSignOut?: () => Promise<any>;
}

const TOKEN_KEY = "jwt";

const AuthContext = createContext<AuthContextProps>({});

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    onboarded: boolean;
  }>({ token: null, authenticated: null, onboarded: false });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({ token: token, authenticated: true, onboarded: false });
      }
    };
    loadToken();
  }, []);

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

      const token = result.data?.signUp?.token;

      await setAuthState({
        token: token!,
        authenticated: true,
        onboarded: false,
      });

      await SecureStore.setItemAsync(TOKEN_KEY, String(token));
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await client.mutate({
        mutation: SIGN_IN_MUTATION,
        variables: { authData: { email, password } },
      });

      const token = result.data?.signIn?.token;
      const onboarded = true;

      await setAuthState({
        token: token!,
        authenticated: true,
        onboarded,
      });

      await SecureStore.setItemAsync(TOKEN_KEY, String(token));
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    setAuthState({ token: null, authenticated: false, onboarded: false });
  };

  const value = {
    onSignUp: signUp,
    onSignIn: signIn,
    onSignOut: signOut,
    authState,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
