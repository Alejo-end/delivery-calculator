import {
  Input,
  HStack,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

interface FormInputProps {
  label: string;
  func?: string;
  inputType?: string;
  placeholderText?: string;
  sign?: string;
  regex?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const FormInput = ({
  label,
  placeholderText,
  sign,
  regex,
  inputType,
  onChange,
}: FormInputProps) => {
  return (
    <FormControl>
      <HStack padding={5} w="full">
        <FormLabel
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="bold"
          color="currentcolor"
          textAlign="left"
        >
          {label}
        </FormLabel>
        <InputGroup>
          <Input
            variant="flushed"
            placeholder={placeholderText}
            aria-label={label}
            colorScheme="#009de0"
            type={inputType}
            pattern={regex}
            onChange={onChange}
          />
          <InputRightElement
            pointerEvents="none"
            color="gray.400"
            fontSize="1.2em"
            children={sign}
          />
        </InputGroup>
      </HStack>
    </FormControl>
  );
};
