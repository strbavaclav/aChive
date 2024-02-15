import {
  EyeIcon,
  EyeOffIcon,
  FormControl,
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
import { Keyboard, TextInput } from "react-native";

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

export const FormInput: FC<Props> = (props) => {
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
                  placeholder={placeholder}
                  onBlur={() => Keyboard.dismiss()}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  type={!showContent && secret ? "password" : "text"}
                  autoCapitalize={"none"}
                  {...rest}
                />
                {secret && (
                  <InputSlot width={"$1/6"} onPress={handleShowContent}>
                    <InputIcon
                      as={showContent ? EyeOffIcon : EyeIcon}
                      color={"grey"}
                      mr={3}
                    ></InputIcon>
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
