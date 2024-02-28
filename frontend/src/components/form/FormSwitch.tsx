import {
  HStack,
  Text,
  Switch,
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
} from "@gluestack-ui/themed";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  name: string;
};

export const FormSwitch: FC<Props> = ({ label, name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>{label}</FormControlLabelText>
          </FormControlLabel>

          <Switch
            size="md"
            value={value}
            onToggle={(value) => onChange(value)}
          />

          {/* {!!error && (
            <FormControlHelper id={`${name}_helperText`}>
              <FormControlHelperText color="#cc0000">
                {" "}
                {error.message}
              </FormControlHelperText>
            </FormControlHelper>
          )}

          {description && (
            <FormControlHelper id={`${name}_helperText`}>
              <FormControlHelperText> {description}</FormControlHelperText>
            </FormControlHelper>
          )} */}
        </FormControl>
      )}
    />
  );
};
