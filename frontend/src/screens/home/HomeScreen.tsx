import { Box, HStack, Text, VStack, ScrollView } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView flex={1} padding={6} backgroundColor="white">
      <VStack>
        <HStack marginVertical={5}>
          <Text bold size="lg">
            Today -
          </Text>
          <Text size="lg">
            {" " +
              new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(Date.now())}
          </Text>
        </HStack>

        <TouchableOpacity>
          <Box
            backgroundColor="#10b981"
            style={{
              marginVertical: 3,
              borderRadius: 8,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }} bold size="xl">
              Hi Vaclav!
            </Text>
          </Box>
        </TouchableOpacity>
        <HStack flex={1} gap={5}>
          <Box
            flex={1}
            backgroundColor="#10b981"
            style={{
              marginVertical: 3,
              borderRadius: 8,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Text style={{ color: "white" }}>TILE</Text>
            </TouchableOpacity>
          </Box>
          <Box
            flex={1}
            backgroundColor="#10b981"
            style={{
              marginVertical: 3,
              borderRadius: 8,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Text style={{ color: "white" }}>TILE</Text>
            </TouchableOpacity>
          </Box>
        </HStack>
        <Box
          flex={1}
          backgroundColor="#10b981"
          style={{
            marginVertical: 3,
            borderRadius: 8,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ color: "white" }}>TILE</Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default HomeScreen;
