import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Textarea,
  TextareaInput,
  View,
} from "@gluestack-ui/themed";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  onFocus?: () => void;
};

export const FormTextArea: FC<Props> = ({
  label,
  placeholder,
  helperText,
  name,
  disabled,
  onFocus,
}) => {
  const { control } = useFormContext();

  return (
    <View flex={1}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl w={"100%"} flex={1}>
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
            <Textarea isDisabled={disabled}>
              <TextareaInput
                onFocus={onFocus}
                role="note"
                placeholder={placeholder}
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            </Textarea>
            <FormControlHelper>
              <FormControlHelperText>{helperText}</FormControlHelperText>
            </FormControlHelper>
          </FormControl>
        )}
      />
    </View>
  );
};
