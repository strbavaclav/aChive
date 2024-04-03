import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronsRightIcon,
  HStack,
  Link,
  LinkText,
  Text,
  Heading,
  VStack,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OAuthButton from "components/auth/OAuthButton";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { AuthStackParams } from "navigation/auth";
import i18next from "services/i18next";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useAuth } from "context/authContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "components/form/FormInput";
import { ApolloError } from "@apollo/client";

export const validationSchema = z.object({
  email: z.string().email("Incorect Email!").min(5),
  password: z.string().min(1, "Password must be filled!"),
});

type FormDataType = z.infer<typeof validationSchema>;

const develop = true;

export const defaultValues: Partial<FormDataType> = {
  email: develop ? "test@test.cz" : "",
  password: develop ? "Abeceda123" : "",
};

const LoginScreen = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { onSignIn } = useAuth();

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    setIsLoading(true);
    try {
      await onSignIn!(values.email, values.password);
    } catch (error) {
      const apolloError = error as ApolloError;

      if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
        const gqlError = apolloError.graphQLErrors[0];
        const formInput = String(gqlError.extensions?.formInput) as
          | "email"
          | "password";
        const message = String(gqlError.extensions?.message);

        formContext.setError(formInput, { message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) =>
    console.log(errors);

  const onPress = formContext.handleSubmit(onSubmit, onError);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        alignItems="center"
        flex={1}
      >
        <StatusBar style="auto" />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <VStack
            width={"80%"}
            justifyContent="center"
            alignItems="center"
            gap={1}
            m={10}
          >
            <Image
              source={require("../../../assets/images/login.png")}
              style={{ width: "100%", height: 260 }}
              resizeMode="contain"
            />
            <Heading>
              {t("sign in to")}
              <Heading color="$primary500">aChive</Heading>
            </Heading>

            <FormProvider {...formContext}>
              <FormInput name="email" placeholder={t("your@mail.cz")} />
              <FormInput name="password" placeholder={t("password")} secret />
            </FormProvider>
            <Button
              width={200}
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              m={10}
              onPress={onPress}
            >
              {isLoading ? (
                <React.Fragment>
                  <ActivityIndicator color="#fff" />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <ButtonText>{t("Sign in")}</ButtonText>
                  <ButtonIcon as={ChevronsRightIcon} />
                </React.Fragment>
              )}
            </Button>

            <OAuthButton signIn />
            <HStack justifyContent="center" alignItems="center" mt={20}>
              <Text>{t("Don't have an account?")}</Text>
              <Link onPress={() => navigation.navigate("Register")}>
                <LinkText color="$primary600">{t("Sign up")}!</LinkText>
              </Link>
            </HStack>
            <HStack gap={10} mt={10}>
              <Link>
                <LinkText
                  onPress={() => changeLanguage("en")}
                  color="$primary600"
                >
                  English
                </LinkText>
              </Link>
              <Text>|</Text>
              <Link>
                <LinkText
                  color="$primary600"
                  onPress={() => changeLanguage("cs")}
                >
                  Česky
                </LinkText>
              </Link>
            </HStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
