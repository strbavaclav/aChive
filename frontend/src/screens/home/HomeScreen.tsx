import { useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Text,
  VStack,
  Heading,
  View,
  CloseIcon,
  Divider,
  Image,
} from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { GET_USER_STATISTICS } from "calls/user/useGetUserStatistics";
import { DashboardChartTile } from "components/custom/dashboard/DashboardChartTile";
import DashboardTile from "components/custom/dashboard/DashboardTile";
import i18next from "i18next";
import moment from "moment";
import "moment/locale/cs";
import { MainDrawerParams } from "navigation/main";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import Carousel from "react-native-reanimated-carousel";

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
  const { t } = useTranslation();
  const currentLanguage = i18next.language;

  const [selectedCommit, setSelectedCommit] = useState<
    | {
        date: string;
        count: number;
      }
    | undefined
  >(undefined);

  const {
    loading: loadingStatistics,
    data: statistics,
    refetch: refetchStatistics,
  } = useQuery(GET_USER_STATISTICS);

  useFocusEffect(
    useCallback(() => {
      refetchStatistics();
    }, [refetchStatistics])
  );

  return (
    <View flex={1} padding={6}>
      <HStack mb={4}>
        <Text bold size="lg">
          {t("dashboard.today")}
        </Text>
        <Text size="lg">
          {moment().locale(currentLanguage).format(t("dashboard.dateFormat"))}
        </Text>
      </HStack>

      <VStack gap={4}>
        <HStack gap={5}>
          <DashboardTile navigate={"Planner" as keyof MainDrawerParams}>
            <HStack justifyContent="center" alignItems="center" gap={6}>
              <Ionicons
                size={40}
                name={
                  statistics?.getStatistics.streak! > 0
                    ? "checkmark-done-outline"
                    : "close-outline"
                }
                color={"#10b981"}
              />
              <VStack>
                <HStack justifyContent="center" alignItems="center">
                  <Text p={0} size="2xl" bold m={0} color="$primary500">
                    {statistics?.getStatistics.streak}{" "}
                  </Text>
                  <Text p={0} size="2xl" bold m={0} color="$primary500">
                    {t("dashboard.streak.days")}
                  </Text>
                </HStack>
                <Text m={0} p={0} size="md" bottom={6}>
                  {t("dashboard.streak.streak")}
                </Text>
              </VStack>
            </HStack>
          </DashboardTile>

          <DashboardTile
            variant="secondary"
            navigate={"Journal" as keyof MainDrawerParams}
          >
            <HStack justifyContent="center" alignItems="center" gap={6}>
              <Ionicons size={40} name={"fitness-outline"} color={"white"} />
              <VStack justifyContent="center">
                <HStack>
                  <Text p={0} size="2xl" bold m={0} color="white">
                    {statistics?.getStatistics.stressAvg}{" "}
                  </Text>
                  <Text p={0} size="2xl" m={0} color="white">
                    / 10
                  </Text>
                </HStack>
                <HStack justifyContent="center" alignItems="center">
                  <Ionicons
                    size={18}
                    name={
                      statistics?.getStatistics.stressAvg! > 5
                        ? "sad-outline"
                        : "happy-outline"
                    }
                    color={"white"}
                  />
                  <Text color="white" ml={4}>
                    {statistics?.getStatistics.stressAvg! > 5
                      ? t("dashboard.stress.underStress")
                      : t("dashboard.stress.happy")}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </DashboardTile>
        </HStack>
        <Box w={"100%"} h={100}>
          <DashboardTile
            variant="secondary"
            navigate={"Profile" as keyof MainDrawerParams}
          >
            <HStack
              width={"100%"}
              justifyContent="space-evenly"
              alignItems="center"
              gap={10}
              m={4}
            >
              <HStack justifyContent="center" alignItems="center">
                <Image
                  w={80}
                  h={80}
                  source={require("../../assets/images/dashboard.png")}
                  resizeMode="contain"
                  alt="about"
                />
              </HStack>

              <Divider orientation="vertical" bgColor="white" w={2} />
              <View>
                <VStack>
                  <Text color="white" bold>
                    {t("dashboard.counter.title")}
                  </Text>
                  <Text color="white">
                    {t("dashboard.counter.meal")}:{" "}
                    {statistics?.getStatistics.records.meal}
                  </Text>
                  <Text color="white">
                    {t("dashboard.counter.stress")}:{" "}
                    {statistics?.getStatistics.records.stress}
                  </Text>
                </VStack>
              </View>
            </HStack>
          </DashboardTile>
        </Box>
      </VStack>
      <HStack top={8} justifyContent="center" alignItems="center">
        <Heading color="$primary500">{t("dashboard.progress")}</Heading>
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
                <DashboardChartTile title={t("dashboard.weekStatistics")}>
                  {statistics &&
                  statistics.getStatistics &&
                  statistics.getStatistics.chart.line &&
                  statistics.getStatistics.chart.line.labels &&
                  statistics?.getStatistics.chart.line?.labels?.length > 0 ? (
                    <>
                      <LineChart
                        data={{
                          labels:
                            statistics?.getStatistics.chart.line?.labels.map(
                              (date) =>
                                moment(date).format(
                                  t("dashboard.dateFormatLine")
                                )
                            ),
                          datasets: [
                            {
                              data: statistics?.getStatistics.chart.line
                                ?.counts!,
                            },
                          ],
                        }}
                        width={Dimensions.get("window").width - 20}
                        height={250}
                        yAxisSuffix={t("dashboard.meals")}
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
                          propsForDots: {
                            r: "6",
                          },
                        }}
                        style={{
                          marginVertical: 8,
                        }}
                      />
                    </>
                  ) : (
                    <View flex={1} justifyContent="center" alignItems="center">
                      <Ionicons
                        size={60}
                        name={"close-outline"}
                        color={"#10b981"}
                      />
                      <Text>{t("dashboard.noData")}</Text>
                    </View>
                  )}
                </DashboardChartTile>
              );
            } else if (item === 2) {
              return (
                <DashboardChartTile title={t("dashboard.commited")}>
                  {statistics &&
                  statistics.getStatistics &&
                  statistics.getStatistics.chart &&
                  statistics.getStatistics.chart.commit &&
                  statistics.getStatistics.chart.commit.length ? (
                    <>
                      <ContributionGraph
                        values={statistics?.getStatistics.chart.commit!}
                        endDate={new Date()}
                        numDays={105}
                        width={Dimensions.get("window").width}
                        height={200}
                        chartConfig={chartConfig}
                        tooltipDataAttrs={(value) => handleToolTip}
                        getMonthLabel={(monthIndex) => {
                          return moment()
                            .month(monthIndex)
                            .locale(currentLanguage)
                            .format("MMMM");
                        }}
                        onDayPress={({ date, count }) =>
                          setSelectedCommit({ date, count })
                        }
                      />
                      <View
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        mt={3}
                      >
                        {selectedCommit ? (
                          <Text>{`${t("dashboard.onDay")} ${moment(selectedCommit.date).locale(currentLanguage).format(t("dashboard.dateFormatCommit"))} ${t("dashboard.uAte")} ${selectedCommit.count}${t("dashboard.meals")}`}</Text>
                        ) : (
                          <Text>Click on the day for details</Text>
                        )}
                      </View>
                    </>
                  ) : (
                    <View flex={1} justifyContent="center" alignItems="center">
                      <Ionicons
                        size={60}
                        name={"close-outline"}
                        color={"#10b981"}
                      />
                      <Text>{t("dashboard.noData")}</Text>
                    </View>
                  )}
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
