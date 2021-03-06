import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '90em',
});

export default extendTheme({
  styles: {
    global: {
      'html, body': {
        background: '#F6F5F1',
        minWidth: '280px',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Josefin Sans, sans-serif',
    body: 'Manrope, sans-serif',
  },
  components: {
    Container: {
      baseStyle: {
        maxWidth: '1440px',
        padding: '0',
        width: '90%',
      },
    },
    Button: {
      baseStyle: {
        rounded: 'full',
        fontFamily: 'Josefin Sans, sans-serif',
        lineHeight: 0,
      },
      defaultProps: {
        colorScheme: 'red',
      },
    },
    FormLabel: {
      baseStyle: {
        fontSize: 'sm',
      },
    },
  },
  breakpoints,
});
