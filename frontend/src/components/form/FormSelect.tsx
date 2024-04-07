import {
  AlertCircleIcon,
  ChevronDownIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
} from "@gluestack-ui/themed";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type OptionType = {
  label: string;
  value: string | boolean;
};

type Props = {
  name: string;
  label?: string;
  options: OptionType[];
  placeholder?: string;
  errorLabel?: string;
  helperLabel?: string;
  disabled?: boolean;
};

export const FormSelect: FC<Props> = (props) => {
  const {
    name,
    label,
    options,
    placeholder,
    errorLabel,
    helperLabel,
    disabled,

    ...rest
  } = props;

  const { control } = useFormContext();

  const handleValueChange = (value: string) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
            <Select
              mb={0}
              pb={0}
              isFocusVisible
              onValueChange={(value) => onChange(handleValueChange(value))}
              isInvalid={!!error}
              isDisabled={disabled}
            >
              <SelectTrigger w={"100%"}>
                <SelectInput
                  id={name}
                  placeholder={placeholder}
                  value={
                    options.find((option) => option.value === value)?.label ||
                    ""
                  }
                  {...rest}
                />
                <SelectIcon as={ChevronDownIcon} mr={"$3"} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent pb={40}>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {options.map((option, i) => (
                    <SelectItem
                      key={`${option.value}_${i}`}
                      label={option.label}
                      value={String(option.value)}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlHelper>
              <FormControlHelperText>{helperLabel}</FormControlHelperText>
            </FormControlHelper>
            {!!error && (
              <FormControlHelper id={`${name}_helperText`}>
                <FormControlHelperText color="#cc0000">
                  {error.message}
                </FormControlHelperText>
              </FormControlHelper>
            )}
          </FormControl>
        )}
      />
    </>
  );
};
