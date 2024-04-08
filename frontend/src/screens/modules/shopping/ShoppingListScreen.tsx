import React, { useEffect, useState } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import { ShoppingOnboarding } from "components/modules/shopping/ShoppingOnboarding";
import { useApp } from "context/appContext";
import {
  AddIcon,
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  CloseIcon,
  Divider,
  Fab,
  FabIcon,
  FabLabel,
  HStack,
  Heading,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { ShoppingListItem } from "components/modules/shopping/ShoppingListItem";
import { Image } from "@gluestack-ui/themed";
import { Alert, SectionList, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_SHOPPING_LIST } from "calls/shopping/useGetShoppingList";
import { ShoppingListModal } from "components/modules/shopping/ShoppingListModal";

type ShopItemProps = {
  itemName: string;
  quantity: number;
  unit: string;
  checked: boolean;
};

const renderItem = ({ item }: { item: ShopItemProps }) => (
  <ShoppingListItem
    itemName={item.itemName}
    quantity={item.quantity}
    checked={item.checked}
    unit={item.unit}
    onCheck={() => console.log(`Checked change for ${item.itemName}`)}
  />
);

export const ShoppingListScreen = () => {
  const { appState, refetchUserData } = useApp();

  const [activeShoppingList, setActiveShoppingList] = useState(false);
  const [itemsToBuy, setItemsToBuy] = useState<ShopItemProps[]>([]);
  const [itemsGot, setItemsGot] = useState<ShopItemProps[]>([]);
  const [dataSections, setDataSections] = useState([]);

  const {
    loading: loadingShoppingList,
    error: shoppingListError,
    data: shoppingList,
    refetch: refetchShoppingList,
  } = useQuery(GET_SHOPPING_LIST);

  useEffect(() => {
    if (
      !loadingShoppingList &&
      shoppingList &&
      shoppingList?.getShoppingList?.items
    ) {
      const itemsToBuy = shoppingList?.getShoppingList?.items.filter(
        (item) => !item.checked
      );
      const itemsGot = shoppingList?.getShoppingList?.items.filter(
        (item) => item.checked
      );

      setItemsToBuy(itemsToBuy);
      setItemsGot(itemsGot);
    }
  }, [loadingShoppingList, shoppingList]);

  useEffect(() => {
    if (appState.userData?.shopping?.prepStartTime) {
      setActiveShoppingList(true);
    }
  }, [appState.userData?.shopping]);

  useEffect(() => {
    const sections = [
      {
        count: itemsToBuy.length,
        title: " more items to get",
        data: itemsToBuy,
        renderItem: renderItem,
        onClear: () => setItemsToBuy([]),
      },
      {
        count: itemsGot.length,
        title: " you already have ",
        data: itemsGot,
        renderItem: renderItem,
        onClear: () => setItemsGot([]),
      },
    ];

    //@ts-ignore
    setDataSections(sections);
  }, [itemsToBuy, itemsGot]);

  const onFinishOnboarding = async () => {
    try {
      await refetchUserData();
    } catch (error) {
      Alert.alert("Error", "Failed to refresh profile data.");
    }
  };

  return (
    <DrawerScreenWrapper isBack screenTitle="Shopping list">
      {!activeShoppingList && (
        <ShoppingOnboarding onFinish={onFinishOnboarding} />
      )}
      {activeShoppingList && (
        <>
          <View marginHorizontal={8} flex={1}>
            <SectionList
              style={{ marginTop: 4 }}
              sections={dataSections}
              ListHeaderComponent={() => (
                <View mb={20}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    gap={20}
                  >
                    <Image
                      w={130}
                      h={130}
                      source={require("../../../assets/images/toShop.png")}
                      resizeMode="contain"
                      alt="toShop"
                    />
                    <VStack flex={1}>
                      <Heading color="#10b981">Looks like </Heading>
                      <Heading>there is something to do!</Heading>
                    </VStack>
                  </HStack>
                </View>
              )}
              ListFooterComponent={() => <View style={{ height: 80 }} />}
              renderSectionFooter={() => <View style={{ height: 20 }} />}
              ItemSeparatorComponent={Divider}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section: { title, count, onClear } }) => (
                <>
                  <HStack>
                    <HStack flex={1}>
                      {count > 0 && (
                        <TouchableOpacity onPress={onClear}>
                          <Badge
                            size="sm"
                            variant="outline"
                            borderRadius="$full"
                            action="muted"
                          >
                            <BadgeIcon as={CloseIcon} />
                            <BadgeText>Clear</BadgeText>
                          </Badge>
                        </TouchableOpacity>
                      )}
                    </HStack>
                    <View alignItems="flex-end" flex={1}>
                      <Text color="black" fontWeight="600" ml={8}>
                        <Text color="#10b981" fontWeight="800">
                          {count}
                        </Text>
                        {title}
                      </Text>
                    </View>
                  </HStack>
                  <Divider h={1} />
                </>
              )}
              renderItem={({ item, section }) => {
                //@ts-ignore
                return section.renderItem({ item });
              }}
            />
          </View>

          <Fab
            size="md"
            placement="bottom right"
            bottom={40}
            right={10}
            isHovered={false}
            isDisabled={false}
            isPressed={false}
          >
            <FabIcon as={AddIcon} mr="$1" />
            <FabLabel>Add item</FabLabel>
          </Fab>
          <ShoppingListModal />
        </>
      )}
    </DrawerScreenWrapper>
  );
};
