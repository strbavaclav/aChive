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
} from "@gluestack-ui/themed";
import MealPlanCard from "components/custom/MealPlanCard";
import DateTimePicker from "@react-native-community/datetimepicker";

const mealPlannedMocks = [
  { mealName: "Breakfast", mealTime: "7:30-9:00" },
  { mealName: "Lunch", mealTime: "12:00-13:00" },
  { mealName: "Snack", mealTime: "15:00-15:30" },
  { mealName: "Dinner", mealTime: "18:00-20:00" },
];

const MealPlannerScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  return (
    <View flex={1} gap={2}>
      <DateSlider />
      <Heading size="md" color="#10b981" ml={5}>
        Your daily plan
      </Heading>
      <ScrollView flex={1} h={"70%"}>
        {mealPlannedMocks.map((plannedMeal, i) => (
          <MealPlanCard
            key={i}
            mealName={plannedMeal.mealName}
            mealTime={plannedMeal.mealTime}
            onLogMeal={() => setShowModal(true)}
            buttonRef={ref}
          />
        ))}
      </ScrollView>
      <Box
        position="absolute"
        bottom={0}
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
          <Heading>Daily progress</Heading>
          <HStack justifyContent="center" alignItems="center" gap={10}>
            <Progress value={46} h={8}>
              <ProgressFilledTrack h={8} />
            </Progress>
            <Icon as={CheckCircleIcon} size="xl" />
          </HStack>
          <Text size="md">0 of {mealPlannedMocks.length} meals</Text>
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
