import { Text, TouchableOpacity } from "react-native";
import React, { FC, ReactNode } from "react";
import { Box, HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainDrawerParams } from "navigation/main";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  navigate?: keyof MainDrawerParams;
};

const DashboardTile: FC<Props> = ({ children, variant, navigate }) => {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParams>>();
  const handlePress = () => {
    if (navigate) {
      navigation.navigate(navigate);
    }
  };

  return (
    <Box flex={1}>
      <TouchableOpacity onPress={handlePress}>
        <Box
          backgroundColor={variant === "secondary" ? "#10b981" : "white"}
          style={{
            borderRadius: 8,
            shadowColor: "black",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default DashboardTile;
