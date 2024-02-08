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
  Box,
  FormControl,
  Input,
  InputField,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
  VStack,
  InputSlot,
  InputIcon,
  MailIcon,
  LockIcon,
  KeyboardAvoidingView,
  EyeIcon,
  EyeOffIcon,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OAuthButton from "components/auth/OAuthButton";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, SafeAreaView } from "react-native";
import { AuthStackParams } from "navigation/auth";
import i18next from "services/i18next";
import { Controller, useForm } from "react-hook-form";
import { SignInInputs } from "types/auth/SignIn";
import { useAuth } from "context/authContext";

const LoginScreen = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const { onSignIn } = useAuth();

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: SignInInputs) => {
    try {
      await onSignIn!(data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}
    >
      <StatusBar style="auto" />
      <View alignItems="center" flex={1} width={"$full"}>
        <Image
          source={require("../../../assets/images/login.png")}
          style={{ width: "100%", height: 250 }}
          resizeMode="contain"
        />
        <Heading>
          {t("sign in to")} <Heading color="$primary500">aChive</Heading>
        </Heading>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          margin={10}
        >
          <VStack
            width={"$full"}
            justifyContent="center"
            alignItems="center"
            gap={10}
            m={10}
          >
            <Box width={"$5/6"}>
              <FormControl
                size="sm"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
              >
                <Input>
                  <InputSlot width={"$1/6"} backgroundColor="$primary500">
                    <InputIcon>
                      <MailIcon size="sm" color="white" />
                    </InputIcon>
                  </InputSlot>
                  <InputSlot>
                    <Controller
                      control={control}
                      rules={{ required: true }} // Add your validation rules
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                          autoCapitalize="none"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder={t("your@mail.cz")}
                        />
                      )}
                      name="email"
                    />
                  </InputSlot>
                </Input>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    At least 6 characters are required.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </Box>
            <Box width={"$5/6"}>
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
              >
                <Input>
                  <InputSlot width={"$1/6"} backgroundColor="$primary500">
                    <InputIcon>
                      <LockIcon color="white" size="sm" />
                    </InputIcon>
                  </InputSlot>
                  <InputSlot width={"$4/6"}>
                    <Controller
                      control={control}
                      rules={{ required: true }} // Add your validation rules
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                          autoCapitalize="none"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          width={"$full"}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("password")}
                        />
                      )}
                      name="password"
                    />
                  </InputSlot>
                  <InputSlot width={"$1/6"} onPress={handleState}>
                    <InputIcon pr={10}>
                      {showPassword ? (
                        <EyeIcon color="grey" />
                      ) : (
                        <EyeOffIcon color="$grey" />
                      )}
                    </InputIcon>
                  </InputSlot>
                </Input>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    At least 6 characters are required.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </Box>
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              m={10}
              onPress={handleSubmit(handleLogin)}
            >
              <ButtonText>{t("Sign in")} </ButtonText>
              <ButtonIcon as={ChevronsRightIcon} />
            </Button>
          </VStack>
        </KeyboardAvoidingView>
        <OAuthButton />
        <HStack justifyContent="center" alignItems="center" mt={20}>
          <Text>Don't have an account? </Text>
          <Link onPress={() => navigation.navigate("Register")}>
            <LinkText color="$primary600">{t("Sign up")}!</LinkText>
          </Link>
        </HStack>
        <HStack gap={10}>
          <Link>
            <LinkText onPress={() => changeLanguage("en")} color="$primary600">
              English
            </LinkText>
          </Link>
          <Text>|</Text>
          <Link>
            <LinkText color="$primary600" onPress={() => changeLanguage("cs")}>
              Česky
            </LinkText>
          </Link>
        </HStack>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
