import React, { useState } from "react";
import { z } from "zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "@gluestack-ui/themed";
import { ShoppingOnboardingPart } from "./ShoppingOnboardingPart";
import moment from "moment";
import { useSetShoppingListSettings } from "calls/shopping/useSetShoppingListSettings";
import { useApp } from "context/appContext";

export const validationSchema = z.object({
  prepDays: z.array(z.number()),
  prepStartTime: z.date(),
  prepEndTime: z.date(),

  shopDays: z.array(z.number()),
  shopStartTime: z.date(),
  shopEndTime: z.date(),
});

type FormDataType = z.infer<typeof validationSchema>;

export const ShoppingOnboarding = () => {
  const [step, setStep] = useState(0);
  const { setShoppingListSettingsMutation } = useSetShoppingListSettings();

  const { appState, refetchUserData } = useApp();

  const defaultValues: Partial<FormDataType> = {
    prepDays: [],
    prepStartTime: new Date(new Date().setHours(16, 30, 0, 0)),
    prepEndTime: new Date(new Date().setHours(17, 0, 0, 0)),

    shopDays: [],
    shopStartTime: new Date(new Date().setHours(17, 0, 0, 0)),
    shopEndTime: new Date(new Date().setHours(18, 0, 0, 0)),
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    const response = await setShoppingListSettingsMutation({
      variables: {
        shopListSettings: {
          prepDays: values.prepDays,
          prepStartTime: values.prepStartTime.toISOString(),
          prepEndTime: values.prepEndTime.toISOString(),
          shopDays: values.shopDays,
          shopStartTime: values.shopStartTime.toISOString(),
          shopEndTime: values.shopEndTime.toISOString(),
        },
      },
    });
    console.log("R", response.data?.setShoppingListSettings);
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) =>
    console.log(errors);

  const onStart = formContext.handleSubmit(onSubmit, onError);

  return (
    <View flex={1}>
      <FormProvider {...formContext}>
        {step === 0 && (
          <ShoppingOnboardingPart
            imagePathKey="prep"
            formKeys={{
              daySelectorKey: "prepDays",
              timeStartPickerKey: "prepStartTime",
              timeEndPickerKey: "prepEndTime",
            }}
            title="Let's get started!"
            description="Eating healthy is all about being ready with your meals on time. Make sure you keep an eye on what food you've got at home. Pick times during your week when you're free to write down a shopping list."
            onNextStep={() => setStep(1)}
          />
        )}

        {step === 1 && (
          <ShoppingOnboardingPart
            imagePathKey="shop"
            formKeys={{
              daySelectorKey: "shopDays",
              timeStartPickerKey: "shopStartTime",
              timeEndPickerKey: "shopEndTime",
            }}
            title="Shopping time!"
            description="Time ti shop is also very important. Set up a reminder to nudge you when it's time to hit the store."
            previousBtn
            onNextStep={() => setStep(1)}
            onPreviousStep={() => setStep(0)}
            onStart={onStart}
            submitBtn
          />
        )}
      </FormProvider>
    </View>
  );
};
