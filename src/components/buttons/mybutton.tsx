
'use client';
import { extendVariants,Button } from "@nextui-org/react";

export const MyButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants

    isLoading:{
      true: "bg-[#84cc16] text-[#000] opacity-50 cursor-not-allowed",
    },
    color: {
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
      black:" text-[#fff] bg-[#000]",
      white :" text-[#000] bg-[#fff]",
      charcoal:" text-[#fff] bg-[#36454F]",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    size: {
      xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
      md: "px-4 min-w-20 h-10 text-small gap-2 rounded-small",
      xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
    },


  },
  defaultVariants: { // <- modify/add default variants
    color: "olive",
    size: "xl",

  },
  compoundVariants: [ // <- modify/add compound variants
    {
      isDisabled: true,
      color: "olive",
      class: "bg-[#84cc16]/80 opacity-100",
    },
  ],
});