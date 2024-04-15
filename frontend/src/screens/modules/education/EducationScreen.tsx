import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  CloseIcon,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollView,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "@gluestack-ui/themed";
import { useQuery } from "@apollo/client";
import { GET_TIPS } from "calls/tips/useGetTips";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import DefaultTipsCarousel from "components/modules/tips/DefaultTipsCarousel";
import { defaultTips } from "data/mock/defaultTips";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export type EatingHabitTipType = {
  id: string;
  cs: {
    name: string;
    description: string;
    content: string;
  };
  en: {
    name: string;
    description: string;
    content: string;
  };
  date: string;
};

export const EducationScreen = () => {
  const { t } = useTranslation();
  const currentLanguage = i18next.language as "cs" | "en";
  const [selectedTip, setSelectedTip] = useState<
    EatingHabitTipType | undefined
  >(undefined);

  const {
    loading: loadingTips,
    data: tips,
    refetch: refetchTips,
  } = useQuery(GET_TIPS);

  useFocusEffect(
    useCallback(() => {
      refetchTips();
    }, [refetchTips])
  );

  const onSelectHandler = (item: EatingHabitTipType) => {
    setSelectedTip(item);
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VStack
          flex={1}
          gap={10}
          w={"90%"}
          justifyContent="center"
          alignItems="center"
        >
          <HStack flex={1} alignItems="center" justifyContent="space-evenly">
            <Image
              w={150}
              h={150}
              source={require("../../../assets/images/insights.png")}
              resizeMode="contain"
              alt="about"
            />
            <VStack>
              <Heading color="$primary500">{t("tips.header1")}</Heading>
              <Heading>{t("tips.header2")}</Heading>
            </VStack>
          </HStack>
          <View flex={1} justifyContent="center" alignItems="center">
            <Text size="sm" textAlign="justify">
              {t("tips.description")}
            </Text>
          </View>
        </VStack>
        <VStack gap={6} mt={10} flex={1} w={"100%"}>
          <Heading size="sm">{t("tips.earned")}</Heading>
          {tips && tips.getTips && tips.getTips.length < 1 && (
            <VStack flex={1} justifyContent="center" alignItems="center">
              <Image
                w={200}
                h={200}
                source={require("../../../assets/images/results.png")}
                resizeMode="contain"
                alt="about"
              />
              <Text bold>{t("tips.noTitle")}</Text>
              <Text>{t("tips.noDescription")}</Text>
            </VStack>
          )}
          {tips &&
            tips?.getTips &&
            tips?.getTips.map((item: EatingHabitTipType, index: number) => (
              <Box
                key={index}
                style={
                  index === tips?.getTips!.length - 1
                    ? { marginBottom: 10 }
                    : {}
                }
              >
                <Text size="xs" style={{ color: "gray" }}>
                  {moment(item.date)
                    .locale(currentLanguage)
                    .format(t("tips.dateFormat"))}
                </Text>
                <TouchableOpacity onPress={() => setSelectedTip(item)}>
                  <Box
                    style={{
                      backgroundColor: "white",
                      height: 100,
                      borderRadius: 8,
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <HStack
                        justifyContent="center"
                        alignItems="center"
                        gap={10}
                      >
                        <Ionicons
                          name="bulb-outline"
                          size={26}
                          color={"#10b981"}
                        />
                        <VStack>
                          <Text size="lg" style={{ color: "#10b981" }}>
                            {item[currentLanguage].name}
                          </Text>
                          <Text size="sm" style={{ color: "grey" }}>
                            {item[currentLanguage].description}
                          </Text>
                        </VStack>
                      </HStack>
                      <Ionicons
                        name={"chevron-forward-outline"}
                        size={26}
                        color={"#10b981"}
                      />
                    </HStack>
                  </Box>
                </TouchableOpacity>
              </Box>
            ))}
          <Heading size="sm">{t("tips.starting")}</Heading>
          <DefaultTipsCarousel
            data={defaultTips}
            setSelected={onSelectHandler}
          />
        </VStack>
      </ScrollView>

      <Modal
        isOpen={!!selectedTip}
        onClose={() => {
          setSelectedTip(undefined);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">
              {selectedTip && selectedTip[currentLanguage].name}
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="xs">
              {selectedTip && selectedTip[currentLanguage].content}
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack flex={1} justifyContent="flex-end">
              <Button size="sm" onPress={() => setSelectedTip(undefined)}>
                <ButtonText>{t("tips.gotIt")}</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};
