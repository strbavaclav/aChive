import {
  Box,
  HStack,
  Text,
  VStack,
  ScrollView,
  Avatar,
} from "@gluestack-ui/themed";
import DashboardTile from "components/custom/DashboardTile";
import React from "react";
import { TouchableOpacity } from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView flex={1} padding={6} backgroundColor="#fafafa">
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
            <HStack
              flex={1}
              width={"100%"}
              justifyContent="space-around"
              alignItems="center"
            >
              <Avatar />
              <Text style={{ color: "white" }} bold size="xl">
                Hi Vaclav! Profile Tile
              </Text>
            </HStack>
          </Box>
        </TouchableOpacity>
        <HStack flex={1} gap={5}>
          <DashboardTile />
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
              <Text style={{ color: "white" }}>Stress TILE</Text>
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
            <Text style={{ color: "white" }}>Eating statisticTILE</Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default HomeScreen;
