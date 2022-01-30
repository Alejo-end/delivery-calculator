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
import { FormInput } from "./components/FormInput";
import useDebounce from "./hooks/useDebounce";
import { Logo } from "./components/Logo";
import { Footer } from "./components/Footer";

//Friday Rush Multiplier Toast
const toast = createStandaloneToast();
const id = "toast";

const calculateFinalPrice = (
  cartValue: number,
  deliveryDistance: number,
  cartQty: number,
  deliveryDate: Date
): number => {
  let finalPrice = cartValue;

  // Cart value surcharge for 10 euros.
  let surcharge = 0;
  if (cartValue < 10.0) surcharge = 10 - cartValue;

  // Distance delivery surcharge.
  let deliveryFee = 0.0;
  if (deliveryDistance < 1000) deliveryFee += 2;
  if (deliveryDistance >= 1000)
    deliveryFee += Math.ceil(deliveryDistance / 500);

  // Items quantity surcharge.
  let qtyFee = cartQty >= 5 ? 0.5 * (cartQty - 4) : 0;

  // Total fee sum
  deliveryFee += qtyFee + surcharge;

  // Date surcharge for the Friday Rush.
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

  // Delivery fee can't be more than 15 euros.
  deliveryFee = Math.min(15, deliveryFee);
  finalPrice += deliveryFee;

  if (cartQty === 0 && deliveryDistance === 0 && cartValue === 0) {
    finalPrice = 0;
  }

  return finalPrice;
};

export const App = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [cartQty, setCartQty] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());

  const [debouncedCartValue] = useDebounce(cartValue, 600);
  const [debouncedCartQty] = useDebounce(cartQty, 600);
  const [debouncedDeliveryDistance] = useDebounce(deliveryDistance, 600);

  // Using useDebounce to avoid unnecessary re-renders.
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

  // Handling events from input components.
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
      if (!toast.isActive(id)) {
        toast({
          title: "📅 Delivery date cannot be less or equal to this moment",
          id,
          status: "error",
          isClosable: true,
          duration: 5000,
          position: "top",
          variant: "solid",
        });
      }
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
              <FormInput
                text="Cart Value"
                placeholderText="Enter the food price..."
                sign="💶"
                onChange={handleCartValueChange}
                inputType="number"
                label="Cart Value"
              />
              <FormInput
                text="Delivery Distance"
                placeholderText="Distance in meters..."
                sign="🛣️"
                onChange={handleDeliveryDistanceChange}
                inputType="number"
                label="Delivery Distance"
              />
              <FormInput
                text="Amount of Items"
                placeholderText="4 items for free!"
                onChange={handleCartQtyChange}
                sign="🛍️"
                inputType="number"
                label="Amount of Items"
              />
              <FormInput
                text="Time"
                placeholderText="When's the delivery?"
                sign="📅"
                inputType="datetime-local"
                onChange={handleDeliveryDateChange}
                label="Delivery Time"
              />
              <Price amount={finalPrice} color="#009de0" />
            </BaseCard>
          </VStack>
          <Footer />
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
