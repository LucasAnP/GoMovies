import { SafeAreaView } from 'react-native-safe-area-context';

import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding-bottom: 0;

  ${({ theme }) => css`
    background-color: ${theme.colors.gray[700]};
    padding: ${theme.sizes.medium}px ${theme.sizes.medium}px 0;
  `}
`;

export const MoviesFlatList = styled.FlatList``;

export const Title = styled.Text`
  font-weight: bold;

  ${({ theme }) => css`
    color: ${theme.colors.gray[100]};
    font-size: ${theme.sizes.xMedium}px;
    margin-bottom: ${theme.sizes.medium}px;
  `}
`;

export const PaginationLoading = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    width: ${theme.sizes.xxLarge}px;
    height: ${theme.sizes.xxLarge}px;
    padding: ${theme.sizes.large}px;
    border-radius: ${theme.sizes.small}px;
    background-color: ${theme.colors.gray[500]};
    margin-bottom: ${theme.sizes.xLarge}px;
  `}
`;
