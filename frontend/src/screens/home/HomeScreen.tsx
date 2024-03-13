import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Text,
  VStack,
  ScrollView,
  Avatar,
  Heading,
  View,
  Icon,
  ChevronsRightIcon,
  InfoIcon,
  CloseIcon,
  Divider,
} from "@gluestack-ui/themed";
import { DashboardChartTile } from "components/custom/dashboard/DashboardChartTile";
import DashboardTile from "components/custom/dashboard/DashboardTile";
import { useApp } from "context/appContext";
import moment from "moment";
import { MainDrawerParams } from "navigation/main";
import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <View flex={1} padding={6}>
      <HStack mb={4}>
        <Text bold size="lg">
          {t("dashboard.today")}
        </Text>
        <Text size="lg">{moment().format("D. MMMM, YYYY")}</Text>
      </HStack>

      <VStack gap={4}>
        <Box w={"100%"} h={100}>
          <DashboardTile
            variant="secondary"
            navigate={"Profile" as keyof MainDrawerParams}
          >
            <HStack
              width={"100%"}
              justifyContent="center"
              alignItems="center"
              gap={10}
              m={4}
            >
              <HStack justifyContent="center" alignItems="center" gap={6}>
                <Ionicons
                  name={"person-circle-outline"}
                  size={60}
                  color={"white"}
                />
                <VStack>
                  <Text style={{ color: "white" }} bold size="xl">
                    Hi {appState?.userData?.username}!
                  </Text>
                </VStack>
              </HStack>

              <Divider orientation="vertical" bgColor="white" w={2} />
              <View>
                <VStack>
                  <Text color="white" bold>
                    Score:
                  </Text>
                  <Text color="white">No. meal records: 13</Text>
                  <Text color="white">No. stress records: 9</Text>
                </VStack>
              </View>
            </HStack>
          </DashboardTile>
        </Box>

        <HStack gap={5}>
          <DashboardTile navigate={"Planner" as keyof MainDrawerParams}>
            <HStack justifyContent="center" alignItems="center" gap={6}>
              <Ionicons
                size={40}
                name={"checkmark-done-outline"}
                color={"#10b981"}
              />
              <VStack>
                <HStack justifyContent="center" alignItems="center">
                  <Text p={0} size="2xl" bold m={0} color="#10b981">
                    3{" "}
                  </Text>
                  <Text p={0} size="2xl" bold m={0} color="#10b981">
                    days
                  </Text>
                </HStack>
                <Text m={0} p={0} size="md" bottom={6}>
                  streak
                </Text>
              </VStack>
            </HStack>
          </DashboardTile>

          <DashboardTile
            variant="secondary"
            navigate={"StressRelief" as keyof MainDrawerParams}
          >
            <HStack justifyContent="center" alignItems="center" gap={6}>
              <Ionicons size={40} name={"fitness-outline"} color={"white"} />
              <VStack justifyContent="center">
                <HStack>
                  <Text p={0} size="2xl" bold m={0} color="white">
                    8.5{" "}
                  </Text>
                  <Text p={0} size="2xl" m={0} color="white">
                    / 10{" "}
                  </Text>
                </HStack>
                <HStack justifyContent="center" alignItems="center">
                  <Ionicons size={18} name={"sad-outline"} color={"white"} />
                  <Text color="white" ml={4}>
                    under stress
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </DashboardTile>
        </HStack>
      </VStack>
      <HStack top={8} justifyContent="space-between" alignItems="center">
        <Heading color="#10b981">Your progress</Heading>
        <HStack>
          <Text
            textDecorationLine="underline"
            color="#10b981"
            size={"md"}
            mr={4}
            top={2}
          >
            About aChive
          </Text>
          <Ionicons
            size={24}
            name={"information-circle-outline"}
            color={"#10b981"}
          />
        </HStack>
      </HStack>

      <View flex={1}>
        <Carousel
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 51,
          }}
          loop
          width={width - 6}
          pagingEnabled={true}
          data={[1, 2]}
          renderItem={({ item }) => {
            if (item === 1) {
              return (
                <DashboardChartTile title={"Week statistics"}>
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
                        {
                          data: [3, 2, 4, 5, 3, 4, 2], // Example stress data
                          color: (opacity = 1) =>
                            `rgba(255, 183, 77, ${opacity})`, // Optional - specify a different custom color for this dataset
                        },
                      ],
                    }}
                    width={Dimensions.get("window").width - 20}
                    height={250}
                    yAxisSuffix=" meals"
                    yAxisInterval={1}
                    chartConfig={{
                      backgroundColor: "white",
                      backgroundGradientFrom: "white",
                      backgroundGradientTo: "white",
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(16, 185, 129, ${opacity})`,
                      propsForDots: {
                        r: "6",
                      },
                    }}
                    style={{
                      marginVertical: 8,
                    }}
                  />
                </DashboardChartTile>
              );
            } else if (item === 2) {
              return (
                <DashboardChartTile title={"That's how you are commited!"}>
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
                </DashboardChartTile>
              );
            } else {
              return <Text>No data </Text>;
            }
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
