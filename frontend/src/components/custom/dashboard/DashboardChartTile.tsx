import React, { FC, ReactNode } from "react";
import { VStack } from "@gluestack-ui/themed";

type Props = {
  children: ReactNode;
};

export const DashboardChartTile: FC<Props> = ({ children }) => {
  return (
    <VStack
      flex={1}
      justifyContent="center"
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
      {children}
    </VStack>
  );
};
