import React, { FC, useState } from "react";
import {
  Checkbox,
  CheckboxIndicator,
  HStack,
  Text,
  View,
} from "@gluestack-ui/themed";
import { CheckboxIcon } from "@gluestack-ui/themed";
import { CheckIcon } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

type Props = {
  itemName: string;
  quantity: number;
  unit: string;
  checked: boolean;
  onCheck: () => void;
};
export const ShoppingListItem: FC<Props> = ({
  itemName,
  quantity,
  unit,
  checked,
  onCheck,
}) => {
  return (
    <TouchableOpacity>
      <HStack
        m={6}
        marginVertical={8}
        alignItems="center"
        gap={6}
        justifyContent="space-between"
      >
        <View flex={3}>
          <Text fontWeight="500">{itemName}</Text>
        </View>
        <View flex={2}>
          <Text italic>{quantity + " " + unit}</Text>
        </View>
        <View flex={1} alignItems="flex-end">
          <Checkbox
            size="lg"
            value="checked"
            isChecked={checked}
            onChange={onCheck}
            aria-label={`Mark ${itemName} as bought`}
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
          </Checkbox>
        </View>
      </HStack>
    </TouchableOpacity>
  );
};
