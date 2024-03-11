import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  CloseIcon,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollView,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { eatingHabitsTips } from "data/mock/educationTips";
import { Image } from "@gluestack-ui/themed";

type EatingHabitTipType = {
  date: string;
  name: string;
  description: string;
  message: string;
};

export const EducationScreen = () => {
  const [selectedTip, setSelectedTip] = useState<
    EatingHabitTipType | undefined
  >(undefined);

  return (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <ScrollView style={{ flex: 1, marginTop: 6 }}>
        <View alignItems="center">
          <Image
            w={150}
            h={150}
            source={require("../../../assets/images/insights.png")}
            resizeMode="contain"
            alt="about"
          />
        </View>
        <Text bold size="lg" style={{ color: "#10b981" }}>
          Read up on healthy habits
        </Text>
        <Text size="sm">
          This section is aiming to help you to extend your knowledge about
          healhy eating habits and things which are having a influence on you
          food behaviour.
        </Text>
        <VStack gap={6} mt={6}>
          {eatingHabitsTips.map((item: EatingHabitTipType, index: number) => (
            <Box
              key={index}
              style={
                index === eatingHabitsTips.length - 1
                  ? { marginBottom: 10 }
                  : {}
              }
            >
              <Text size="xs" style={{ color: "gray" }}>
                {item.date}
              </Text>
              <TouchableOpacity onPress={() => setSelectedTip(item)}>
                <Box
                  style={{
                    backgroundColor: "white",
                    height: 100,
                    borderRadius: 8,
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack
                      justifyContent="center"
                      alignItems="center"
                      gap={10}
                    >
                      <Ionicons
                        name="bulb-outline"
                        size={26}
                        color={"#10b981"}
                      />
                      <VStack>
                        <Text size="lg" style={{ color: "#10b981" }}>
                          {item.name}
                        </Text>
                        <Text size="sm" style={{ color: "grey" }}>
                          {item.description}
                        </Text>
                      </VStack>
                    </HStack>
                    <Ionicons
                      name={"chevron-forward-outline"}
                      size={26}
                      color={"#10b981"}
                    />
                  </HStack>
                </Box>
              </TouchableOpacity>
            </Box>
          ))}
        </VStack>
      </ScrollView>

      <Modal
        isOpen={!!selectedTip}
        onClose={() => {
          setSelectedTip(undefined);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">{selectedTip?.name}</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>{selectedTip?.message}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack flex={1} justifyContent="flex-end">
              <Button size="sm" onPress={() => setSelectedTip(undefined)}>
                <ButtonText>Got it!</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};
