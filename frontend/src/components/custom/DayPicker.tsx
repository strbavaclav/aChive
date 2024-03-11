import { TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { HStack, Text } from "@gluestack-ui/themed";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
};

type Days = {
  en: string;
  cs: string;
  value: number;
};

const days: Days[] = [
  { en: "Mo", cs: "Po", value: 2 },
  { en: "Tu", cs: "Út", value: 3 },
  { en: "We", cs: "St", value: 4 },
  { en: "Th", cs: "Čt", value: 5 },
  { en: "Fr", cs: "Pá", value: 6 },
  { en: "Sa", cs: "So", value: 7 },
  { en: "Su", cs: "Ne", value: 1 },
];

const DayPicker: FC<Props> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => (
        <>
          <HStack gap={4}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={`${index}_${day.value}`}
                onPress={() => {
                  const newValue = value.includes(day.value)
                    ? value.filter((v: number) => v !== day.value)
                    : [...value, day.value];
                  onChange(newValue);
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 40,
                  height: 40,
                  borderWidth: 2,
                  borderColor: "#10b981",
                  padding: 4,
                  borderRadius: 50,
                  backgroundColor: value.includes(day.value)
                    ? "#10b981"
                    : "white",
                }}
              >
                <Text
                  bold={value.includes(day.value) ? true : false}
                  color={value.includes(day.value) ? "white" : "black"}
                >
                  {day.en}
                </Text>
              </TouchableOpacity>
            ))}
          </HStack>
        </>
      )}
    />
  );
};

export default DayPicker;
