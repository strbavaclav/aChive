import { Alert, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
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
import { ProfileEditActionSheet } from "components/modules/profile/ProfileEditActionSheet";
import { OptionType } from "components/form/FormSelect";
import { AppAlertDialog } from "components/general/AppAlertDialog";
import { useTranslation } from "react-i18next";

export type EditedDataType = {
  label: string;
  name: string;
  initialData?: string | number;
  formType?: string;
  options?: OptionType[];
  ruler: {
    unit?: string;
    step?: number;
    max?: number;
    min?: number;
  };
};

const ProfileScreen = () => {
  const { t } = useTranslation();

  const { appState, refetchUserData } = useApp();

  const [editedData, setEditedData] = useState<EditedDataType | undefined>(
    undefined
  );

  const [alertOpen, setAlertOpen] = useState(false);
  const userData = appState.userData;

  const handleRefresh = async () => {
    try {
      await refetchUserData();
    } catch (error) {
      Alert.alert("Error", "Failed to refresh profile data.");
    }
  };

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
          {t("profile.editByTouch")}
        </Text>
      </View>

      <VStack gap={10}>
        <Heading size="sm"> {t("profile.aboutMe")}</Heading>

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
          <ProfileItem
            name="username"
            title={t("profile.username")}
            data={userData?.username}
            onEdit={setEditedData}
            formType="string"
          />
          <Divider />
          <ProfileItem
            name="firstName"
            title={t("profile.firstName")}
            data={userData?.firstName}
            onEdit={setEditedData}
            formType="string"
          />
          <Divider />
          <ProfileItem
            name="lastName"
            title={t("profile.lastName")}
            data={userData?.lastName}
            onEdit={setEditedData}
            formType="string"
          />
          <Divider />
          <ProfileItem
            name="gender"
            title={t("profile.gender")}
            data={userData?.gender}
            onEdit={setEditedData}
            formType="select"
            options={[
              { value: "Male", label: t("gender.Male") },
              { value: "Female", label: t("gender.Female") },
              { value: "Other", label: t("gender.Other") },
            ]}
          />
          <Divider />
          <ProfileItem
            name="bornDate"
            title={t("profile.bornDate")}
            data={moment(Number(userData?.bornDate)).format("YYYY-MM-DD")}
            onEdit={setEditedData}
            formType="date"
          />
        </VStack>

        <Heading size="sm"> {t("profile.myBody")}</Heading>

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
          <ProfileItem
            name="body.height"
            title={t("profile.height")}
            data={userData?.body?.height}
            onEdit={setEditedData}
            formType="number"
            unit={"cm"}
            max={240}
            min={0}
            step={0.5}
          />
          <Divider />
          <ProfileItem
            name="body.weight"
            title={t("profile.weight")}
            data={userData?.body?.weight}
            onEdit={setEditedData}
            formType="number"
            unit={"kg"}
            max={160}
            min={0}
            step={0.1}
          />
        </VStack>

        <Heading size="sm"> {t("profile.contact")}</Heading>

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
          <ProfileItem
            name="email"
            title={t("profile.email")}
            data={userData?.email}
            formType="string"
          />
        </VStack>

        <Heading size="sm"> {t("profile.goals")}</Heading>

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
          <ProfileItem
            name="eatHabitGoal"
            title={t("profile.eatingGoal")}
            data={userData?.eatHabitGoal}
            onEdit={setEditedData}
            formType="select"
            options={[
              { label: t("eatingGoal.more"), value: "more" },
              { label: t("eatingGoal.less"), value: "less" },
              { label: t("eatingGoal.consistent"), value: "consistent" },
            ]}
          />
        </VStack>

        <Heading size="sm"> {t("profile.changePlans")}</Heading>
        <HStack gap={6} marginHorizontal={8}>
          <Button
            flex={1}
            onPress={() =>
              Alert.alert("This feature is not implemented yet 🥺!")
            }
          >
            <ButtonText size="sm">{t("profile.changeEatingPlan")}</ButtonText>
          </Button>
          <Button
            flex={1}
            onPress={() =>
              Alert.alert("This feature is not implemented yet 🥺!")
            }
          >
            <ButtonText textAlign="center" size="sm">
              {t("profile.changeShoppingPlan")}
            </ButtonText>
          </Button>
        </HStack>
        <Heading size="sm" color="#cc0000">
          {t("profile.dangeZone")}
        </Heading>
        <VStack gap={6} marginHorizontal={8}>
          <Text textAlign="justify">
            {t("profile.deleteAllRecordsDescription")}
          </Text>

          <Button
            flex={1}
            action="negative"
            backgroundColor="#cc0000"
            onPress={() => setAlertOpen(true)}
          >
            <ButtonText>{t("profile.deleteAllRecords")}</ButtonText>
          </Button>
        </VStack>
      </VStack>
      <ProfileEditActionSheet
        editedData={editedData}
        onClose={() => setEditedData(undefined)}
        onRefresh={handleRefresh}
      />
      <AppAlertDialog
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onSubmit={() => Alert.alert("This feature is not implemented yet 🥺!")}
        title={t("profile.deleteAllRecords")}
        description={t("profile.deleteAllRecordsAlert")}
        submitTitle={t("profile.earseData")}
      />
    </ScrollView>
  );
};

export default ProfileScreen;
