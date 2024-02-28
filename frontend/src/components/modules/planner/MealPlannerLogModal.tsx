import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import {
  Button,
  ButtonText,
  ClockIcon,
  CloseIcon,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
import { PlannedMealType, useApp } from "context/appContext";
import { MealRecord } from "gql/graphql";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormInput } from "components/form/FormInput";
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

export const validationSchema = z.object({
  description: z.string().optional(),
  size: z.string(),
  loggedTime: z.date(),
  cooked: z.boolean(),
});

type FormDataType = z.infer<typeof validationSchema>;

type Props = {
  show: boolean;
  plannedMeal: PlannedMealType;
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

  const { appState } = useApp();
  const { addMealRecordMutation } = useAddMealRecord();

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    const { size, description, cooked, loggedTime } = values;
    try {
      const selectedDate = new Date(selectedDay);

      // Set the time of selectedDate to the current time
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
      console.log(response.data?.addMealRecord);
    } catch (e) {
      console.log(e);
    }
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) =>
    console.log(errors);

  const onPress = formContext.handleSubmit(onSubmit, onError);

  return (
    <Modal
      isOpen={show}
      onClose={() => {
        setShow(false);
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{plannedMeal && plannedMeal?.mealName}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <FormProvider {...formContext}>
            <VStack>
              <HStack alignItems="center" justifyContent="space-evenly" gap={4}>
                <HStack alignItems="center" justifyContent="center">
                  <FormDateTimePicker
                    name="loggedTime"
                    mode="time"
                    label="Time"
                    disabled={recordedMeal ? true : false}
                  />
                </HStack>
                <FormSwitch
                  name="cooked"
                  label="I have cooked it!"
                  disabled={recordedMeal ? true : false}
                />
              </HStack>
              <FormSelect
                name="size"
                options={["XS", "S", "M", "L"]}
                placeholder="The actual meal size?"
                disabled={recordedMeal ? true : false}
              />

              <FormTextArea
                name="description"
                placeholder="Write description if u want?"
                disabled={recordedMeal ? true : false}
              />
            </VStack>
          </FormProvider>
        </ModalBody>
        <ModalFooter>
          <HStack flex={1} justifyContent="space-between">
            <Button
              size="sm"
              variant="outline"
              onPress={() => Alert.alert("not implemented yet")}
            >
              <ButtonText>Edit plan</ButtonText>
            </Button>

            {recordedMeal ? (
              <Button
                size="sm"
                action="negative"
                variant="outline"
                onPress={() => {
                  Alert.alert("not implemented yet");
                  setShow(false);
                }}
              >
                <ButtonText>Earse</ButtonText>
              </Button>
            ) : (
              <Button size="sm" onPress={onPress}>
                <ButtonText>Log</ButtonText>
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
