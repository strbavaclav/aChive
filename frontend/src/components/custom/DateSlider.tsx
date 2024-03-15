import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Icon,
  View,
} from "@gluestack-ui/themed";
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from "date-fns";
import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";

type Props = {
  onDaySelect: Dispatch<SetStateAction<Date>>;
  daySelected: Date;
};

const DateSlider: FC<Props> = ({ onDaySelect, daySelected }) => {
  const dates = eachWeekOfInterval(
    {
      start: subDays(new Date(), 28),
      end: new Date(),
    },
    { weekStartsOn: 1 }
  ).reduce((acc: Date[][], cur) => {
    const allDays = eachDayOfInterval({ start: cur, end: addDays(cur, 6) });
    acc.push(allDays);
    return acc;
  }, []);

  const initialPage = dates.length - 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const pagerViewRef = useRef(null); // Reference to the PagerView

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();

  const goToNextPage = () => {
    if (currentPage < dates.length - 1) {
      //@ts-ignore
      pagerViewRef.current?.setPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      //@ts-ignore
      pagerViewRef.current?.setPage(currentPage - 1);
    }
  };

  return (
    <View
      style={{
        height: 50,
        borderTopColor: "#dadedf",
        borderTopWidth: 1,
        backgroundColor: "white",
      }}
    >
      <PagerView
        style={{ flex: 1, backgroundColor: "white" }}
        initialPage={initialPage}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        ref={pagerViewRef}
      >
        {dates.map((week, i) => {
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                margin: 5,
                gap: 1,
              }}
            >
              {currentPage !== 0 && (
                <TouchableOpacity
                  onPress={goToPreviousPage}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Icon as={ChevronLeftIcon} color="grey" />
                </TouchableOpacity>
              )}
              {week.map((day, i) => {
                const txt = format(day, "EEEEEE");
                const isTodayDate =
                  day.getDate() === todayDate && day.getMonth() === todayMonth;

                return (
                  <TouchableOpacity
                    key={i}
                    style={{
                      alignItems: "center",
                      flex: 1,
                      backgroundColor:
                        daySelected.getDate() === day.getDate() &&
                        daySelected.getMonth() === day.getMonth()
                          ? "#f2f2f2"
                          : "white",
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      // Extract year, month, and day from the selected day
                      const year = day.getFullYear();
                      const month = day.getMonth(); // Note: January is 0, February is 1, etc.
                      const date = day.getDate();

                      // Create a new date object at midnight in the local timezone
                      const localMidnight = new Date(year, month, date);

                      // Adjust for the timezone offset to get to UTC midnight
                      const offset = localMidnight.getTimezoneOffset() * 60000; // Convert offset to milliseconds
                      const utcMidnight = new Date(
                        localMidnight.getTime() - offset
                      );

                      onDaySelect(utcMidnight);
                    }}
                  >
                    <Text
                      style={{
                        color: isTodayDate ? "#10b981" : undefined,
                        fontWeight: isTodayDate ? "bold" : "normal",
                        marginBottom: 5,
                      }}
                    >
                      {txt}
                    </Text>
                    <Text
                      style={{
                        color: isTodayDate ? "#10b981" : "grey",
                      }}
                    >
                      {day.getDate()}
                      {daySelected.getDate() === day.getDate() &&
                      daySelected.getMonth() === day.getMonth()
                        ? `.${day.getMonth() + 1}.`
                        : null}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {currentPage !== dates.length - 1 && (
                <TouchableOpacity
                  onPress={goToNextPage}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Icon as={ChevronRightIcon} color="grey" />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};

export default DateSlider;
