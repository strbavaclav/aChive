import { View, Text } from "react-native";
import React from "react";

type Props = {
  text: string;
};

const EmptyTile = () => {
  return (
    <View>
      <Text>{}</Text>
    </View>
  );
};

export default EmptyTile;
