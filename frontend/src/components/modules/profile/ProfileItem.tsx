import { HStack, Text } from "@gluestack-ui/themed";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  title: string;
  data?: string | number;
};

export const ProfileItem: FC<Props> = ({ title, data }) => {
  return (
    <TouchableOpacity style={{ marginVertical: 8, paddingLeft: 10 }}>
      <HStack>
        <Text bold color="#10b981" flex={1}>
          {title}
        </Text>
        <Text flex={2}>{data}</Text>
      </HStack>
    </TouchableOpacity>
  );
};
