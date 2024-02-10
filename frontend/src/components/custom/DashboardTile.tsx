import { Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Box } from "@gluestack-ui/themed";

type Props = {};

const DashboardTile: FC<Props> = () => {
  return (
    <Box
      flex={1}
      backgroundColor="white"
      style={{
        marginVertical: 3,
        borderRadius: 8,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <Text style={{ color: "#10b981" }}>TILE</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default DashboardTile;
