import { StyleSheet, View } from "react-native";
import React from "react";
import { Box, HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { eatingHabitsTips } from "data/mock/educationTips";

const EducationScreen = () => {
  return (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <ScrollView style={{ flex: 1, marginTop: 6 }}>
        <Text bold size="lg" style={{ color: "#10b981" }}>
          Read up on healthy habits
        </Text>
        <Text size="sm">
          This section is aiming to help you to extend your knowledge about
          healhy eating habits and things which are having a influence on you
          food behaviour.
        </Text>
        <VStack gap={6} mt={6}>
          {eatingHabitsTips.map((item, index) => (
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
              <TouchableOpacity>
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
    </View>
  );
};

export default EducationScreen;

const styles = StyleSheet.create({});
