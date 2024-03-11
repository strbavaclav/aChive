import React, { FC, ReactNode } from "react";
import { Heading, Text, VStack, View } from "@gluestack-ui/themed";

type Props = {
  children: ReactNode;
  title?: String;
};

export const DashboardChartTile: FC<Props> = ({ children, title }) => {
  return (
    <VStack
      flex={1}
      p={6}
      backgroundColor="white"
      borderRadius={8}
      style={{
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: "center",
      }}
    >
      <Heading color="grey">{title}</Heading>
      <View flex={2}>{children}</View>
      <View flex={1}>
        <Text>Here will be text describing the chart data!</Text>
      </View>
    </VStack>
  );
};
