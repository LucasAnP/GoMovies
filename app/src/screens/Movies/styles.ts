import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: ${({ theme }) => theme.sizes.medium}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => RFValue(theme.fontSizes.xl)}px;
`;

export const Movie = styled.TouchableOpacity`
  padding: ${RFValue(5)}px 0;
`;
