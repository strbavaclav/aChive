import { Box, Text, VStack } from "@gluestack-ui/themed";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RulerPicker } from "react-native-ruler-picker";
import { Dimensions } from "react-native";

type Props = {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  unit: string;
  initialValue: number;
};

export const FormRulerPicker: FC<Props> = (props) => {
  const {
    name,
    label,
    min,
    max,
    step,
    unit,
    initialValue,

    ...rest
  } = props;
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <VStack mt={30}>
            <Text>{label}</Text>
            <Box mt={40} justifyContent="center" alignItems="center">
              <RulerPicker
                min={min ? min : 0}
                max={max ? max : 240}
                initialValue={initialValue}
                step={step}
                height={40}
                width={Dimensions.get("window").width - 40}
                valueTextStyle={{ fontSize: 15 }}
                unitTextStyle={{ fontSize: 15 }}
                indicatorHeight={40}
                fractionDigits={1}
                shortStepHeight={10}
                longStepHeight={30}
                stepWidth={4}
                decelerationRate={"normal"}
                indicatorColor="#10b981"
                onValueChange={(number) => onChange(Number(number))}
                unit={unit}
              />
            </Box>
          </VStack>
        )}
      />
    </>
  );
};
