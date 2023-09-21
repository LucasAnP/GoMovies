import { RFValue } from 'react-native-responsive-fontsize';

export default {
  colors: {
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6',
    },
    white: '#FFFFFF',
    yellow: '#ffd400',
    red: {
      400: '#ff5757',
      700: '#e43236',
    },
  },
  sizes: {
    zero: RFValue(0),

    /** 1 */
    min: RFValue(1),

    /** 4 */
    smallest: RFValue(4),

    /** 8 */
    small: RFValue(8),

    /** 10 */
    xsmall: RFValue(10),

    /** 12 */
    regular: RFValue(12),

    /** 14 */
    xRegular: RFValue(14),

    /** 16 */
    medium: RFValue(16),

    /** 20 */
    xMedium: RFValue(20),

    /** 24 */
    large: RFValue(24),

    /** 32 */
    xLarge: RFValue(32),

    /** 40 */
    xmLarge: RFValue(40),

    /** 48 */
    xxLarge: RFValue(48),

    /** 56 */
    xxxLarge: RFValue(56),

    /** 64 */
    largest: RFValue(64),
  },
};
