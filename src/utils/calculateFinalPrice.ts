import { createStandaloneToast } from "@chakra-ui/react";

//Friday Rush Multiplier Toast
const toast = createStandaloneToast();
const id = "toast";

export const calculateFinalPrice = (
  cartValue: number,
  deliveryDistance: number,
  cartQty: number,
  deliveryDate: Date
): number => {
  // Discarting negative values
  if (cartValue < 0 || deliveryDistance < 0 || cartQty < 0) {
    if (!toast.isActive(id)) {
      toast({
        title: "Values cannot be negative",
        id,
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "top",
        variant: "solid",
      });
    }
    return (cartValue = 0);
  }

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
