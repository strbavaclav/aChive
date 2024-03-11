import React, { useEffect } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import { Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { FormSelect } from "components/form/FormSelect";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useApp } from "context/appContext";

export const validationSchema = z.object({
  language: z.string(),
  schema: z.string(),
});

type FormDataType = z.infer<typeof validationSchema>;
export const SettingsScreen = () => {
  const { t } = useTranslation();
  const { appState } = useApp();

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

  console.log(appState.userData);

  const selectedLanguage = formContext.watch("language");

  useEffect(() => {
    changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  return (
    <DrawerScreenWrapper isBack screenTitle={t("navigation.appSettings")}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          w={200}
          h={200}
          source={require("../../../assets/images/settings.png")}
          resizeMode="contain"
          alt="about"
        />
        <VStack w={"90%"}>
          <FormProvider {...formContext}>
            <FormSelect
              name="language"
              options={[
                { value: "en", label: "English" },
                { value: "cs", label: "Čeština" },
              ]} // Update this line if necessary
              label={t("settings.applicationLanguage")}
            />

            <FormSelect
              name="schema"
              options={[
                { value: "Light", label: "Light" },
                { value: "Dark", label: "Dark" },
              ]} // Update this line if necessary
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
