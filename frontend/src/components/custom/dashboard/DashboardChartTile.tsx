import React, { FC, ReactNode } from "react";
import { Heading, VStack, View } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";

type Props = {
  children: ReactNode;
  title?: String;
};

export const DashboardChartTile: FC<Props> = ({ children, title }) => {
  return (
    <VStack
      flex={1}
      p={6}
      pb={0}
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
      <View flex={1}>{children}</View>

      <Image
        w={"100%"}
        h={140}
        source={require("../../../assets/images/lineChart.png")}
        alt="about"
        opacity={0.4}
        resizeMode="cover"
        resizeMethod="resize"
      />
    </VStack>
  );
};
