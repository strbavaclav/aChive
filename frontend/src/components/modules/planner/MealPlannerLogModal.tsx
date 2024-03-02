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
} from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
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
import { Alert } from "react-native";
import { useRemoveMealRecordById } from "calls/planner/useRemoveMealRecordById";
import moment from "moment";
import { useUpdateMealRecordById } from "calls/planner/useUpdateMealRecordById";

export const validationSchema = z.object({
  loggedTime: z.date(),
  cooked: z.boolean(),
  size: z.string().min(1, "Meal size has to be selected!"),
  description: z.string().optional(),
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
    };

    formContext.reset(defaultValues);
  }, [plannedMeal, formContext.reset]);

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    setIsLoading(true);

    const { size, description, cooked, loggedTime } = values;
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
      const { size, description, cooked, loggedTime } = values;

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
      "Removing record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
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
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" color="#10b981">
            {plannedMeal && plannedMeal?.mealName}
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <FormProvider {...formContext}>
            <VStack>
              {recordedMeal && !isEdited && (
                <>
                  <VStack mb={6}>
                    <Text mb={4} bold>
                      Meal time
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
                        Meal size
                      </Text>
                      <HStack alignItems="center">
                        <Icon as={ChevronsUpDownIcon} mr={4} />
                        <Text>{recordedMeal.size}</Text>
                      </HStack>
                    </VStack>
                    <VStack mb={6}>
                      <Text mb={4} bold>
                        Self-prepared meal
                      </Text>
                      <HStack alignItems="center">
                        <Icon
                          as={recordedMeal.cooked ? CheckIcon : CloseIcon}
                          mr={4}
                        />
                        <Text>{recordedMeal.cooked ? "Yes" : "No"}</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <VStack mb={6}>
                    <Text mb={4} bold>
                      Note
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
                      label="Time"
                    />
                    <FormSwitch name="cooked" label="Self-prepared meal" />
                  </HStack>
                  <FormSelect
                    name="size"
                    options={["XS", "S", "M", "L"]}
                    placeholder="The actual meal size?"
                  />

                  <FormTextArea
                    name="description"
                    placeholder={
                      recordedMeal ? "No note..." : "Describe you meal..."
                    }
                  />
                </>
              )}
            </VStack>
          </FormProvider>
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
                    <ButtonText>Earse</ButtonText>
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
                    <ButtonText>Log</ButtonText>
                  </>
                )}
              </Button>
            ) : null}
            {recordedMeal && !isEdited && (
              <Button size="sm" onPress={() => setIsEdited(true)}>
                <ButtonIcon as={EditIcon} mr={4} />
                <ButtonText>Edit</ButtonText>
              </Button>
            )}
            {recordedMeal && isEdited && (
              <Button size="sm" onPress={updateRecordHandler}>
                {isLoading ? (
                  <Spinner size={"small"} color="#fff" />
                ) : (
                  <>
                    <ButtonIcon as={EditIcon} mr={4} />
                    <ButtonText>Update</ButtonText>
                  </>
                )}
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
