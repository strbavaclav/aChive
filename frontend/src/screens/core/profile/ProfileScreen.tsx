import { Alert, TouchableOpacity } from "react-native";
import React from "react";
import { useApp } from "context/appContext";
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  VStack,
  View,
  Text,
  Divider,
  ScrollView,
} from "@gluestack-ui/themed";
import { ProfileItem } from "components/modules/profile/ProfileItem";
import moment from "moment";
import { Image } from "@gluestack-ui/themed";

const ProfileScreen = () => {
  const { appState } = useApp();

  const userData = appState.userData;

  return (
    <ScrollView m={6} contentContainerStyle={{ justifyContent: "center" }}>
      <View width={"100%"} alignItems="center">
        <Image
          w={210}
          h={210}
          source={require("../../../assets/images/profile.png")}
          resizeMode="contain"
          alt="about"
        />
        <Text size="sm" color="gray">
          Edit by touching the info tile
        </Text>
      </View>

      <VStack gap={10}>
        <Heading size="sm">About me</Heading>

        <VStack
          p={6}
          backgroundColor="white"
          borderRadius={8}
          style={{
            shadowColor: "black",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <ProfileItem title="Username" data={userData?.username} />
          <Divider />
          <ProfileItem title="First name" data={userData?.firstName} />
          <Divider />
          <ProfileItem title="Last name" data={userData?.lastName} />
          <Divider />
          <ProfileItem title="Gender" data={userData?.gender} />
          <Divider />
          <ProfileItem
            title="Born date"
            data={moment(Number(userData?.bornDate)).format("YYYY-MM-DD")}
          />
        </VStack>

        <Heading size="sm">My body</Heading>

        <VStack
          p={6}
          backgroundColor="white"
          borderRadius={8}
          style={{
            shadowColor: "black",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <ProfileItem title="Height" data={userData?.body?.height + " cm"} />
          <Divider />
          <ProfileItem title="Weight" data={userData?.body?.weight + " kg"} />
        </VStack>

        <Heading size="sm">Contact</Heading>

        <VStack
          p={6}
          backgroundColor="white"
          borderRadius={8}
          style={{
            shadowColor: "black",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <ProfileItem title="Email" data={userData?.email} />
        </VStack>

        <Heading size="sm">Goals</Heading>

        <VStack
          p={6}
          backgroundColor="white"
          borderRadius={8}
          style={{
            shadowColor: "black",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <ProfileItem title="Eating goal" data={userData?.eatHabitGoal} />
        </VStack>

        <Heading size="sm">Plans</Heading>
        <HStack gap={6}>
          <Button flex={1}>
            <ButtonText
              onPress={() => Alert.alert("This will opent Change meals plan.")}
            >
              Change meals
            </ButtonText>
          </Button>
          <Button flex={1}>
            <ButtonText
              onPress={() =>
                Alert.alert("This will open Change shopping plan screen.")
              }
            >
              Change shopping
            </ButtonText>
          </Button>
        </HStack>

        <Heading size="sm" color="#cc0000">
          Danger zone
        </Heading>
        <Text>
          Be careful using this button. The operation is irreversible!
        </Text>

        <Button flex={1} action="secondary" disabled>
          <ButtonText
            onPress={() =>
              Alert.alert("This will open Change shopping plan screen.")
            }
          >
            Delete all records
          </ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default ProfileScreen;
