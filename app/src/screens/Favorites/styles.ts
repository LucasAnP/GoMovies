import { Trash } from 'phosphor-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  padding: ${({ theme }) => theme.sizes.medium}px
    ${({ theme }) => theme.sizes.medium}px 0;
`;

export const AbsoluteContainer = styled.View`
  padding: ${({ theme }) => theme.sizes.medium}px
    ${({ theme }) => theme.sizes.medium}px 0;

  margin-bottom: ${({ theme }) => theme.sizes.xLarge}px;

  position: absolute;
  bottom: 0;
  align-self: center;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin-bottom: ${({ theme }) => theme.sizes.medium}px;
`;

export const RemoveButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  padding: ${({ theme }) => theme.sizes.smallest}px;
`;

export const TrashIcon = styled(Trash).attrs(({ theme }) => ({
  size: theme.sizes.large,
  color: theme.colors.red[400],
  weight: 'light',
}))``;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.sizes.xMedium}px;
  color: ${({ theme }) => theme.colors.gray[100]};
  font-weight: bold;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyListTitle = styled.Text`
  font-size: ${({ theme }) => theme.sizes.xRegular}px;
  color: ${({ theme }) => theme.colors.gray[300]};

  text-align: center;
`;

export const MovieCard = styled.TouchableOpacity`
  flex: 1;

  ${({ theme }) => css`
    background-color: ${theme.colors.gray[500]};
    border-radius: ${theme.sizes.small}px;
    margin-bottom: ${theme.sizes.medium}px;
  `}
`;

export const SwipeableRemove = styled.View`
  width: ${RFValue(90)}px;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.gray[700]};
  align-items: center;
  justify-content: center;
`;
