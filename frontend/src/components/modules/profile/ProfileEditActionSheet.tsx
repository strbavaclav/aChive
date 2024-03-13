import React, { FC, useEffect, useState } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  ButtonIcon,
  ButtonText,
  CloseIcon,
  EditIcon,
  HStack,
  Heading,
  KeyboardAvoidingView,
  Spinner,
  View,
} from "@gluestack-ui/themed";
import { EditedDataType } from "screens/core/profile/ProfileScreen";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "components/form/FormInput";
import { FormDateTimePicker } from "components/form/FormDateTimePicker";
import { FormSelect } from "components/form/FormSelect";
import { Platform } from "react-native";
import { FormRulerPicker } from "components/form/FormRulerPicker";
import { useUpdateUserData } from "calls/user/useUpdateUserData";

export const validationSchema = z.object({
  string: z.string().optional(),
  date: z.date(),
  number: z.number(),
  select: z.string(),
});

type FormDataType = z.infer<typeof validationSchema>;

type Props = {
  editedData?: EditedDataType;

  onClose: () => void;
  onRefresh: () => void;
};

export const ProfileEditActionSheet: FC<Props> = ({
  editedData,
  onClose,
  onRefresh,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserDataMutation } = useUpdateUserData();

  const getInitialValues = () => {
    return {
      string:
        editedData?.formType === "string" ? String(editedData.initialData) : "",
      select:
        editedData?.formType === "select" ? String(editedData.initialData) : "",
      number:
        editedData?.formType === "number" ? Number(editedData.initialData) : 0,
      date:
        editedData?.formType === "date"
          ? new Date(editedData.initialData as string)
          : new Date(),
    };
  };

  const formContext = useForm<FormDataType>({
    defaultValues: getInitialValues(),

    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    formContext.reset(getInitialValues());
  }, [editedData, formContext]);

  const onSaveHandler = async () => {
    setIsLoading(true);

    try {
      let stringValue = null;
      let floatValue = null;

      switch (editedData?.formType) {
        case "string":
          stringValue = formContext.getValues("string");
          break;
        case "select":
          stringValue = formContext.getValues("select");
          break;
        case "number":
          floatValue = formContext.getValues("number");
          break;
        case "date":
          stringValue = formContext.getValues("date");
          break;
        default:
          floatValue = null;
          stringValue = null;
      }

      await updateUserDataMutation({
        variables: {
          newUserData: {
            name: editedData?.name!,
            stringValue: stringValue ? String(stringValue) : null,
            floatValue: floatValue ?? null,
          },
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert(`An error occurred`);
    } finally {
      setIsLoading(false);
      onRefresh();
      onClose();
      formContext.reset(getInitialValues());
    }
  };

  const renderInput = () => {
    switch (editedData?.formType) {
      case "string":
        return <FormInput name="string" />;
      case "date":
        return <FormDateTimePicker name="date" />;

      case "select":
        return (
          <View w={"80%"}>
            <FormSelect name="select" options={editedData.options!} />
          </View>
        );
      case "number":
        return (
          <View marginBottom={100}>
            <FormRulerPicker
              name="number"
              initialValue={editedData.initialData! as number}
              unit={editedData.ruler.unit!}
              label="What's your height?"
              max={editedData.ruler.max!}
              min={editedData.ruler.min!}
              step={editedData.ruler.step!}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Actionsheet isOpen={!!editedData} onClose={onClose} zIndex={999}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ zIndex: 999 }}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Heading color="#10b981" marginVertical={6}>
            Edit <Heading>{editedData?.label.toLowerCase()}</Heading>
          </Heading>

          <FormProvider {...formContext}>
            <View
              m={6}
              flex={1}
              w={"80%"}
              justifyContent="center"
              alignItems="center"
            >
              {renderInput()}
            </View>
          </FormProvider>

          <HStack flex={1} gap={6} w={"80%"}>
            <Button flex={1} action="secondary" onPress={onClose}>
              <ButtonIcon as={CloseIcon} mr={"$1"} />
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button flex={2} onPress={onSaveHandler}>
              {isLoading ? (
                <Spinner size={"small"} color="#fff" />
              ) : (
                <>
                  <ButtonText>Save changes</ButtonText>
                  <ButtonIcon as={EditIcon} ml={"$1"} />
                </>
              )}
            </Button>
          </HStack>
        </ActionsheetContent>
      </KeyboardAvoidingView>
    </Actionsheet>
  );
};
