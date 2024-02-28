import React, { useCallback, useState } from "react";
import DateSlider from "components/custom/DateSlider";
import {
  Heading,
  View,
  Text,
  HStack,
  ScrollView,
  ButtonText,
  Button,
  ButtonIcon,
  AddIcon,
  Spinner,
} from "@gluestack-ui/themed";
import { MealPlannerCard } from "components/modules/planner/MealPlannerCard";
import { PlannedMealType, useApp } from "context/appContext";
import { useQuery } from "@apollo/client";
import { GET_MEAL_RECORDS_BY_DATE } from "calls/planner/useGetMealRecordsByDate";
import { useFocusEffect } from "@react-navigation/native";
import { useAddMealRecord } from "calls/planner/useAddMealRecord";
import { MealPlannerProgressBar } from "components/modules/planner/MealPlannerProgressBar";
import { MealPlannerLogModal } from "components/modules/planner/MealPlannerLogModal";
import { formatTime } from "utils/formatTime";

const MealPlannerScreen = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState<PlannedMealType | undefined>(
    undefined
  );

  const [showModal, setShowModal] = useState(false);

  const { appState } = useApp();
  const { addMealRecordMutation } = useAddMealRecord();

  const {
    loading: loadingRecords,
    error: recordsError,
    data: records,
    refetch: refetchRecords,
  } = useQuery(GET_MEAL_RECORDS_BY_DATE, {
    variables: { userId: appState.userData?._id!, date: String(selectedDay) },
  });

  useFocusEffect(
    useCallback(() => {
      refetchRecords();
    }, [refetchRecords])
  );

  const openMealDetail = (meal: PlannedMealType) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const onLogMealHandler = async () => {
    setShowModal(false);
    refetchRecords();
    // try {
    //   const response = await addMealRecordMutation({
    //     variables: {
    //       userId: appState.userData?._id!,
    //       mealRecord: {
    //         mealId: selectedMeal?._id!,
    //         size: selectedMeal?.mealSize!,
    //         loggedDateTime: selectedDay.toISOString(),
    //         description: "num numity",
    //         cooked: false,
    //       },
    //     },
    //   });
    //   console.log(response.data?.addMealRecord);

    // } catch (e) {
    //   console.log(e);
    // }
  };

  if (recordsError) return <Text>Error: {recordsError.message}</Text>;

  return (
    <View flex={1} gap={2}>
      <DateSlider onDaySelect={setSelectedDay} daySelected={selectedDay} />
      {loadingRecords && (
        <View flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="#10b981" />
        </View>
      )}

      {!loadingRecords && (
        <ScrollView mt={5}>
          <Heading size="md" color="#10b981" ml={5}>
            Your daily plan
          </Heading>
          {appState.userData &&
            appState.userData.plan &&
            appState.userData?.plan.map((plannedMeal, index) => {
              const isLogged = records?.getMealRecordsByDate!.some(
                (record) => record?.mealId === plannedMeal._id
              );

              return (
                <MealPlannerCard
                  key={`${plannedMeal?._id}_${index}`}
                  mealId={plannedMeal._id!}
                  mealName={plannedMeal.mealName!}
                  mealTime={`${formatTime(plannedMeal.startTime!)} - ${formatTime(plannedMeal.endTime!)}`}
                  mealSize={plannedMeal.mealSize!}
                  logged={isLogged}
                  selectedDate={selectedDay.toISOString()}
                  onPress={() => openMealDetail(plannedMeal)}
                />
              );
            })}
          <HStack justifyContent="center" mt={4}>
            <Button
              size="sm"
              justifyContent="center"
              alignItems="center"
              gap={2}
              mb={10}
              mt={10}
            >
              <ButtonIcon as={AddIcon} size="sm" />
              <ButtonText>Add extra meal</ButtonText>
            </Button>
          </HStack>
        </ScrollView>
      )}

      <MealPlannerProgressBar
        loading={loadingRecords}
        recordedMealsCount={
          records?.getMealRecordsByDate
            ? records?.getMealRecordsByDate?.length
            : 0
        }
      />

      <MealPlannerLogModal
        show={showModal}
        plannedMeal={selectedMeal!}
        recordedMeal={records?.getMealRecordsByDate?.find(
          (record) => record?.mealId === String(selectedMeal?._id)
        )}
        selectedDay={selectedDay.toISOString()}
        setShow={setShowModal}
        logMeal={onLogMealHandler}
      />
    </View>
  );
};

export default MealPlannerScreen;
