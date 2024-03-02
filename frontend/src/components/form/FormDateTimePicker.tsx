import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@gluestack-ui/themed";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  name: string;
  disabled?: boolean;
  hideErrors?: boolean;
  label?: string;
  required?: boolean;
  description?: string;
  mode?: "date" | "time";
};

export const FormDateTimePicker: FC<Props> = (props) => {
  const {
    name,
    mode,
    disabled,
    hideErrors,
    label,
    required,
    description,

    ...rest
  } = props;
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <FormControl isDisabled={disabled} isRequired={required}>
            <FormControlLabel left={10}>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>

            <DateTimePicker
              id={name}
              onChange={(value) =>
                onChange(new Date(value.nativeEvent.timestamp!))
              }
              value={value}
              accentColor="#10b981"
              mode={mode}
              disabled={disabled}
              {...rest}
            />

            {!!error && (
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
            )}
          </FormControl>
        )}
      />
    </>
  );
};
