import { Text } from '@chakra-ui/react';

interface TitleProps {
  text: string;
  size?: string;
  fontWeight?: string;
  color?: string;
}

export const Title = ({ text, size, fontWeight, color }: TitleProps) => {
  return (
    <Text
      fontSize={size || '1rem'}
      fontWeight={fontWeight || 'normal'}
      color={color || 'black'}
    >
      {text}
    </Text>
  );
};