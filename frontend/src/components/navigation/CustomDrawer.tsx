import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { useApp } from "context/appContext";
import { useAuth } from "context/authContext";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  navigation: DrawerNavigationHelpers;
};
type CustomDrawerItemProps = {
  label: string;
  icon: string;
  navigate?: () => void;
};
const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({
  label,
  icon,
  navigate,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 40,
        marginBottom: 10,
        alignItems: "center",
        paddingLeft: 10,
        borderRadius: 10,
      }}
      onPress={navigate}
    >
      {/*@ts-ignore*/}
      <Ionicons name={icon} size={20} color={"white"} />
      <Text style={{ marginLeft: 15, color: "white", fontSize: 20 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const CustomDrawer: React.FC<Props> = ({ navigation }) => {
  const { onSignOut } = useAuth();
  const { appState } = useApp();
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 10,
        paddingTop: 100,
        overflow: "hidden",
      }}
    >
      <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            marginLeft: 6,
          }}
          onPress={() => navigation.closeDrawer()}
        >
          <Ionicons name={"close"} size={30} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            marginLeft: 6,
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <View
            style={{
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "white",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Ionicons name={"person-outline"} size={35} color={"#10b981"} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              {appState.userData?.firstName}
            </Text>
            <Text style={{ color: "white" }}>
              {t("navigation.viewProfile")}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, marginTop: 20, marginLeft: 6 }}>
          <CustomDrawerItem
            label={t("navigation.dashboard")}
            icon={"home"}
            navigate={() => navigation.navigate("Home")}
          />
          <CustomDrawerItem
            label={t("navigation.stressRelief")}
            icon={"fitness-outline"}
            navigate={() => navigation.navigate("StressRelief")}
          />
          <CustomDrawerItem
            label={t("navigation.shoppingList")}
            icon={"cart"}
            navigate={() => navigation.navigate("Shopping")}
          />
          <CustomDrawerItem
            label={t("navigation.recipes")}
            icon={"bookmarks"}
            navigate={() => navigation.navigate("Cookbook")}
          />

          <CustomDrawerItem
            label={t("navigation.settings")}
            icon={"settings"}
            navigate={() => navigation.navigate("Settings")}
          />
          <CustomDrawerItem
            label={t("navigation.about")}
            icon={"information-circle"}
            navigate={() => navigation.navigate("About")}
          />
          <View
            style={{
              height: 1,
              marginVertical: 10,
              marginLeft: 10,
              backgroundColor: "white",
            }}
          />
          <CustomDrawerItem
            label={t("navigation.signOut")}
            icon={"exit-outline"}
            navigate={onSignOut}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
