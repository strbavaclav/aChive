import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SizesTable } from "./SizesTable";
import { useTranslation } from "react-i18next";

const TipsAccordion = () => {
  const [tableShow, setTableShow] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Accordion width="100%" type="single" isCollapsible={true}>
        <AccordionItem value="NoMeals">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <HStack alignItems="center">
                    <Text bold size="sm">
                      {t("onboarding.step3.tips.label1")}
                    </Text>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} />
                    )}
                  </HStack>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size="xs">{t("onboarding.step3.tips.value1")}</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="timeMeal">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <HStack alignItems="center">
                    <Text bold size="sm">
                      {t("onboarding.step3.tips.label2")}
                    </Text>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} />
                    )}
                  </HStack>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size="xs">{t("onboarding.step3.tips.value2")}</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sizeMeal">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <HStack alignItems="center">
                    <Text bold size="sm">
                      {t("onboarding.step3.tips.label3")}
                    </Text>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} />
                    )}
                  </HStack>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size="xs">{t("onboarding.step3.tips.value3")}</Text>
            <TouchableOpacity onPress={() => setTableShow(true)}>
              <Text size="xs" bold color="$primary500">
                {t("onboarding.step3.tips.learnMore")}
              </Text>
            </TouchableOpacity>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <SizesTable open={tableShow} onClose={() => setTableShow(false)} />
    </>
  );
};

export default TipsAccordion;
