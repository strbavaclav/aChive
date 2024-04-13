import React, { useCallback, useEffect, useState } from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import { ShoppingOnboarding } from "components/modules/shopping/ShoppingOnboarding";
import { useApp } from "context/appContext";
import {
  AddIcon,
  Badge,
  BadgeIcon,
  BadgeText,
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
import { ShoppingListItem as ShoppingListItemType } from "gql/graphql";
import { useSyncShoppingList } from "calls/shopping/useSyncShoppingList";

export const ShoppingListScreen = () => {
  const { appState, refetchUserData } = useApp();

  const [activeShoppingList, setActiveShoppingList] = useState(false);

  const [allItems, setAllItems] = useState<ShoppingListItemType[]>([]);
  const [itemsToBuy, setItemsToBuy] = useState<ShoppingListItemType[]>([]);
  const [itemsGot, setItemsGot] = useState<ShoppingListItemType[]>([]);

  const [dataSections, setDataSections] = useState([]);

  const [selectedItem, setSelectedItem] = useState<
    ShoppingListItemType | undefined
  >(undefined);

  const [showModal, setShowModal] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const { syncShoppingListMutation } = useSyncShoppingList();

  console.log(allItems);

  const {
    loading: loadingShoppingList,
    data: shoppingList,
    refetch: refetchShoppingList,
  } = useQuery(GET_SHOPPING_LIST);

  useEffect(() => {
    if (shoppingList && shoppingList.getShoppingList?.items) {
      setAllItems(shoppingList.getShoppingList.items);
    }
  }, [shoppingList]);

  const syncShoppingList = useCallback(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      syncShoppingListMutation({
        variables: {
          items: allItems.map((item) => {
            return {
              _id: item._id,
              itemName: item.itemName,
              quantity: item.quantity,
              unit: item.unit,
              checked: item.checked,
            };
          }),
        },
      })
        .then(() => refetchShoppingList())
        .catch((error) => Alert.alert("Error syncing data", error.message));
    }, 10000);

    //@ts-ignore
    setDebounceTimeout(timeout);
  }, [allItems, syncShoppingListMutation, refetchShoppingList]);

  useEffect(() => {
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [debounceTimeout]);

  useEffect(() => {
    syncShoppingList();
  }, [allItems]);

  useEffect(() => {
    const itemsToBuy = allItems.filter((item) => !item.checked);
    const itemsGot = allItems.filter((item) => item.checked);

    setItemsToBuy(itemsToBuy);
    setItemsGot(itemsGot);
  }, [allItems]);

  const renderItem = ({
    item,
    index,
  }: {
    item: ShoppingListItemType;
    index: number;
  }) => (
    <ShoppingListItem
      itemName={item.itemName}
      quantity={item.quantity}
      checked={item.checked}
      unit={item.unit}
      onCheck={() => onCheckItem(item._id)}
      onPress={() => onSelectHandler(item)}
    />
  );

  useEffect(() => {
    const sections = [
      {
        count: itemsToBuy.length,
        title: " to get",
        data: itemsToBuy,
        renderItem: renderItem,
        onClear: () =>
          setAllItems((prevState) =>
            prevState.filter((item) => !item.checked === false)
          ),
      },
      {
        count: itemsGot.length,
        title: " already have ",
        data: itemsGot,
        renderItem: renderItem,
        onClear: () =>
          setAllItems((prevState) =>
            prevState.filter((item) => item.checked === true)
          ),
      },
    ];

    //@ts-ignore
    setDataSections(sections);
  }, [itemsToBuy, itemsGot]);

  const onAddItem = (newItem: ShoppingListItemType) => {
    setAllItems((prevState) => [...prevState, newItem]);
  };

  const onCheckItem = (id: string) => {
    setAllItems((prevState) =>
      prevState.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const onSelectHandler = (item: ShoppingListItemType) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const onDeleteHandler = (id: string) => {
    setAllItems((prevState) => prevState.filter((item) => item._id !== id));
    setShowModal(false);
  };

  const onEditHandler = (editedItem: ShoppingListItemType) => {
    setAllItems((prevState) =>
      prevState.map((item) => (item._id === editedItem._id ? editedItem : item))
    );
    setShowModal(false);
  };

  const onCloseHandler = () => {
    setShowModal(false);
  };

  const onOpenHandler = () => {
    setSelectedItem(undefined);
    setShowModal(true);
  };

  //Active shopping list
  useEffect(() => {
    if (appState.userData?.shopping?.prepStartTime) {
      setActiveShoppingList(true);
    }
  }, [appState.userData?.shopping]);

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
                      <Heading color="$primary500">Looks like </Heading>
                      <Heading>there is something to do!</Heading>
                    </VStack>
                  </HStack>
                </View>
              )}
              ListFooterComponent={() => <View style={{ height: 80 }} />}
              renderSectionFooter={() => <View style={{ height: 20 }} />}
              ItemSeparatorComponent={Divider}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section: { title, count, onClear } }) =>
                !loadingShoppingList ? (
                  <>
                    <HStack>
                      <HStack flex={1}>
                        <View flex={1}>
                          <Text color="black" fontWeight="500" ml={8}>
                            <Text color="$primary500" fontWeight="600">
                              {count}
                            </Text>
                            {title}
                          </Text>
                        </View>
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
                    </HStack>
                    <Divider h={1} />
                  </>
                ) : null
              }
              renderItem={({ item, section, index }) => {
                if (loadingShoppingList) return null;
                //@ts-ignore
                return section.renderItem({ item, index });
              }}
            />
          </View>

          <Fab
            size="md"
            placement="bottom right"
            bottom={40}
            right={10}
            onPress={onOpenHandler}
          >
            <FabIcon as={AddIcon} mr="$1" />
            <FabLabel>Add item</FabLabel>
          </Fab>
          <ShoppingListModal
            open={showModal}
            onClose={onCloseHandler}
            onAdd={onAddItem}
            onEdit={onEditHandler}
            selectedItem={selectedItem}
            onDelete={onDeleteHandler}
          />
        </>
      )}
    </DrawerScreenWrapper>
  );
};
