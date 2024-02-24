import React, { useRef, useState } from "react";
import DateSlider from "components/custom/DateSlider";
import {
  Box,
  Heading,
  Progress,
  ProgressFilledTrack,
  VStack,
  View,
  Text,
  HStack,
  Icon,
  CheckCircleIcon,
  ScrollView,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  CloseIcon,
  ButtonText,
  Button,
  ClockIcon,
  ButtonIcon,
  AddIcon,
} from "@gluestack-ui/themed";
import MealPlanCard from "components/custom/MealPlanCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useApp } from "context/appContext";

const MealPlannerScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const ref = useRef(null);
  const { appState } = useApp();

  const formatTime = (timestamp: Date) => {
    // Ensure the timestamp is a number. If it's a string, try converting it.
    const numericTimestamp = Number(timestamp);

    // Check if the timestamp is valid
    if (isNaN(numericTimestamp)) {
      return "Invalid Time"; // Or handle the error as appropriate
    }

    const date = new Date(numericTimestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
  };

  return (
    <View flex={1} gap={2}>
      <DateSlider onDaySelect={setSelectedDay} daySelected={selectedDay} />

      <ScrollView mt={5}>
        <Heading size="md" color="#10b981" ml={5}>
          Your daily plan
        </Heading>
        {appState.userData &&
          appState.userData.plan &&
          appState.userData?.plan.map((plannedMeal, i) => (
            <MealPlanCard
              key={i}
              mealName={plannedMeal.mealName!}
              mealTime={`${formatTime(plannedMeal.startTime!)} - ${formatTime(plannedMeal.endTime!)}`}
              mealSize={plannedMeal.mealSize!}
              logged={false}
              onLogMeal={() => setShowModal(true)}
            />
          ))}
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

      <Box
        w={"100%"}
        h={"12%"}
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          shadowColor: "black",
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
      >
        <VStack w={"80%"} justifyContent="center" alignItems="center">
          <Heading size="sm">Daily progress</Heading>
          <HStack justifyContent="center" alignItems="center" gap={10}>
            <Progress
              value={
                appState.userData && appState.userData.plan
                  ? (1 / appState.userData.plan.length) * 100
                  : 0
              }
              h={8}
            >
              <ProgressFilledTrack h={8} />
            </Progress>
            <Icon as={CheckCircleIcon} size="xl" />
          </HStack>
          <Text size="md">
            1 of{" "}
            {appState.userData && appState.userData.plan
              ? appState.userData.plan.length
              : 0}{" "}
            meals
          </Text>
        </VStack>
      </Box>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Log meal</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Here will be the form for meal logging.</Text>
            <HStack alignItems="center" gap={4}>
              <Icon as={ClockIcon} size="md" />
              <DateTimePicker value={new Date()} mode="time" />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              borderWidth="$0"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Log</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default MealPlannerScreen;
