import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  CheckIcon,
  ChevronsUpDownIcon,
  ClockIcon,
  CloseIcon,
  EditIcon,
  HStack,
  Heading,
  Icon,
  KeyboardAvoidingView,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
  TrashIcon,
  VStack,
  View,
  ModalContent,
} from "@gluestack-ui/themed";
import { PlannedMealType, useApp } from "context/appContext";
import { MealRecord } from "gql/graphql";

import { z } from "zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "components/form/FormSelect";
import { FormTextArea } from "components/form/FormTextArea";
import { useAddMealRecord } from "calls/planner/useAddMealRecord";
import { FormSwitch } from "components/form/FormSwitch";
import { FormDateTimePicker } from "components/form/FormDateTimePicker";
import { Alert, Platform } from "react-native";
import { useRemoveMealRecordById } from "calls/planner/useRemoveMealRecordById";
import moment from "moment";
import { useUpdateMealRecordById } from "calls/planner/useUpdateMealRecordById";
import { FormInput } from "components/form";
import { useTranslation } from "react-i18next";

export const validationSchema = z.object({
  loggedTime: z.date(),
  cooked: z.boolean(),
  size: z.string().min(1, "Meal size has to be selected!"),
  description: z.string().optional(),
  extraMealName: z.string(),
});

type FormDataType = z.infer<typeof validationSchema>;

type Props = {
  show: boolean;
  plannedMeal?: PlannedMealType;
  recordedMeal?: MealRecord | null;
  selectedDay: string;

  setShow: Dispatch<SetStateAction<boolean>>;
  logMeal: () => void;
};

