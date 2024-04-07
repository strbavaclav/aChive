import React, { useEffect } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import {
  Heading,
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
import { cancelNotificationsGroup } from "services/notifications/cancelNotifications";
import { scheduleNotifications } from "services/notifications/scheduleNotifications";

export const validationSchema = z.object({
  language: z.string(),
  schema: z.string(),
  "notifications.plannerMealTime": z.boolean(),
  "notifications.logMealTime": z.boolean(),
  "notifications.listCreationTime": z.boolean(),
  "notifications.shoppingTime": z.boolean(),
  "notifications.logStressTime": z.boolean(),
});

type FormDataType = z.infer<typeof validationSchema>;

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { appState } = useApp();
  const { updateUserDataMutation } = useUpdateUserData();

  const language = appState.userData?.language;
  const plannerMealTime = appState.userData?.notifications?.plannerMealTime;
  const logMealTime = appState.userData?.notifications?.logMealTime;
  const listCreationTime = appState.userData?.notifications?.listCreationTime;
  const shoppingTime = appState.userData?.notifications?.shoppingTime;
  const logStressTime = appState.userData?.notifications?.logStressTime;

  const defaultValues: Partial<FormDataType> = {
    language: language ?? "en",
    schema: "Light",
    "notifications.plannerMealTime": plannerMealTime ?? true,
    "notifications.logMealTime": logMealTime ?? true,
    "notifications.listCreationTime": listCreationTime ?? true,
    "notifications.shoppingTime": shoppingTime ?? true,
    "notifications.logStressTime": logStressTime ?? true,
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const { watch } = formContext;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "language") {
        changeLanguage(formContext.watch(name));
      }
      if (typeof name === "undefined") return;

      if (typeof value !== "undefined") {
        const payloadBoolean = name.includes("notifications");

        const datValue = formContext.watch(name);
        const payload = {
          variables: {
            newUserData: {
              name,
              ...(payloadBoolean
                ? { booleanValue: datValue as unknown as boolean }
                : { stringValue: datValue }),
            },
          },
        };

        if (payloadBoolean) {
          const notificationName = name.split(".")[1];
          const datValue = formContext.watch(name);
          if (datValue) {
            scheduleNotifications(notificationName, appState.userData!);
          } else {
            cancelNotificationsGroup(notificationName);
          }
        }

        updateUserDataMutation(payload).catch((error) => {
          console.log(error);
          toast.show({
            placement: "top",
            render: ({ id }) => (
              <Toast nativeID={`toast-${id}`} action="error" variant="accent">
                <VStack space="xs">
                  <ToastTitle>{t("settings.error.oops")}</ToastTitle>
                  <ToastDescription>
                    {t("settings.error.description")}
                  </ToastDescription>
                </VStack>
              </Toast>
            ),
          });
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, updateUserDataMutation, toast]);

  return (
    <DrawerScreenWrapper isBack screenTitle={t("navigation.appSettings")}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 40,
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
            <Heading color="$primary500" mb={6}>
              {t("settings.section.appearance")}
            </Heading>
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
              helperLabel={t("settings.text.inProgress")}
              options={[
                { value: "Light", label: t("settings.colorsTheme.light") },
                { value: "Dark", label: t("settings.colorsTheme.dark") },
              ]}
              label={t("settings.colorsTheme")}
              disabled
            />
            <Heading color="$primary500" marginVertical={6}>
              {t("settings.section.notifications")}
            </Heading>
            <FormSelect
              name="notifications.plannerMealTime"
              options={[
                { value: true, label: t("settings.value.on") },
                { value: false, label: t("settings.value.off") },
              ]}
              label={t("settings.label.plannerMealTime")}
            />
            <FormSelect
              name="notifications.logMealTime"
              options={[
                { value: true, label: t("settings.value.on") },
                { value: false, label: t("settings.value.off") },
              ]}
              label={t("settings.label.logMealTime")}
            />
            <FormSelect
              name="notifications.listCreationTime"
              options={[
                { value: true, label: t("settings.value.on") },
                { value: false, label: t("settings.value.off") },
              ]}
              label={t("settings.label.listCreationTime")}
            />
            <FormSelect
              name="notifications.shoppingTime"
              options={[
                { value: true, label: t("settings.value.on") },
                { value: false, label: t("settings.value.off") },
              ]}
              label={t("settings.label.shoppingTime")}
            />
            <FormSelect
              name="notifications.logStressTime"
              options={[
                { value: true, label: t("settings.value.on") },
                { value: false, label: t("settings.value.off") },
              ]}
              label={t("settings.label.logStressTime")}
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
