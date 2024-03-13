import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  ButtonGroup,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text,
} from "@gluestack-ui/themed";
import { AlertDialogCloseButton } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { AlertDialogHeader } from "@gluestack-ui/themed";
import { AlertDialog, AlertDialogBackdrop } from "@gluestack-ui/themed";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onSubmit: () => void;
  submitTitle?: string;
};

export const AppAlertDialog: FC<Props> = ({
  isOpen,
  title,
  description,
  onClose,
  onSubmit,
  submitTitle,
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">{title}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm">{description}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <Button variant="outline" action="secondary" onPress={onClose}>
              <ButtonText>{t("general.cancel")}</ButtonText>
            </Button>
            <Button bg="$error600" action="negative" onPress={onSubmit}>
              <ButtonText>{submitTitle ?? "Submit"}</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
