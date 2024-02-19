import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isToday,
  subDays,
} from "date-fns";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";

type Props = {
  onDaySelect: Dispatch<SetStateAction<Date>>;
  daySelected: Date;
};

const DateSlider: FC<Props> = ({ onDaySelect, daySelected }) => {
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
        height: 50,
        borderTopColor: "#dadedf",
        borderTopWidth: 1,
        backgroundColor: "white",
      }}
    >
      <PagerView style={{ flex: 1, backgroundColor: "white" }} initialPage={2}>
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
              {week.map((day, i) => {
                const txt = format(day, "EEEEE");
                const isTodayDate = isToday(day);

                return (
                  <TouchableOpacity
                    key={i}
                    style={{
                      alignItems: "center",
                      flex: 1,
                      backgroundColor:
                        daySelected.getDate() === day.getDate()
                          ? "#f2f2f2"
                          : "white",
                      borderRadius: 8,
                    }}
                    onPress={() => onDaySelect(day)}
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
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </PagerView>
    </View>
  );
};

export default DateSlider;
