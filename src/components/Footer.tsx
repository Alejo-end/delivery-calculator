import { Box, Text, TextProps, Center } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";

export const Footer = (props: TextProps) => (
  <Center>
    <Box
      as="button"
      borderRadius={20}
      bg="#009de0"
      color="white"
      className="footer"
      px={4}
      mt={10}
      h={10}
    >
      <Text fontSize="sm" {...props}>
        Made by{" "}
        <Link
          href="https://alejoend.codes"
          transition={"0.3s"}
          sx={{
            ".footer:hover &": {
              color: "black",
            },
          }}
          isExternal
        >
          Alejandro De León
        </Link>
        {" in " + new Date().getFullYear()}.
      </Text>
    </Box>
  </Center>
);
