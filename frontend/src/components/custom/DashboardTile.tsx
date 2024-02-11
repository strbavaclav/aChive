import { Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Box } from "@gluestack-ui/themed";

type Props = {};

const DashboardTile: FC<Props> = ({}) => {
  return (
    <TouchableOpacity style={{ flex: 1 }}>
      <Box
        flex={1}
        backgroundColor="white"
        style={{
          marginVertical: 3,
          borderRadius: 8,
          shadowColor: "black",
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#10b981" }}>TILE</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default DashboardTile;
