import React, { useEffect } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import {
  Image,
  ScrollView,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { FormSelect } from "components/form/FormSelect";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useApp } from "context/appContext";
import { useUpdateUserData } from "calls/user/useUpdateUserData";
import { changeLanguage } from "utils/changeLanguage";

export const validationSchema = z.object({
  language: z.string(),
  schema: z.string(),
});

type FormDataType = z.infer<typeof validationSchema>;

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { appState } = useApp();
  const { updateUserDataMutation } = useUpdateUserData();

  const language = appState.userData?.language;

  const defaultValues: Partial<FormDataType> = {
    language: language ? language : "en",
    schema: "Light",
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const selectedLanguage = formContext.watch("language");

  useEffect(() => {
    const updateLanguage = async () => {
      changeLanguage(selectedLanguage);
      try {
        await updateUserDataMutation({
          variables: {
            newUserData: {
              name: "language",
              stringValue: selectedLanguage,
            },
          },
        });
      } catch (error) {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id;
            return (
              <Toast nativeID={toastId} action="error" variant="accent">
                <VStack space="xs">
                  <ToastTitle>Oops... Something went wrong!</ToastTitle>
                  <ToastDescription>
                    Yout language change couldn't be saved.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    };

    updateLanguage();
  }, [selectedLanguage]);

  return (
    <DrawerScreenWrapper isBack screenTitle={t("navigation.appSettings")}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          w={250}
          h={250}
          source={require("../../../assets/images/settings.png")}
          resizeMode="contain"
          alt="about"
          marginVertical={20}
        />
        <VStack w={"90%"}>
          <FormProvider {...formContext}>
            <FormSelect
              name="language"
              options={[
                { value: "en", label: "English" },
                { value: "cs", label: "Čeština" },
              ]}
              label={t("settings.applicationLanguage")}
            />

            <FormSelect
              name="schema"
              options={[
                { value: "Light", label: t("settings.colorsTheme.light") },
                { value: "Dark", label: t("settings.colorsTheme.dark") },
              ]}
              label={t("settings.colorsTheme")}
              disabled
            />
          </FormProvider>
        </VStack>
        <Text m={20} textAlign="center">
          {t("settings.notMuch")}
        </Text>
      </ScrollView>
    </DrawerScreenWrapper>
  );
};
