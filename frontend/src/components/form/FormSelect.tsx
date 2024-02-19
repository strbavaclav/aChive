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

type Props = {
  name: string;
  label?: string;
  options: string[];
  placeholder?: string;
  errorLabel?: string;
  helperLabel?: string;
};

export const FormSelect: FC<Props> = (props) => {
  const {
    name,
    label,
    options,
    placeholder,
    errorLabel,
    helperLabel,

    ...rest
  } = props;

  const { control } = useFormContext();

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
              onValueChange={(value) => onChange(value)}
              isInvalid={!!error}
            >
              <SelectTrigger w={"100%"}>
                <SelectInput
                  id={name}
                  placeholder={placeholder}
                  value={value}
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
                      key={`${option}_i`}
                      label={option}
                      value={option}
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
                  {" "}
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
