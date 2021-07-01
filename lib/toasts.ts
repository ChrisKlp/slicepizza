import { UseToastOptions } from '@chakra-ui/react';

export type TToasts = {
  add: UseToastOptions;
};

const defaultSettings: UseToastOptions = {
  position: 'top',
  duration: 2000,
  isClosable: false,
};

const toasts: TToasts = {
  add: {
    title: 'Pizza added to cart',
    status: 'success',
    ...defaultSettings,
  },
};

export default toasts;
