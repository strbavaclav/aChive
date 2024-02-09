import {
  EyeIcon,
  EyeOffIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "@gluestack-ui/themed";
import { t } from "i18next";
import React, { ReactNode, FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  hideErrors?: boolean;
  label?: string;
  required?: boolean;
  description?: string;
  suffixIcon?: ReactNode;
  secret?: boolean;
};

export const FormInput: FC<Props> = (props: Props) => {
  const {
    name,
    placeholder,
    disabled,
    hideErrors,
    label,
    required,
    description,
    suffixIcon,
    secret,

    ...rest
  } = props;
  const { control } = useFormContext();

  const [showContent, setShowContent] = useState(false);

  const handleShowContent = () => {
    setShowContent((showContent) => {
      return !showContent;
    });
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { error },
        }) => (
          <FormControl isDisabled={disabled} isRequired={required}>
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
            <>
              <Input size="md" width={"100%"} isInvalid={!!error}>
                <InputField
                  id={name}
                  ref={ref}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  type={!showContent && secret ? "password" : "text"}
                  autoCapitalize={"none"}
                  {...rest}
                />
                {secret && (
                  <InputSlot width={"$1/6"} onPress={handleShowContent}>
                    <InputIcon size="md">
                      {showContent ? (
                        <EyeOffIcon color="grey" />
                      ) : (
                        <EyeIcon color="$grey" />
                      )}
                    </InputIcon>
                  </InputSlot>
                )}
              </Input>
              {suffixIcon}
            </>

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
