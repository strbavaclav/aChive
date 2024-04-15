import React, { FC, useEffect, useState } from "react";
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
import { useSetShoppingListSettings } from "calls/shopping/useSetShoppingListSettings";
import { GET_USER_DATA_QUERY } from "calls/user/useGetUserData";
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

type Props = {
  onFinish: () => Promise<void>;
  change?: boolean;
};

export const ShoppingOnboarding: FC<Props> = ({ onFinish, change }) => {
  const [step, setStep] = useState(0);
  const { setShoppingListSettingsMutation } = useSetShoppingListSettings();
  const { appState, refetchUserData } = useApp();
  const [shoppingSettings, setShoppingSettings] = useState(
    appState.userData?.shopping
  );

  useEffect(() => {
    const fetchData = async () => {
      await refetchUserData();
      setShoppingSettings(appState.userData?.shopping);
      formContext.reset(defaultValues);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setShoppingSettings(appState.userData?.shopping);
    formContext.reset(defaultValues);
  }, [appState.userData?.shopping, shoppingSettings]);

  const createDateWithDefaultHours = (
    dateString: string | undefined,
    defaultHours: number,
    defaultMinutes: number = 0
  ): Date => {
    let date: Date;
    if (dateString) {
      date = new Date(dateString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        // If invalid, create a new date with default hours and minutes
        date = new Date(
          new Date().setHours(defaultHours, defaultMinutes, 0, 0)
        );
      }
    } else {
      // If dateString is undefined, create a new date with default hours and minutes
      date = new Date(new Date().setHours(defaultHours, defaultMinutes, 0, 0));
    }
    return date;
  };

  const defaultValues: Partial<FormDataType> = {
    prepDays: shoppingSettings?.prepDays ?? [],
    prepStartTime: createDateWithDefaultHours(
      shoppingSettings?.prepStartTime,
      17
    ),
    prepEndTime: createDateWithDefaultHours(shoppingSettings?.prepEndTime, 17),
    shopDays: shoppingSettings?.shopDays ?? [],
    shopStartTime: createDateWithDefaultHours(
      shoppingSettings?.shopStartTime,
      17
    ),
    shopEndTime: createDateWithDefaultHours(shoppingSettings?.shopEndTime, 18),
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  console.log("TEST", formContext.getValues("shopDays"));

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    try {
      await setShoppingListSettingsMutation({
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
      await onFinish();
      setStep(0);
      formContext.reset(defaultValues);
    } catch (error) {
      console.log(error);
    }
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
            changeHeading={change}
            cancelBtn={change}
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
            changeHeading={change}
            submitBtn
          />
        )}
      </FormProvider>
    </View>
  );
};
