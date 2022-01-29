import { useCallback, useMemo, useState } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  createStandaloneToast,
  VStack,
} from "@chakra-ui/react";
import { BaseCard } from "./components/BaseCard";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { Price } from "./components/Price";
import { TextInput } from "./components/TextInput";
import useDebounce from "./hooks/useDebounce";
import { Logo } from "./components/Logo";
import { Footer } from "./components/Footer";

//Friday Rush Multiplier Toast
const toast = createStandaloneToast();
const id = "multiplier-toast";

const calculateFinalPrice = (
  cartValue: number,
  deliveryDistance: number,
  cartQty: number,
  deliveryDate: Date
): number => {
  let finalPrice = cartValue;

  // Cart value
  let surcharge = 0;
  if (cartValue < 10.0) surcharge = 10 - cartValue;

  // Delivery fees
  let deliveryFee = 0.0;
  if (deliveryDistance < 1000) deliveryFee += 2;
  if (deliveryDistance >= 1000)
    deliveryFee += Math.ceil(deliveryDistance / 500);

  let qtyFee = cartQty >= 5 ? 0.5 * (cartQty - 4) : 0;

  // Total fee sum
  deliveryFee += qtyFee + surcharge;

  // Date - 5 is friday
  const day = deliveryDate.getUTCDay();
  const hour = deliveryDate.getUTCHours();

  if (day === 5 && hour >= 13 && hour <= 17) {
    deliveryFee *= 1.1;

    if (!toast.isActive(id)) {
      toast({
        id,
        title: "🔥🛵💨 Friday Rush Multiplier!",
        position: "top",
        isClosable: true,
        variant: "solid",
        containerStyle: {
          backgroundColor: "#009de0",
          borderRadius: 10,
        },
      });
    }
  }

  deliveryFee = Math.min(15, deliveryFee);
  finalPrice += deliveryFee;

  return finalPrice;
};

export const App = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [cartQty, setCartQty] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());

  const [debouncedCartValue] = useDebounce(cartValue, 700);
  const [debouncedCartQty] = useDebounce(cartQty, 700);
  const [debouncedDeliveryDistance] = useDebounce(deliveryDistance, 700);

  const finalPrice = useMemo(
    () =>
      calculateFinalPrice(
        debouncedCartValue,
        debouncedDeliveryDistance,
        debouncedCartQty,
        deliveryDate
      ),
    [
      debouncedCartValue,
      debouncedDeliveryDistance,
      debouncedCartQty,
      deliveryDate,
    ]
  );

  const handleCartValueChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      e.target.value && setCartValue(parseInt(e.target.value));
    }, []);

  const handleDeliveryDistanceChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      e.target.value && setDeliveryDistance(parseInt(e.target.value));
    }, []);

  const handleCartQtyChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      e.target.value && setCartQty(parseInt(e.target.value));
    }, []);

  const handleDeliveryDateChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      if (!e.target.value) return;
      const date = new Date(e.target.value);

      const dateTime = date.getTime();
      const nowTime = new Date().getTime();

      if (dateTime - nowTime <= 0)
        alert("Delivery date cannot be less or equal to this moment");

      setDeliveryDate(date);
    }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center">
        <Grid h="100vh">
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={2}>
            <Logo width={90} />
            <Text size="xl">Welcome to the Delivery Fee Calculator</Text>
            <BaseCard>
              <TextInput
                text="Cart Value"
                placeholderText="Enter the food price..."
                sign="💶"
                onChange={handleCartValueChange}
                inputType="number"
              />
              <TextInput
                text="Delivery Distance"
                placeholderText="Distance in meters..."
                sign="🛣️"
                onChange={handleDeliveryDistanceChange}
                inputType="number"
              />
              <TextInput
                text="Amount of Items"
                placeholderText="Up to 4 items for free!"
                onChange={handleCartQtyChange}
                sign="🛍️"
                inputType="number"
              />
              <TextInput
                text="Time"
                placeholderText="When's the delivery?"
                sign="📅"
                inputType="datetime-local"
                onChange={handleDeliveryDateChange}
              />
              <Price amount={finalPrice} />
            </BaseCard>
          </VStack>
          <Footer />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
