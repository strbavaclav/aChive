import React, { useCallback, useState } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import MealCarousel from "components/custom/MealCarousel";
import { Meals } from "data/mock/meals";
import {
  FlatList,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewToken,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import MealCard from "components/custom/MealCard";
import { COLORS } from "styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useApp } from "context/appContext";
import i18next from "i18next";
import { featuredMealsFilter } from "utils/featuredMealsFilter";

const CookBookScreen = () => {
  const currentLanguage = i18next.language as "cs" | "en";

  const { t } = useTranslation();

  const [masterData, setMasterData] = useState(Meals);

  const { appState } = useApp();

  const featuredMeals = featuredMealsFilter(
    Meals,
    appState.userData?.plan?.map(
      (each) => each.startTime as unknown as string
    ) || []
  );

  const [filteredData, setFilteredData] = useState(
    Meals.sort((a, b) =>
      a[currentLanguage].name.localeCompare(b[currentLanguage].name)
    )
  );

  const [search, setSearch] = useState("");

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const searchFilter = (text: string) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item[currentLanguage].name
          ? item[currentLanguage].name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.value = vItems;
    },
    []
  );

  return (
    <DrawerScreenWrapper isBack screenTitle={t("navigation.recipes")}>
      <FlatList
        ListHeaderComponent={
          <>
            {!isTyping && (
              <View>
                <Heading color="$primary500" ml={10}>
                  {t("recipes.featuring")}
                </Heading>
                <MealCarousel data={featuredMeals} />

                <View flex={1} justifyContent="center" alignItems="center">
                  <HStack
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    m={6}
                    gap={6}
                  >
                    <View flex={1} justifyContent="center" alignItems="center">
                      <Image
                        source={require("../../../assets/images/recipes.png")}
                        style={{ width: 120, height: 120 }}
                        resizeMode="contain"
                        alt="cookbook"
                      />
                    </View>
                    <VStack flex={2} justifyContent="center" p={10}>
                      <Heading color="grey">
                        {t("recipes.info.preview")}
                      </Heading>
                      <Text>{t("recipes.info.working")}</Text>
                    </VStack>
                  </HStack>
                </View>
              </View>
            )}
            <View
              style={{
                alignItems: "center",
                padding: 10,
                flexDirection: "row",
                width: "100%",
              }}
            >
              {!isTyping && (
                <HStack
                  flex={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Heading color="$primary500" ml={10}>
                    {t("recipes.cookbook")}
                  </Heading>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryColor,
                      padding: 10,
                      marginHorizontal: 5,
                      borderRadius: 30,
                    }}
                    onPress={() => setIsTyping(!isTyping)}
                  >
                    <HStack>
                      <Ionicons name={"search"} size={20} color={"white"} />
                    </HStack>
                  </TouchableOpacity>
                </HStack>
              )}
              {isTyping && (
                <>
                  <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}
                  >
                    <TextInput
                      style={{
                        width: "50%",
                        borderRadius: 250,
                        borderWidth: 1,
                        height: 40,
                        borderColor: COLORS.primaryColor,
                        padding: 10,
                        paddingLeft: 15,
                      }}
                      placeholder={t("recipes.search")}
                      value={search}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => searchFilter(text)}
                      onBlur={() => setIsTyping(false)}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primaryColor,
                      padding: 10,
                      marginHorizontal: 5,
                      borderRadius: 30,
                    }}
                    onPress={() => setIsTyping(false)}
                  >
                    <Ionicons name={"close"} size={20} color={"white"} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        }
        data={filteredData}
        contentContainerStyle={{ paddingTop: 10 }}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item }) => (
          //@ts-ignore
          <MealCard meal={item} viewableItems={viewableItems} />
        )}
      />
    </DrawerScreenWrapper>
  );
};

export default CookBookScreen;
