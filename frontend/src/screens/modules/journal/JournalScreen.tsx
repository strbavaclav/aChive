import { Keyboard, Platform, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  EditIcon,
  HStack,
  Heading,
  KeyboardAvoidingView,
  Text,
  TrashIcon,
  VStack,
  View,
  Image,
  Spinner,
} from "@gluestack-ui/themed";
import DateSlider from "components/custom/DateSlider";
import { FormTextArea } from "components/form/FormTextArea";
import { z } from "zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { StressSlider } from "components/modules/stress/StressSlider";
import { debounce } from "lodash";
import { useAddStressRecord } from "calls/stress/addStressRecord";
import { useQuery } from "@apollo/client";
import { GET_STRESS_RECORD_BY_DATE } from "calls/stress/useGetStressRecordByDate";
import { useDeleteStressRecord } from "calls/stress/deleteStressRecord";
import { useEditStressRecord } from "calls/stress/editStressRecord";
import { AppAlertDialog } from "components/general/AppAlertDialog";

export const JournalScreen = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(() => {
    const initialDate = new Date();
    initialDate.setHours(0, 0, 0, 0);
    return initialDate;
  });
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { t } = useTranslation();
  const { AddStressRecordMutation } = useAddStressRecord();
  const { DeleteStressRecordMutation } = useDeleteStressRecord();
  const { EditStressRecordMutation } = useEditStressRecord();

  const {
    loading: loadingRecord,
    error: recordError,
    data: record,
    refetch: refetchRecord,
  } = useQuery(GET_STRESS_RECORD_BY_DATE, {
    variables: {
      date: selectedDay.toISOString(),
    },
  });

  const validationSchema = z.object({
    stressValue: z.number(),
    stressNote: z.string(),
  });

  type FormDataType = z.infer<typeof validationSchema>;

  const defaultValues: Partial<FormDataType> = {
    stressNote: "",
    stressValue: 5,
  };

  const formContext = useForm<FormDataType>({
    defaultValues,
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    refetchRecord();
  }, [selectedDay]);

  useEffect(() => {
    if (isEditing && record?.getStressRecordsByDate?.record) {
      const { value, note } = record.getStressRecordsByDate.record;
      formContext.setValue("stressValue", value);
      formContext.setValue("stressNote", note as string);
    }
  }, [isEditing, record, formContext]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const debouncedScrollToShow = debounce((offset: number) => {
      scrollViewRef.current?.scrollTo({
        y: offset,
        animated: true,
      });
    }, 100);

    const debouncedScrollToHide = debounce(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        const yourDesiredOffset = 300;
        debouncedScrollToShow(yourDesiredOffset);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        debouncedScrollToHide();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    setIsLoading(true);

    const { stressValue, stressNote } = values;
    try {
      const selectedDate = new Date(selectedDay);

      const loggedDateTime = selectedDate.toISOString();

      await AddStressRecordMutation({
        variables: {
          stressRecordData: {
            timestamp: loggedDateTime,
            value: stressValue,
            note: stressNote,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
    formContext.reset(defaultValues);
    refetchRecord();
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) => {
    console.log(errors);
    setIsLoading(false);
  };

  const onPress = formContext.handleSubmit(onSubmit, onError);

  const onEditHandler = async () => {
    setIsLoading(true);
    const { stressValue, stressNote } = formContext.getValues();

    try {
      const selectedDate = new Date(selectedDay);

      const loggedDateTime = selectedDate.toISOString();

      await EditStressRecordMutation({
        variables: {
          date: loggedDateTime,
          updatedRecord: {
            timestamp: loggedDateTime,
            note: stressNote,
            value: stressValue,
          },
        },
      });
      setIsLoading(false);
      setIsEditing(false);
      refetchRecord();
      formContext.reset(defaultValues);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteHandler = async () => {
    setIsLoading(true);
    try {
      const selectedDate = new Date(selectedDay);

      const loggedDateTime = selectedDate.toISOString();

      await DeleteStressRecordMutation({
        variables: {
          date: loggedDateTime,
        },
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
    setIsDeleting(false);
    refetchRecord();
  };

  const isFuture = selectedDay > new Date();

  return (
    <DrawerScreenWrapper isBack screenTitle={t("navigation.journal")}>
      <View flex={1}>
        <View borderBottomColor="lightgray" borderBottomWidth={1}>
          <DateSlider onDaySelect={setSelectedDay} daySelected={selectedDay} />
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
          <ScrollView
            contentContainerStyle={{ alignItems: "center", flex: 1 }}
            ref={scrollViewRef}
          >
            {isFuture && (
              <View flex={1} justifyContent="center" alignItems="center">
                <Image
                  w={250}
                  h={250}
                  source={require("../../../assets/images/wait.png")}
                  resizeMode="contain"
                  alt="about"
                />
                <Heading color="gray">{t("journal.record.isFuture")}</Heading>
              </View>
            )}
            {record?.getStressRecordsByDate?.record &&
            !isLoading &&
            !loadingRecord &&
            !isEditing &&
            !isFuture ? (
              <View flex={1}>
                <Image
                  w={250}
                  h={250}
                  mt={20}
                  source={
                    record?.getStressRecordsByDate?.record.value > 5
                      ? require("../../../assets/images/stressBad.png")
                      : require("../../../assets/images/stressGood.png")
                  }
                  resizeMode="contain"
                  alt="about"
                />
                <VStack
                  flex={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <VStack flex={1} justifyContent="center" alignItems="center">
                    <Heading mb={10}> {t("journal.record.felt")}</Heading>
                    <Text
                      bold
                    >{`[ ${record.getStressRecordsByDate.record.value} / 10 ]`}</Text>
                    <Text italic mt={6}>
                      {t(
                        `components.stressFormSlider.value.${record.getStressRecordsByDate.record.value}`
                      )}
                    </Text>
                    <VStack
                      w={"100%"}
                      mt={20}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Heading size="sm">
                        {" "}
                        {t("journal.record.description")}
                      </Heading>
                      <Text italic>
                        {record.getStressRecordsByDate.record.note}
                      </Text>
                    </VStack>
                  </VStack>

                  <HStack flex={1} mt={20} gap={10} alignItems="center">
                    <Button
                      size="md"
                      action="secondary"
                      isDisabled={false}
                      isFocusVisible={false}
                      w={120}
                      onPress={() => setIsDeleting(true)}
                    >
                      <ButtonIcon as={TrashIcon} mr={4} />
                      <ButtonText> {t("journal.action.earse")}</ButtonText>
                    </Button>
                    <Button
                      size="md"
                      action="primary"
                      isDisabled={false}
                      isFocusVisible={false}
                      w={120}
                      onPress={() => setIsEditing(true)}
                    >
                      <ButtonIcon as={EditIcon} mr={4} />
                      <ButtonText> {t("journal.action.edit")}</ButtonText>
                    </Button>
                  </HStack>
                </VStack>
              </View>
            ) : !isLoading && !loadingRecord && !isFuture ? (
              <>
                <Image
                  w={150}
                  h={150}
                  mt={20}
                  source={require("../../../assets/images/stress.png")}
                  resizeMode="contain"
                  alt="about"
                />
                <VStack flex={1} w={"80%"} pt={10} alignItems="center">
                  <FormProvider {...formContext}>
                    <HStack
                      alignItems="center"
                      justifyContent="center"
                      gap={5}
                      mb={10}
                    >
                      <Heading size="sm">
                        {t("journal.form.howWasYourDay")}
                      </Heading>
                      <TouchableOpacity
                        onPress={() => {
                          setShowHelp((prevState) => !prevState);
                        }}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name={"information-circle-outline"}
                          size={20}
                          color={"#10b981"}
                        />
                      </TouchableOpacity>
                    </HStack>
                    <StressSlider name="stressValue" />
                    <View flex={1} width={"100%"}>
                      <FormTextArea
                        name="stressNote"
                        label={t("journal.form.writeNote")}
                        placeholder={t("journal.form.notePH")}
                        helperText={t("journal.form.noteDescription")}
                      />
                    </View>
                    <View flex={1} mt={20}>
                      {isEditing ? (
                        <Button
                          size="md"
                          variant="solid"
                          action="primary"
                          isDisabled={false}
                          isFocusVisible={false}
                          onPress={onEditHandler}
                          w={120}
                        >
                          {isLoading ? (
                            <Spinner size={"small"} color="#fff" />
                          ) : (
                            <>
                              <ButtonText>
                                {t("journal.action.save")}
                              </ButtonText>
                              <ButtonIcon as={EditIcon} ml={4} />
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          size="md"
                          variant="solid"
                          action="primary"
                          isDisabled={false}
                          isFocusVisible={false}
                          onPress={onPress}
                          w={120}
                        >
                          {isLoading ? (
                            <Spinner size={"small"} color="#fff" />
                          ) : (
                            <>
                              <ButtonText>
                                {t("journal.action.enlist")}
                              </ButtonText>
                              <ButtonIcon as={AddIcon} ml={4} />
                            </>
                          )}
                        </Button>
                      )}
                    </View>
                  </FormProvider>
                </VStack>
              </>
            ) : !isFuture ? (
              <View flex={1} justifyContent="center" alignItems="center">
                <Spinner size={"large"} />
              </View>
            ) : null}
            {isDeleting && (
              <AppAlertDialog
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onSubmit={onDeleteHandler}
                title={t("journal.record.earseTitle")}
                description={t("journal.record.earseDescription")}
                submitTitle={t("journal.action.delete")}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DrawerScreenWrapper>
  );
};
