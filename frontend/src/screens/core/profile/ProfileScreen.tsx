import { Alert, Text, View } from "react-native";
import React from "react";
import { useApp } from "context/appContext";
import { Button, ButtonText } from "@gluestack-ui/themed";

const ProfileScreen = () => {
  const { appState } = useApp();

  const userData = appState.userData;
  return (
    <View>
      <Text>username: {userData?.username}</Text>
      <Text>firstname: {userData?.firstName}</Text>
      <Text>lastname: {userData?.lastName}</Text>
      <Text>email:{userData?.email}</Text>
      <Text>
        Borned:{JSON.stringify(new Date(parseInt(String(userData?.bornDate!))))}
      </Text>
      <Text>Gender:{userData?.gender}</Text>
      <Text>Goal:{userData?.eatHabitGoal}</Text>
      <Button>
        <ButtonText
          onPress={() => Alert.alert("This will open Change plan screen. NIY")}
        >
          Change plan
        </ButtonText>
      </Button>
      <Text>Edit</Text>
    </View>
  );
};

export default ProfileScreen;
