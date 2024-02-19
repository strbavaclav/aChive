import {
  Box,
  HStack,
  Text,
  VStack,
  ScrollView,
  Avatar,
  Heading,
  View,
} from "@gluestack-ui/themed";
import DashboardTile from "components/custom/DashboardTile";
import { useApp } from "context/appContext";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import Carousel from "react-native-reanimated-carousel";

const commitsData = [
  { date: "2024-01-02", count: 1 },
  { date: "2024-01-03", count: 2 },
  { date: "2024-01-04", count: 3 },
  { date: "2024-01-05", count: 4 },
  { date: "2024-01-06", count: 5 },
  { date: "2024-01-30", count: 2 },
  { date: "2024-01-31", count: 3 },
  { date: "2024-01-01", count: 2 },
  { date: "2024-02-02", count: 4 },
  { date: "2024-01-05", count: 2 },
  { date: "2024-02-30", count: 4 },
];
const handleToolTip: any = {};

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};
const HomeScreen = () => {
  const width = Dimensions.get("window").width;
  const { appState } = useApp();

  return (
    <ScrollView flex={1} padding={6}>
      <VStack flex={1}>
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

        <TouchableOpacity style={{ flex: 1 }}>
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
                Hi {appState?.userData?.username}!
              </Text>
            </HStack>
          </Box>
        </TouchableOpacity>
        <HStack flex={1} gap={5}>
          <DashboardTile />
          <TouchableOpacity style={{ flex: 1 }}>
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
              <Text style={{ color: "white" }}>Stress TILE</Text>
            </Box>
          </TouchableOpacity>
        </HStack>
        <Heading color="#10b981">Your progress</Heading>

        <HStack
          backgroundColor="white"
          style={{
            marginVertical: 3,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Carousel
            loop
            width={width - 10}
            pagingEnabled={true}
            data={[1, 2]}
            renderItem={({ item }) => {
              if (item === 1) {
                return (
                  <View>
                    <LineChart
                      data={{
                        labels: [
                          "31.1.",
                          "1.2.",
                          "2.2.",
                          "3.2.",
                          "4.2",
                          "5.2.",
                          "5.2.",
                        ],
                        datasets: [
                          {
                            data: [5, 4, 1, 0, 4, 5, 5],
                          },
                        ],
                      }}
                      width={Dimensions.get("window").width}
                      height={300}
                      yAxisSuffix=" meals"
                      yAxisInterval={1}
                      chartConfig={{
                        backgroundColor: "white",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        decimalPlaces: 0,
                        color: (opacity = 1) =>
                          `rgba(16, 185, 129, ${opacity})`,
                        labelColor: (opacity = 1) =>
                          `rgba(16, 185, 129, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                        propsForDots: {
                          r: "6",
                          strokeWidth: "2",
                          stroke: "#10b981",
                        },
                      }}
                      bezier
                      style={{
                        marginVertical: 8,
                        borderRadius: 16,
                      }}
                    />
                  </View>
                );
              } else if (item === 2) {
                return (
                  <ContributionGraph
                    values={commitsData}
                    endDate={new Date()}
                    numDays={105}
                    width={Dimensions.get("window").width}
                    height={200}
                    chartConfig={chartConfig}
                    tooltipDataAttrs={(value) => handleToolTip}
                    //onDayPress={({ date, count }) => console.log(date, count)}
                  />
                );
              } else {
                return <Text>No data </Text>;
              }
            }}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default HomeScreen;
