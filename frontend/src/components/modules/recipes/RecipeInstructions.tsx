import React, { FC, useState } from "react";
import { Alert } from "react-native";
import { COLORS } from "styles/colors";
import InstructionStep from "./InstructionStep";
import { HStack, Heading, Text, View } from "@gluestack-ui/themed";
import { Switch } from "@gluestack-ui/themed";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useTranslation } from "react-i18next";

type Props = {
  instructions: string[];
};
const RecipeInstructions: FC<Props> = ({ instructions }) => {
  const { t } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      deactivateKeepAwake().then(() => {});
    } else {
      activateKeepAwakeAsync().then(() => {
        Alert.alert(
          `⏲️\n${t("recipes.detail.cookingModeActivated")}`,
          t("recipes.detail.cookingModeDescription")
        );
      });
    }
  };
  return (
    <View m={10}>
      <HStack
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        mb={10}
      >
        <Heading>{t("recipes.detail.instructions")}</Heading>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              color: isEnabled ? COLORS.primaryColor : "grey",
              fontSize: 16,
            }}
          >
            {t("recipes.detail.cookingMode")}
          </Text>
          <Switch
            size="sm"
            trackColor={{ false: "#c2c2c2", true: COLORS.primaryColor }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </HStack>
      {instructions &&
        instructions.map((step, index) => (
          <InstructionStep step={index} instruction={step} key={index} />
        ))}
      <Text style={{ color: "grey", marginTop: 20 }}>
        {t("recipes.detail.instructionsMayDiifer")}
      </Text>
    </View>
  );
};

export default RecipeInstructions;
