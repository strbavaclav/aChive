import React from "react";
import { HStack, Icon, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "@gluestack-ui/themed";

const MealPlannerDetailScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <HStack
        backgroundColor="white"
        mt={2}
        paddingVertical={4}
        alignItems="center"
      >
        <Icon as={ChevronLeftIcon} color="#10b981" />
        <Text
          underline
          mr={10}
          color="#10b981"
          onPress={() => navigation.goBack()}
        >
          Go back
        </Text>
      </HStack>
    </View>
  );
};

export default MealPlannerDetailScreen;
