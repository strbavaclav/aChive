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
} from "@gluestack-ui/themed";
import { DashboardChartTile } from "components/custom/dashboard/DashboardChartTile";
import DashboardTile from "components/custom/dashboard/DashboardTile";
import { useApp } from "context/appContext";
import { MainDrawerParams } from "navigation/main";
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
    <View flex={1} padding={6}>
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

      <VStack gap={5}>
        <Box w={"100%"} h={100}>
          <DashboardTile
            variant="secondary"
            navigate={"Home" as keyof MainDrawerParams}
          >
            <HStack
              width={"100%"}
              justifyContent="center"
              alignItems="center"
              gap={10}
            >
              <Ionicons
                name={"person-circle-outline"}
                size={70}
                color={"white"}
              />

              <Text style={{ color: "white" }} bold size="xl">
                Hi {appState?.userData?.username}!
              </Text>
            </HStack>
          </DashboardTile>
        </Box>

        <HStack gap={5}>
          <DashboardTile>
            <HStack justifyContent="center" alignItems="center">
              <Icon
                as={ChevronsRightIcon}
                color="#10b981"
                m="$2"
                h={40}
                w={40}
              />
              <VStack>
                <HStack>
                  <Heading color="#10b981">3 </Heading>
                  <Heading color="#10b981">days</Heading>
                </HStack>
                <Text>streak</Text>
              </VStack>
            </HStack>
          </DashboardTile>

          <DashboardTile variant="secondary">
            <VStack justifyContent="center" alignItems="center">
              <Icon as={CloseIcon} color="white" h={40} w={40} />

              <VStack justifyContent="center" alignItems="center">
                <Heading color="white">8.5 / 10 </Heading>
                <Text color="white"> under stress</Text>
              </VStack>
            </VStack>
          </DashboardTile>
        </HStack>
      </VStack>
      <Heading color="#10b981">Your progress</Heading>

      <View flex={1}>
        <Carousel
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          loop
          width={width - 10}
          pagingEnabled={true}
          data={[1, 2]}
          renderItem={({ item }) => {
            if (item === 1) {
              return (
                <DashboardChartTile>
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
                    width={Dimensions.get("window").width - 20}
                    height={200}
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
                </DashboardChartTile>
              );
            } else if (item === 2) {
              return (
                <DashboardChartTile>
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
