import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  padding: ${({ theme }) => theme.sizes.medium}px
    ${({ theme }) => theme.sizes.medium}px 0;
`;

export const MoviesFlatList = styled.FlatList`
  flex: 1;
  flex-grow: 1;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.red[400]};
  font-weight: bold;
`;

export const Movie = styled.TouchableOpacity`
  padding: ${RFValue(16)}px 0;
`;

export const MovieTitleContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  padding: ${({ theme }) => theme.sizes.small}px
    ${({ theme }) => theme.sizes.medium}px
    ${({ theme }) => theme.sizes.medium}px;
  background-color: ${({ theme }) => theme.colors.gray[500]};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const MovieTitle = styled.Text`
  font-weight: bold;
  font-size: ${({ theme }) => theme.sizes.medium}px;

  color: ${({ theme }) => theme.colors.white};
`;

export const Image = styled.Image`
  height: 250px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
