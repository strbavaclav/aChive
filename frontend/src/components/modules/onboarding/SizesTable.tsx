import React, { FC } from "react";
import { AppModal } from "components/general/AppModal";
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SizesTable: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <AppModal
      title={t("onboarding.step3.labels.mealSizesExplained")}
      open={open}
      onClose={onClose}
      footer={
        <Button>
          <ButtonText onPress={onClose}>
            {t("onboarding.step3.action.gotIt")}
          </ButtonText>
        </Button>
      }
    >
      <Text>{t("onboarding.step3.text.sizes")}</Text>

      <VStack>
        <HStack m={6}>
          <Text bold flex={1}>
            XS
          </Text>
          <Text flex={1}> - </Text>
          <Text flex={5}>{t("onboarding.step3.text.xs")}</Text>
        </HStack>

        <HStack m={6}>
          <Text bold flex={1}>
            S
          </Text>
          <Text flex={1}> - </Text>
          <Text flex={5}>{t("onboarding.step3.text.s")}</Text>
        </HStack>

        <HStack m={6}>
          <Text bold flex={1}>
            M
          </Text>
          <Text flex={1}> - </Text>
          <Text flex={5}>{t("onboarding.step3.text.m")}</Text>
        </HStack>

        <HStack m={6}>
          <Text bold flex={1}>
            L
          </Text>
          <Text flex={1}> - </Text>
          <Text flex={5}>{t("onboarding.step3.text.l")}</Text>
        </HStack>
      </VStack>
    </AppModal>
  );
};