export const MealPlannerLogModal: FC<Props> = ({
  show,
  plannedMeal,
  recordedMeal,
  selectedDay,

  setShow,
  logMeal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const { appState } = useApp();
  const { t } = useTranslation();

  const { addMealRecordMutation } = useAddMealRecord();
  const { removeMealRecordByIdMutation } = useRemoveMealRecordById();
  const { updateMealRecordByIdMutation } = useUpdateMealRecordById();

  const formContext = useForm<FormDataType>({
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    const defaultValues: Partial<FormDataType> = {
      size: recordedMeal ? recordedMeal.size : "",
      description: recordedMeal ? String(recordedMeal.description) : "",
      cooked: recordedMeal ? recordedMeal.cooked : false,
      loggedTime: recordedMeal
        ? new Date(recordedMeal.loggedDateTime)
        : new Date(),
      extraMealName: !recordedMeal
        ? ""
        : recordedMeal.extraMealName
          ? recordedMeal.extraMealName
          : "",
    };

    formContext.reset(defaultValues);
  }, [plannedMeal, isEdited, recordedMeal, formContext.reset]);

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    setIsLoading(true);

    const { size, description, cooked, loggedTime, extraMealName } = values;
    try {
      const selectedDate = new Date(selectedDay);

      selectedDate.setHours(loggedTime.getHours());
      selectedDate.setMinutes(loggedTime.getMinutes());

      const loggedDateTime = selectedDate.toISOString();

      const response = await addMealRecordMutation({
        variables: {
          userId: appState.userData?._id!,
          mealRecord: {
            mealId: plannedMeal?._id!,
            size,
            loggedDateTime: loggedDateTime,
            description,
            cooked,
            extraMealName: extraMealName,
          },
        },
      });
      logMeal();
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) => {
    console.log(errors);
    setIsLoading(false);
  };

  const onPress = formContext.handleSubmit(onSubmit, onError);

  const updateRecordHandler = async () => {
    setIsLoading(true);
    try {
      const values = formContext.getValues();
      const { size, description, cooked, loggedTime, extraMealName } = values;

      const selectedDate = new Date(selectedDay);

      selectedDate.setHours(loggedTime.getHours());
      selectedDate.setMinutes(loggedTime.getMinutes());

      const loggedDateTime = selectedDate.toISOString();

      await updateMealRecordByIdMutation({
        variables: {
          userId: appState.userData?._id!,
          recordId: recordedMeal?._id!,
          updatedRecord: {
            mealId: plannedMeal?._id!,
            size,
            loggedDateTime: loggedDateTime,
            description,
            cooked,
            extraMealName,
          },
        },
      });

      logMeal();
    } catch (error) {
      console.log("Failed to delete record:", error);
    }
    setIsLoading(false);
    setIsEdited(false);
  };

  const deleteRecordHandler = async () => {
    const deleteRecord = async () => {
      setIsLoading(true);

      try {
        await removeMealRecordByIdMutation({
          variables: {
            userId: appState.userData?._id!,
            recordId: recordedMeal?._id!,
          },
        });
        logMeal();
      } catch (error) {
        console.log("Failed to delete record:", error);
      }
      setIsLoading(false);
    };

    Alert.alert(
      t("mealPlanner.remove.removing"),
      t("mealPlanner.remove.description"),
      [
        {
          text: t("general.no"),
        },
        {
          text: t("general.yes"),
          onPress: deleteRecord,
        },
      ],
      { cancelable: true }
    );
  };

  const closeModalHandler = () => {
    setIsEdited(false);
    if (!isLoading) setShow(false);
  };

  return (
    <Modal isOpen={show} onClose={closeModalHandler}>
      <KeyboardAvoidingView
        w={"100%"}
        h={"100%"}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -100 : undefined}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <ModalBackdrop />
        <ModalContent>
          <FormProvider {...formContext}>
            <ModalHeader>
              {plannedMeal ? (
                <Heading size="lg" color="$primary500">
                  {plannedMeal?.mealName}
                </Heading>
              ) : isEdited || !recordedMeal ? (
                <View w={"80%"} mb={10}>
                  <FormInput
                    name="extraMealName"
                    label={t("mealPlanner.modal.extraMealName")}
                    placeholder={t("mealPlanner.modal.extraMealNamePH")}
                  />
                </View>
              ) : (
                <Heading size="lg" color="$primary500">
                  {recordedMeal?.extraMealName}
                </Heading>
              )}

              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <VStack>
                {recordedMeal && !isEdited && (
                  <>
                    <VStack mb={6}>
                      <Text mb={4} bold>
                        {t("mealPlanner.modal.mealTime")}
                      </Text>
                      <HStack alignItems="center">
                        <Icon as={ClockIcon} mr={4} />
                        <Text>
                          {moment(recordedMeal.loggedDateTime).format("HH:mm")}
                        </Text>
                      </HStack>
                    </VStack>
                    <HStack mb={6} justifyContent="space-between">
                      <VStack>
                        <Text mb={4} bold>
                          {t("mealPlanner.modal.mealSize")}
                        </Text>
                        <HStack alignItems="center">
                          <Icon as={ChevronsUpDownIcon} mr={4} />
                          <Text>{recordedMeal.size}</Text>
                        </HStack>
                      </VStack>
                      <VStack mb={6}>
                        <Text mb={4} bold>
                          {t("mealPlanner.modal.selfPrepared")}
                        </Text>
                        <HStack alignItems="center">
                          <Icon
                            as={recordedMeal.cooked ? CheckIcon : CloseIcon}
                            mr={4}
                          />
                          <Text>
                            {recordedMeal.cooked
                              ? t("general.yes")
                              : t("general.no")}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <VStack mb={6}>
                      <Text mb={4} bold>
                        {t("mealPlanner.modal.note")}
                      </Text>
                      <Text>{recordedMeal.description}</Text>
                    </VStack>
                  </>
                )}

                {(!recordedMeal || (recordedMeal && isEdited)) && (
                  <>
                    <HStack
                      alignItems="center"
                      justifyContent="space-between"
                      gap={4}
                      mb={20}
                    >
                      <FormDateTimePicker
                        name="loggedTime"
                        mode="time"
                        label={t("mealPlanner.modal.time")}
                      />
                      <FormSwitch
                        name="cooked"
                        label={t("mealPlanner.modal.selfPrepared")}
                      />
                    </HStack>
                    <FormSelect
                      name="size"
                      options={[
                        { label: "XS", value: "XS" },
                        { label: "S", value: "S" },
                        { label: "M", value: "M" },
                        { label: "L", value: "L" },
                      ]}
                      placeholder={t("mealPlanner.modal.actualSizePH")}
                    />

                    <FormTextArea
                      name="description"
                      placeholder={
                        recordedMeal
                          ? t("mealPlanner.modal.noNote")
                          : t("mealPlanner.modal.describeMeal")
                      }
                    />
                  </>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack
                flex={1}
                justifyContent={
                  !recordedMeal || isEdited ? "flex-end" : "space-between"
                }
              >
                {recordedMeal && !isEdited ? (
                  <Button
                    size="sm"
                    action="secondary"
                    onPress={deleteRecordHandler}
                  >
                    {isLoading ? (
                      <Spinner size={"small"} color="#fff" />
                    ) : (
                      <>
                        <ButtonIcon as={TrashIcon} mr={4} />
                        <ButtonText>{t("mealPlanner.action.earse")}</ButtonText>
                      </>
                    )}
                  </Button>
                ) : !isEdited ? (
                  <Button size="sm" onPress={onPress} disabled={isLoading}>
                    {isLoading ? (
                      <Spinner size={"small"} color="#fff" />
                    ) : (
                      <>
                        <ButtonIcon as={CheckIcon} mr={4} />
                        <ButtonText>{t("mealPlanner.action.log")}</ButtonText>
                      </>
                    )}
                  </Button>
                ) : null}
                {recordedMeal && !isEdited && (
                  <Button size="sm" onPress={() => setIsEdited(true)}>
                    <ButtonIcon as={EditIcon} mr={4} />
                    <ButtonText>{t("mealPlanner.action.edit")}</ButtonText>
                  </Button>
                )}
                {recordedMeal && isEdited && (
                  <Button size="sm" onPress={updateRecordHandler}>
                    {isLoading ? (
                      <Spinner size={"small"} color="#fff" />
                    ) : (
                      <>
                        <ButtonIcon as={EditIcon} mr={4} />
                        <ButtonText>
                          {t("mealPlanner.action.update")}
                        </ButtonText>
                      </>
                    )}
                  </Button>
                )}
              </HStack>
            </ModalFooter>
          </FormProvider>
        </ModalContent>
      </KeyboardAvoidingView>
    </Modal>
  );
};
