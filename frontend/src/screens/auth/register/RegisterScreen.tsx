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
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
  VStack,
  FormControlLabel,
  FormControlLabelText,
  InputSlot,
  InputIcon,
  MailIcon,
  LockIcon,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OAuthButton from "components/auth/OAuthButton";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image } from "react-native";

import { AuthStackParams } from "navigation/auth";
import { useSignUp } from "calls/auth/register/useSignUp";

const image = require("../../../assets/images/register.png");

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  const { signUpMutation, signUpResult } = useSignUp();

  const handleSignUp = () => {
    try {
      // signUpMutation({
      //   variables: {
      //     authData: {
      //       email: "test@test.cz",
      //       username: "test",
      //       password: "Abeceda123",
      //     },
      //   },
      // });
      navigation.navigate("Onboarding");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        width={"$full"}
        justifyContent="center"
        alignItems="center"
        gap={10}
        m={10}
      >
        <Box width={"$3/4"}>
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
              <InputField type="text" placeholder="your@mail.com" />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </Box>
        <Box width={"$3/4"}>
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
              <InputSlot>
                <InputField type="password" placeholder="select a password" />
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
        <Box width={"$3/4"}>
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
              <InputSlot>
                <InputField type="password" placeholder="retype password" />
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
      </VStack>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        m={10}
        onPress={handleSignUp}
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
    </View>
  );
};

export default RegisterScreen;
