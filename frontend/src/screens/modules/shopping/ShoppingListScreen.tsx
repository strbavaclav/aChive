import { Platform, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import { ShoppingOnboarding } from "components/modules/shopping/ShoppingOnboarding";
import { useApp } from "context/appContext";
import { KeyboardAvoidingView } from "@gluestack-ui/themed";
import { FormInput } from "components/form/FormInput";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const validationSchema = z.object({
  newItem: z.string(),
});

type FormDataType = z.infer<typeof validationSchema>;

const ShoppingListScreen = () => {
  const [activeShoppingList, setActiveShoppingList] = useState(false);

  const { appState } = useApp();
  useEffect(() => {
    if (appState.userData?.shopping?.prepDays?.length !== 0) {
      setActiveShoppingList(true);
    }
  }, [appState.userData?.shopping?.prepDays]);

  const formContext = useForm<FormDataType>({
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const hasShopping = appState.userData?.shopping?.prepDays?.length !== 0;

  return (
    <DrawerScreenWrapper isBack screenTitle="Shopping list">
      {!activeShoppingList && <ShoppingOnboarding />}
      {/* <KeyboardAvoidingView
        position="absolute"
        flexDirection="row"
        justifyContent="space-between"
        bottom={60}
        width={"100%"}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FormProvider {...formContext}>
          <FormInput name="newItem" />
        </FormProvider>
      </KeyboardAvoidingView> */}
    </DrawerScreenWrapper>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({});
