import { HStack, Text } from "@chakra-ui/react";

interface PriceProps {
  amount: number;
  color?: string;
}

export const Price = ({ amount, color }: PriceProps) => {
  return (
    <HStack spacing={5}>
      <Text fontSize="1.5rem" fontWeight="extrabold">
        Final Price is:
      </Text>
      <Text fontSize="2rem" fontWeight="semibold" color={color} as="em">
        {amount.toFixed(2) + " €"}
      </Text>
    </HStack>
  );
};
