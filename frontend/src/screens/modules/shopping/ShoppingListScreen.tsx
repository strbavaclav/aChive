import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DrawerScreenWrapper from "components/navigation/DrawerScreenWrapper";
import { ShoppingOnboarding } from "components/modules/shopping/ShoppingOnboarding";
import { useApp } from "context/appContext";
import {
  AddIcon,
  Badge,
  BadgeIcon,
  BadgeText,
  CheckIcon,
  CloseIcon,
  Divider,
  Fab,
  FabIcon,
  FabLabel,
  HStack,
  Heading,
  Icon,
  Spinner,
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
import ShoppingListEmpty from "components/modules/shopping/ShoppingListEmpty";
import { useTranslation } from "react-i18next";

const Header = React.memo(() => {
  const { t } = useTranslation();
  const toShopImageSource = useMemo(
    () => require("../../../assets/images/toShop.png"),
    []
  );
  return (
    <View mb={20}>
      <HStack justifyContent="space-between" alignItems="center" gap={20}>
        <Image
          w={130}
          h={130}
          source={toShopImageSource}
          resizeMode="contain"
          alt="toShop"
        />
        <VStack flex={1}>
          <Heading color="$primary500">
            {t("shoppingList.header.title1")}
          </Heading>
          <Heading> {t("shoppingList.header.title2")}</Heading>
        </VStack>
      </HStack>
    </View>
  );
});

export const ShoppingListScreen = () => {
  const { t } = useTranslation();

  const { appState, refetchUserData } = useApp();

  const [activeShoppingList, setActiveShoppingList] = useState<
    boolean | undefined
  >(undefined);

  const [allItems, setAllItems] = useState<ShoppingListItemType[]>([]);

  const [dataSections, setDataSections] = useState([]);

  const [selectedItem, setSelectedItem] = useState<
    ShoppingListItemType | undefined
  >(undefined);

  const [showModal, setShowModal] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean | undefined>(false);
  const [initialized, setInitialized] = useState(false);

  const { syncShoppingListMutation } = useSyncShoppingList();

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
    if (allItems !== shoppingList?.getShoppingList?.items && shoppingList) {
      setIsSyncing(undefined);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        setIsSyncing(true);
        syncShoppingListMutation({
          variables: {
            items: allItems.map(
              ({ _id, itemName, quantity, unit, checked }) => ({
                _id,
                itemName,
                quantity,
                unit,
                checked,
              })
            ),
          },
        })
          .then(() => refetchShoppingList())
          .catch((error) => Alert.alert("Error syncing data", error.message))
          .finally(() => setIsSyncing(false));
      }, 10000);
    }
  }, [allItems, syncShoppingListMutation, refetchShoppingList]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    syncShoppingList();
  }, [allItems]);

  useEffect(() => {
    const itemsToBuy = allItems.filter((item) => !item.checked);
    const itemsGot = allItems.filter((item) => item.checked);

    let sections = [];

    if (itemsToBuy.length > 0) {
      sections.push({
        count: itemsToBuy.length,
        title: t("shoppingList.list.section.toGet"),
        data: itemsToBuy,
        renderItem: ({
          item,
          index,
        }: {
          item: ShoppingListItemType;
          index: number;
        }) => (
          <ShoppingListItem
            key={index}
            itemName={item.itemName}
            quantity={item.quantity}
            checked={item.checked}
            unit={item.unit}
            onCheck={() => onCheckItem(item._id)}
            onPress={() => onSelectHandler(item)}
          />
        ),
        onClear: () =>
          setAllItems((prevState) =>
            prevState.filter((item) => item.checked === true)
          ),
      });
    }

    if (itemsGot.length > 0) {
      sections.push({
        count: itemsGot.length,
        title: t("shoppingList.list.section.have"),
        data: itemsGot,
        renderItem: ({
          item,
          index,
        }: {
          item: ShoppingListItemType;
          index: number;
        }) => (
          <ShoppingListItem
            key={index}
            itemName={item.itemName}
            quantity={item.quantity}
            checked={item.checked}
            unit={item.unit}
            onCheck={() => onCheckItem(item._id)}
            onPress={() => onSelectHandler(item)}
          />
        ),
        onClear: () =>
          setAllItems((prevState) =>
            prevState.filter((item) => item.checked === false)
          ),
      });
    }

    //@ts-ignore
    setDataSections(sections);
  }, [allItems]);

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
    } else {
      setActiveShoppingList(false);
    }
  }, [appState.userData?.shopping]);

  const onFinishOnboarding = async () => {
    try {
      await refetchUserData();
    } catch (error) {
      Alert.alert("Error", "Failed to refresh profile data.");
    }
  };

  if (!activeShoppingList)
    return (
      <DrawerScreenWrapper isBack screenTitle={t("shoppingList.title")}>
        <ShoppingOnboarding onFinish={onFinishOnboarding} />
      </DrawerScreenWrapper>
    );

  return (
    <DrawerScreenWrapper isBack screenTitle={t("shoppingList.title")}>
      {allItems.length > 0 && !loadingShoppingList ? (
        <View marginHorizontal={8} flex={1}>
          <SectionList
            style={{ marginTop: 4 }}
            sections={dataSections}
            ListHeaderComponent={<Header />}
            ListFooterComponent={
              <HStack justifyContent="flex-end">
                {isSyncing === true ? (
                  <HStack justifyContent="center" alignItems="center">
                    <Spinner size={15} />
                    <Text size="sm" italic ml={4}>
                      {t("shoppingList.list.status.syncing")}
                    </Text>
                  </HStack>
                ) : isSyncing === false ? (
                  <HStack justifyContent="center" alignItems="center">
                    <Icon as={CheckIcon} color="$primary500" />
                    <Text size="sm" italic ml={4}>
                      {t("shoppingList.list.status.synced")}
                    </Text>
                  </HStack>
                ) : (
                  <HStack justifyContent="center" alignItems="center">
                    <Icon as={CloseIcon} color="$primary500" />
                    <Text size="sm" italic ml={4}>
                      {t("shoppingList.list.status.notSynced")}
                    </Text>
                  </HStack>
                )}
              </HStack>
            }
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
                            <BadgeText>
                              {t("shoppingList.list.clear")}
                            </BadgeText>
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
      ) : allItems.length < 1 && !loadingShoppingList ? (
        <ShoppingListEmpty />
      ) : (
        <View flex={1} justifyContent="center" alignItems="center">
          <Spinner size={"large"} />
        </View>
      )}

      <Fab
        size="md"
        placement="bottom right"
        bottom={40}
        right={10}
        onPress={onOpenHandler}
      >
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel> {t("shoppingList.list.addItem")}</FabLabel>
      </Fab>
      <ShoppingListModal
        open={showModal}
        onClose={onCloseHandler}
        onAdd={onAddItem}
        onEdit={onEditHandler}
        selectedItem={selectedItem}
        onDelete={onDeleteHandler}
      />
    </DrawerScreenWrapper>
  );
};
