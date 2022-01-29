import { Box, BoxProps, ScaleFade, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface BaseCardProps {
  props?: BoxProps;
  children?: ReactNode;
}

export const BaseCard = ({ children, props }: BaseCardProps) => {
  return (

    <ScaleFade initialScale={0.9} in={true}>
    <Box padding={[6, 8]} borderRadius={14} boxShadow={{ base: 'none', md: 'xl'}} {...props}>
      <VStack align='flex-end'>{children}</VStack>
    </Box>
    </ScaleFade>
  );
};
