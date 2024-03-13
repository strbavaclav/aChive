import { HStack, Text } from "@gluestack-ui/themed";
import { OptionType } from "components/form/FormSelect";
import React, { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { EditedDataType } from "screens/core/profile/ProfileScreen";

type Props = {
  title: string;
  name: string;
  data?: string | number;
  formType?: string;
  options?: OptionType[];
  unit?: string;
  max?: number;
  min?: number;
  step?: number;

  onEdit?: Dispatch<SetStateAction<EditedDataType | undefined>>;
};

export const ProfileItem: FC<Props> = ({
  title,
  name,
  data,
  onEdit,
  formType,
  options,
  unit,
  max,
  min,
  step,
}) => {
  const { t } = useTranslation();

  const onEditHandler = () => {
    if (onEdit) {
      onEdit({
        label: title,
        name: name,
        initialData: data,
        formType: formType,
        options,
        ruler: {
          unit,
          step,
          max,
          min,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      style={{ paddingVertical: 8, paddingLeft: 10 }}
      onPress={onEditHandler}
    >
      <HStack>
        <Text bold color="#10b981" flex={1}>
          {title}
        </Text>
        {name === "eatHabitGoal" ? (
          <Text flex={2}>{t(`eatingGoal.${data}`)}</Text>
        ) : name === "gender" ? (
          <Text flex={2}>{t(`gender.${data}`)}</Text>
        ) : (
          <Text flex={2}>
            {data} {unit ? unit : null}
          </Text>
        )}
      </HStack>
    </TouchableOpacity>
  );
};
