import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  name: string;
};

export const FormTextArea: FC<Props> = ({
  label,
  placeholder,
  helperText,
  name,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl w={"100%"}>
          <FormControlLabel>
            <FormControlLabelText>{label}</FormControlLabelText>
          </FormControlLabel>
          <Textarea>
            <TextareaInput
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
  );
};
