import { HStack, Heading, Text, View } from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "styles/colors";

type Props = { step: number; instruction: string };
const InstructionStep: React.FC<Props> = ({ step, instruction }) => {
  return (
    <HStack flex={1} gap={10} marginVertical={6}>
      <View flex={1} alignItems="center">
        <Heading size="sm" color="$primary500">
          {step + 1}.
        </Heading>
      </View>
      <View flex={10} mr={10}>
        <Text textAlign="justify">{instruction}</Text>
      </View>
    </HStack>
  );
};

export default InstructionStep;
