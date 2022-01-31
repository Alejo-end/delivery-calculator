import { useCallback, useMemo, useState } from "react";
import { Text, useToast, VStack } from "@chakra-ui/react";
import { BaseCard, Price, Logo, FormInput } from "../components";
import { useDebounce } from "../hooks/useDebounce";
import { calculateFinalPrice } from "../hooks/calculateFinalPrice";

export const Calculator = () => {
  //Not available date Toast
  const toast = useToast();
  const id = "toast";

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
    useCallback(
      (e) => {
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
      },
      [toast]
    );

  return (
    <VStack spacing={2}>
      <Logo width={90} />
      <Text size="xl">Welcome to the Delivery Fee Calculator</Text>
      <BaseCard>
        <FormInput
          text="Cart Value"
          placeholderText="Enter the cart value in €"
          sign="💶"
          onChange={handleCartValueChange}
          inputType="number"
          label="Cart Value"
        />
        <FormInput
          text="Delivery Distance"
          placeholderText="Enter distance in meters"
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
          text="Delivery Date"
          placeholderText="When's the delivery?"
          sign="📅"
          inputType="datetime-local"
          onChange={handleDeliveryDateChange}
          label="Delivery Time"
        />
        <Price amount={finalPrice} color="#009de0" />
      </BaseCard>
    </VStack>
  );
};
