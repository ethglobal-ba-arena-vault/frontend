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
        color: 'pumpGreen',
        c: '#000', // Black text on green button for high contrast
        fw: 700,
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
