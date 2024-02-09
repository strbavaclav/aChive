import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronsRightIcon,
  HStack,
  Link,
  LinkText,
  View,
  Text,
  Heading,
  VStack,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OAuthButton from "components/auth/OAuthButton";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Platform } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthStackParams } from "navigation/auth";
import { useSignUp } from "calls/auth/register/useSignUp";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormInput } from "components/form/FormInput";
import { useTranslation } from "react-i18next";

const image = require("../../../assets/images/register.png");

export const validationSchema = z.object({
  email: z.string().email("Incorect Email!").min(5),
  password: z.string().min(1, "Password must be filled!"),
});

type FormDataType = z.infer<typeof validationSchema>;

export const defaultValues: Partial<FormDataType> = {
  email: "",
  password: "",
};

const RegisterScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  const { signUpMutation, signUpResult } = useSignUp();

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    try {
      navigation.navigate("Onboarding");
    } catch (error) {
      console.log(error);
    }
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) =>
    console.log(errors);

  const onPress = formContext.handleSubmit(onSubmit, onError);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      alignItems="center"
      flex={1}
      pt={40}
    >
      <StatusBar style="auto" />
      <Image
        source={image}
        style={{ width: "100%", height: 300 }}
        resizeMode="contain"
      />
      <Heading>
        Sign up to <Heading color="$primary500">aChive</Heading>
      </Heading>
      <VStack
        width={"80%"}
        justifyContent="center"
        alignItems="center"
        gap={1}
        m={10}
      >
        <FormProvider {...formContext}>
          <FormInput name="email" placeholder={t("your@mail.cz")} />
          <FormInput
            name="password"
            placeholder={t("select a password")}
            secret
          />
          <FormInput
            name="password"
            placeholder={t("retype a password")}
            secret
          />
        </FormProvider>
      </VStack>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        m={10}
        onPress={onPress}
      >
        <ButtonText>Sign up </ButtonText>
        <ButtonIcon as={ChevronsRightIcon} />
      </Button>
      <OAuthButton />
      <HStack justifyContent="center" alignItems="center" mt={20}>
        <Text>Already signed up? </Text>
        <Link onPress={() => navigation.navigate("Login")}>
          <LinkText color="$primary600">Log in!</LinkText>
        </Link>
      </HStack>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
