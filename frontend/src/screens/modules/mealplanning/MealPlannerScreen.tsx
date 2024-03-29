import React, { useCallback, useEffect, useState } from "react";
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
  FlatList,
  Link,
  SectionList,
  VStack,
} from "@gluestack-ui/themed";
import { MealPlannerCard } from "components/modules/planner/MealPlannerCard";
import { PlannedMealType, useApp } from "context/appContext";
import { useQuery } from "@apollo/client";

import { useFocusEffect } from "@react-navigation/native";
import { useAddMealRecord } from "calls/planner/useAddMealRecord";
import { MealPlannerProgressBar } from "components/modules/planner/MealPlannerProgressBar";
import { MealPlannerLogModal } from "components/modules/planner/MealPlannerLogModal";
import { formatTime } from "utils/formatTime";
import { ListRenderItem } from "react-native";
import { GET_MEAL_RECORDS_BY_DATE } from "calls/planner/useGetMealRecordsByDate";
import { MealRecord } from "gql/graphql";
import { Image } from "@gluestack-ui/themed";

const MealPlannerScreen = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // Note: January is 0, February is 1, etc.
  const date = today.getDate();

  // Create a new date object at midnight in the local timezone
  const localMidnight = new Date(year, month, date);

  // Adjust for the timezone offset to get to UTC midnight
  const offset = localMidnight.getTimezoneOffset() * 60000; // Convert offset to milliseconds
  const utcMidnight = new Date(localMidnight.getTime() - offset);

  const [selectedDay, setSelectedDay] = useState(utcMidnight);
  const [selectedMeal, setSelectedMeal] = useState<PlannedMealType | undefined>(
    undefined
  );
  const [dataSections, setDataSections] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const { appState } = useApp();

  const {
    loading: loadingRecords,
    error: recordsError,
    data: records,
    refetch: refetchRecords,
  } = useQuery(GET_MEAL_RECORDS_BY_DATE, {
    variables: {
      userId: appState.userData?._id!,
      date: selectedDay.toISOString(),
    },
  });

  const planData = appState.userData?.plan;

  useEffect(() => {
    const sections = [
      {
        title: "Your Daily Plan",
        data: planData,
        renderItem: renderItem,
      },
      {
        title: "Extra meals",
        data:
          records?.getMealRecordsByDate?.filter(
            (record) => record?.mealId === "undefined"
          ) ?? [],
        // Wrap records in an array since data expects an array
        //@ts-ignore
        renderItem: renderExtraItem,
      },
    ];

    //@ts-ignore
    setDataSections(sections);
  }, [planData, records]);

  useEffect(() => {
    refetchRecords();
  }, [selectedDay]);

  useFocusEffect(
    useCallback(() => {
      refetchRecords();
    }, [refetchRecords])
  );

  const openMealDetail = (meal?: PlannedMealType) => {
    setSelectedMeal(undefined);
    if (meal) {
      setSelectedMeal(meal);
    }
    setShowModal(true);
  };

  const onLogMealHandler = async () => {
    setShowModal(false);
    setSelectedMeal(undefined);
    refetchRecords();
  };

  const addExtraMeal = () => {
    setSelectedMeal(undefined);
    setShowModal(true);
  };

  if (recordsError) return <Text>Error: {recordsError.message}</Text>;

  const renderItem: ListRenderItem<unknown> = ({ item }) => {
    const plannedMeal = item as PlannedMealType;
    const isLogged = records?.getMealRecordsByDate!.some(
      (record) => record?.mealId === plannedMeal._id
    );

    return (
      <MealPlannerCard
        key={plannedMeal._id}
        plannedMeal={plannedMeal}
        recordedMeal={records?.getMealRecordsByDate?.find(
          (record) => record?.mealId === plannedMeal._id
        )}
        logged={isLogged}
        selectedDate={selectedDay.toISOString()}
        onPress={() => openMealDetail(plannedMeal)}
      />
    );
  };

  const renderExtraItem: ListRenderItem<unknown> = ({ item }) => {
    const isLogged = true;
    const itemData = item as MealRecord;
    if (itemData) {
      const extraMeal = itemData;
      if (extraMeal) {
        return (
          <MealPlannerCard
            key={extraMeal._id}
            recordedMeal={extraMeal}
            logged={isLogged}
            selectedDate={selectedDay.toISOString()}
            onPress={() => openMealDetail()}
          />
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <View flex={1} gap={2}>
      <DateSlider onDaySelect={setSelectedDay} daySelected={selectedDay} />
      {loadingRecords && (
        <View flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="#10b981" />
        </View>
      )}

      {!loadingRecords && (
        <SectionList
          style={{ marginTop: 4 }}
          sections={dataSections}
          stickySectionHeadersEnabled={false}
          //@ts-ignore
          renderSectionHeader={({ section: { title } }) => (
            <Text size="sm" color="#10b981" ml={5}>
              {title}
            </Text>
          )}
          ListFooterComponent={() => (
            <VStack justifyContent="center" alignItems="center" mt={4}>
              <Button
                size="sm"
                justifyContent="center"
                alignItems="center"
                gap={2}
                mb={10}
                mt={10}
                onPress={addExtraMeal}
              >
                <ButtonIcon as={AddIcon} size="sm" />
                <ButtonText>Add extra meal</ButtonText>
              </Button>
              <Image
                w={150}
                h={150}
                source={require("../../../assets/images/planner.png")}
                resizeMode="contain"
                alt="about"
              />
            </VStack>
          )}
          renderItem={({ item, section }) => {
            //@ts-ignore
            return section.renderItem({ item });
          }}
        />
      )}

      {/* {!loadingRecords && (
        <FlatList
          data={planData}
          ListHeaderComponent={() => (
            <HStack justifyContent="space-between">
              <Text size="sm" color="#10b981" ml={5}>
                Your daily plan
              </Text>
            </HStack>
          )}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <HStack justifyContent="center" mt={4}>
              <Button
                size="sm"
                justifyContent="center"
                alignItems="center"
                gap={2}
                mb={10}
                mt={10}
                onPress={addExtraMeal}
              >
                <ButtonIcon as={AddIcon} size="sm" />
                <ButtonText>Add extra meal</ButtonText>
              </Button>
            </HStack>
          )}
          contentContainerStyle={{ marginTop: 5 }}
        />
      )} */}

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
