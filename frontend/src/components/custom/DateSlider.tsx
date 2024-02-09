import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isToday,
  subDays,
} from "date-fns";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

type Props = {};

const DateSlider: FC<Props> = (props) => {
  const dates = eachWeekOfInterval(
    {
      start: subDays(new Date(), 14),
      end: addDays(new Date(), 14),
    },
    { weekStartsOn: 1 }
  ).reduce((acc: Date[][], cur) => {
    const allDays = eachDayOfInterval({ start: cur, end: addDays(cur, 6) });
    acc.push(allDays);
    return acc;
  }, []);

  return (
    <View
      style={{
        height: 60,
        borderTopColor: "#dadedf",
        borderTopWidth: 1,
      }}
    >
      <PagerView style={{ flex: 1, backgroundColor: "white" }} initialPage={2}>
        {dates.map((week, i) => {
          return (
            <View key={i}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginVertical: 5,
                }}
              >
                {week.map((day, i) => {
                  const txt = format(day, "EEEEE");
                  const isTodayDate = isToday(day); // Check if the date is today

                  return (
                    <TouchableOpacity key={i} style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: isTodayDate ? "#10b981" : undefined, // Highlight today's date with a different color
                          fontWeight: isTodayDate ? "bold" : "normal", // Make today's date bold
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
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};

export default DateSlider;
