import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { Footer, ColorModeSwitcher } from "./components";
import { Calculator } from "./views/Calculator";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center">
      <Grid h="100vh">
        <ColorModeSwitcher justifySelf="flex-end" />
        <Calculator />
        <Footer />
      </Grid>
    </Box>
  </ChakraProvider>
);
