import {
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type Props = {
  name: string;
  label?: string;
};

export const StressSlider: FC<Props> = (props) => {
  const { t } = useTranslation();

  const { name } = props;
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Text size="xs">{t("components.stressFormSlider.label")}</Text>
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
                  <Ionicons
                    name={value > 5 ? "sad-outline" : "happy-outline"}
                    size={20}
                    color={"white"}
                  />
                </SliderThumb>
              </Slider>
            </HStack>
            <HStack w={"100%"} mt={20}>
              <View flex={1} alignItems="flex-start">
                <Text>{t("components.stressFormSlider.peace")}</Text>
              </View>
              <View flex={2} justifyContent="center">
                <VStack justifyContent="center" alignItems="center">
                  <Text bold>{value}</Text>
                  <Text bold>
                    {t(`components.stressFormSlider.value.${value}`)}
                  </Text>
                </VStack>
              </View>
              <View flex={1} alignItems="flex-end">
                <Text>{t("components.stressFormSlider.stress")}</Text>
              </View>
            </HStack>
          </>
        )}
      />
    </>
  );
};
