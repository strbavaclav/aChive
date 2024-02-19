import {
  Box,
  FavouriteIcon,
  HStack,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RulerPicker } from "react-native-ruler-picker";
import { Dimensions } from "react-native";

type Props = {
  name: string;
  label: string;
};

export const FormSlider: FC<Props> = (props) => {
  const {
    name,
    label,

    ...rest
  } = props;
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Text size="xs">Slide the knob to select the level of stress</Text>
            <HStack w={"100%"} justifyContent="center" alignItems="center">
              <Slider
                w={"85%"}
                mt={20}
                minValue={0}
                maxValue={10}
                step={1}
                sliderTrackHeight={5}
                size="md"
                value={value}
                onChange={(value) => onChange(value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  alignItems="center"
                  justifyContent="center"
                  width={30}
                  height={25}
                >
                  <Icon as={FavouriteIcon} color="white" size="md" />
                </SliderThumb>
              </Slider>
            </HStack>
            <HStack w={"100%"} justifyContent="space-between">
              <Text>Stressful</Text>
              <Text bold>{value}</Text>
              <Text>Peaceful</Text>
            </HStack>
          </>
        )}
      />
    </>
  );
};
