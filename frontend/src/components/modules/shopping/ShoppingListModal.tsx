import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  EditIcon,
  HStack,
  TrashIcon,
  View,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "components/form";
import { AppModal } from "components/general/AppModal";
import React, { FC, useEffect } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { ShoppingListItem as ShoppingListItemType } from "gql/graphql";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (newItem: ShoppingListItemType) => void;
  onEdit: (editedItem: ShoppingListItemType) => void;
  onDelete: (id: string) => void;
  selectedItem?: ShoppingListItemType;
};

export const validationSchema = z.object({
  _id: z.string(),
  name: z.string(),
  quantity: z.string(),
  unit: z.string(),
});

type FormDataType = z.infer<typeof validationSchema>;

export const ShoppingListModal: FC<Props> = ({
  open,
  onClose,
  onAdd,
  selectedItem,
  onDelete,
  onEdit,
}) => {
  const generateRandomID = () => {
    let result = "";
    const characters = "0123456789abcdef";
    const charactersLength = characters.length;
    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const formContext = useForm<FormDataType>({
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    const defaultValues: Partial<FormDataType> = {
      _id: selectedItem ? selectedItem._id : "",
      name: selectedItem ? selectedItem.itemName : "",
      quantity: selectedItem ? String(selectedItem.quantity) : "",
      unit: selectedItem ? selectedItem.unit : "",
    };

    formContext.reset(defaultValues);
  }, [selectedItem, formContext.reset]);

  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    const { name, quantity, unit } = values;
    try {
      if (selectedItem) {
        onEdit({
          _id: selectedItem._id,
          itemName: name,
          quantity: Number(quantity),
          unit,
          checked: false,
        });
      } else {
        onAdd({
          _id: generateRandomID(),
          itemName: name,
          quantity: Number(quantity),
          unit,
          checked: false,
        });
      }

      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const onError: SubmitErrorHandler<FormDataType> = (errors, e) => {
    console.log(errors);
  };

  const onPress = formContext.handleSubmit(onSubmit, onError);

  return (
    <AppModal title="Add item" open={open} onClose={onClose}>
      <View flex={1}>
        <FormProvider {...formContext}>
          <FormInput name="name" placeholder="Name (eg. Chive)" />
          <HStack flex={1} w={"100%"} gap={10} mb={10}>
            <View flex={2}>
              <FormInput name="quantity" placeholder="Qunatity" />
            </View>
            <View flex={3}>
              <FormInput name="unit" placeholder="Unit (kg, l, pcs...)" />
            </View>
          </HStack>

          {selectedItem ? (
            <HStack flex={1} gap={6} w={"100%"}>
              <View flex={1}>
                <Button
                  onPress={() => onDelete(selectedItem._id)}
                  action="secondary"
                >
                  <ButtonIcon as={TrashIcon} mr={4} />
                  <ButtonText>Delete</ButtonText>
                </Button>
              </View>
              <View flex={1}>
                <Button onPress={onPress}>
                  <ButtonIcon as={EditIcon} mr={4} />
                  <ButtonText>Save</ButtonText>
                </Button>
              </View>
            </HStack>
          ) : (
            <Button onPress={onPress}>
              <ButtonIcon as={AddIcon} mr={4} />
              <ButtonText>Add</ButtonText>
            </Button>
          )}
        </FormProvider>
      </View>
    </AppModal>
  );
};
