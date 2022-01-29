import {
  Input,
  HStack,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

interface FormInputProps {
  text: string;
  func?: string;
  inputType?: string;
  placeholderText?: string;
  sign?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export const FormInput = ({
  text,
  placeholderText,
  sign,
  inputType,
  onChange,
  label,
}: FormInputProps) => {
  return (
    <FormControl id={label}>
      <HStack padding={5} w="full">
        <FormLabel
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="bold"
          color="currentcolor"
          textAlign="left"
        >
          {text}
        </FormLabel>
        <InputGroup>
          <Input
          variant="flushed"
            placeholder={placeholderText}
            aria-label={label}
            colorScheme="#009de0"
            type={inputType}
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
