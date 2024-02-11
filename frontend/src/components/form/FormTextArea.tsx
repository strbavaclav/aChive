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

type Props = {
  label?: string;
  placeholder?: string;
  helperText?: string;
};

export const FormTextArea: FC<Props> = ({ label, placeholder, helperText }) => {
  return (
    <FormControl w={"100%"}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Textarea>
        <TextareaInput role="note" placeholder={placeholder} />
      </Textarea>
      <FormControlHelper>
        <FormControlHelperText>{helperText}</FormControlHelperText>
      </FormControlHelper>
    </FormControl>
  );
};
