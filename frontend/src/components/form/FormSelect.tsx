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
  Icon,
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
        render={({ field: { value } }) => (
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
            <Select isFocusVisible>
              <SelectTrigger w={"100%"}>
                <SelectInput placeholder={placeholder} value={value} />
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
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorLabel}</FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />
    </>
  );
};
