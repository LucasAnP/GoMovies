import { ThumbsUp } from 'phosphor-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  padding: 16px 16px 0;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin-bottom: ${({ theme }) => theme.sizes.medium}px;
`;

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

export const PictureAndInfo = styled.View`
  flex: 1;

  flex-direction: row;
`;

export const MovieInfo = styled.View`
  flex: 1;

  padding: ${({ theme }) => theme.sizes.medium}px;
`;

export const Image = styled.Image.attrs(() => ({
  width: RFValue(80),
  resizeMode: 'contain',
}))`
  height: 100%;
  border-top-left-radius: ${({ theme }) => theme.sizes.small}px;
  border-bottom-left-radius: ${({ theme }) => theme.sizes.small}px;
`;

export const MovieTitle = styled.Text`
  font-weight: bold;
  font-size: ${({ theme }) => theme.sizes.medium}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Overview = styled.Text`
  text-align: justify;

  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.sizes.regular}px;
    margin-bottom: ${theme.sizes.small}px;
  `}
`;

export const VotesContainer = styled.View`
  flex-direction: row;
`;

export const VotesText = styled.Text`
  text-align: justify;

  ${({ theme }) => css`
    color: ${theme.colors.gray[200]};
    font-size: ${theme.sizes.regular}px;
    margin-left: ${theme.sizes.smallest}px;
  `}
`;

export const PopularityIcon = styled(ThumbsUp).attrs(({ theme }) => ({
  size: theme.sizes.medium,
  color: theme.colors.gray[100],
  weight: 'bold',
}))``;

export const TrashContainer = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  right: ${RFValue(6)}px;
  top: ${RFValue(6)}px;
`;
