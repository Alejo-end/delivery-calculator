import { HStack, Text } from '@chakra-ui/react';

interface PriceProps {
  amount: number;
  color?: string;
}

export const Price = ({ amount, color }: PriceProps) => {
  return (
    <HStack>
      <Text fontSize='1rem' fontWeight='medium'>Final Price</Text>
      <Text fontSize='2rem' fontWeight='wide' color={'currentcolor'} as='i'>
        {amount.toFixed(2) + ' €'}
      </Text>
    </HStack>
  );
};
