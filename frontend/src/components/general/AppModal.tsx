import React, { FC, ReactNode } from "react";
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { CloseIcon } from "@gluestack-ui/themed";

type Props = {
  title: string;
  open?: boolean;
  children: ReactNode;
  buttonTitle: string;
  onClose?: () => void;
  onSubmit?: () => void;
};

const AppModal: FC<Props> = ({
  open,
  onClose,
  title,
  children,
  buttonTitle,
  onSubmit,
}) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{title}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button size="sm" borderWidth="$0" onPress={onSubmit}>
            <ButtonText>{buttonTitle}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
