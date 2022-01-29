import { Text, Input, HStack, InputGroup, InputRightElement, } from '@chakra-ui/react';

interface TextInputProps {
  text: string;
  size?: string;
  fontWeight?: string;
  color?: string;
  func?: string;
  inputType?: string;
  placeholderText?: string;
  sign?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const TextInput = ({ text, size, fontWeight, color, placeholderText, sign,inputType, onChange }: TextInputProps) => {
  return (
    <HStack padding={5} w='full'>
    <Text
      fontSize='lg'
      fontWeight='bold'
      color='currentcolor'
      textAlign='left'
    >
      {text}
    </Text>
    <InputGroup>

        <Input placeholder={placeholderText}  variant='flushed' colorScheme='#009de0' type={inputType} onChange={onChange}/>
        <InputRightElement
        pointerEvents='none'
        color='gray.400'
        fontSize='1.2em'
        children={sign}
        />
    </InputGroup>
    </HStack>
  );
};