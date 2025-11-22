import { createTheme, MantineColorsTuple } from '@mantine/core';

const pumpGreen: MantineColorsTuple = [
  '#f0fdf4',
  '#dcfce7',
  '#bbf7d0',
  '#86efac',
  '#4ade80',
  '#22c55e',
  '#16a34a',
  '#15803d',
  '#166534',
  '#14532d'
];

export const theme = createTheme({
  primaryColor: 'pumpGreen',
  colors: {
    pumpGreen,
  },
  fontFamily: 'Inter, sans-serif',
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
        color: 'pumpGreen', // Background color matches PUMP.CLONE font color
        c: 'white', // White text for contrast on green background
        fw: 700,
      },
      styles: {
        root: {
          '&[data-variant="filled"]': {
            backgroundColor: 'var(--mantine-color-pumpGreen-5)', // Use brighter green shade
          },
        },
      },
    },
    Card: {
        defaultProps: {
            bg: 'dark.7',
            c: 'white',
        }
    }
  },
});
