import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { useAuth } from "context/authContext";
import React from "react";
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

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 10,
        paddingTop: 100,
      }}
    >
      <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            marginLeft: 10,
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
            marginLeft: 10,
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
              Jerry Strba
            </Text>
            <Text style={{ color: "white" }}>View your profile</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, marginTop: 20, marginLeft: 10 }}>
          <CustomDrawerItem
            label={"Dashboard"}
            icon={"home"}
            navigate={() => navigation.navigate("Home")}
          />
          <CustomDrawerItem
            label={"Recipes"}
            icon={"bookmarks"}
            navigate={() => navigation.navigate("Cookbook")}
          />
          <CustomDrawerItem
            label={"Shoping list"}
            icon={"cart"}
            navigate={() => navigation.navigate("Shopping")}
          />
          <CustomDrawerItem label={"Supplies"} icon={"file-tray"} />
          <CustomDrawerItem
            label={"Stress relief"}
            icon={"battery-full-outline"}
          />
          <CustomDrawerItem label={"Settings"} icon={"settings"} />
          <CustomDrawerItem
            label={"About"}
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
            label={"Sign out"}
            icon={"exit-outline"}
            navigate={onSignOut}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
