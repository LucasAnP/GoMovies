import { Star, ThumbsUp } from 'phosphor-react-native';
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

export const MovieCard = styled.TouchableOpacity`
  flex: 1;

  ${({ theme }) => css`
    background-color: ${theme.colors.gray[500]};
    border-radius: ${theme.sizes.small}px;
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

export const Image = styled.Image`
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
    font-size: ${theme.sizes.regular}px;
    color: ${theme.colors.white};
    margin-bottom: ${theme.sizes.small}px;
  `}
`;

export const PopularityContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const VotesContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-left: ${({ theme }) => theme.sizes.medium}px;
`;

export const PopularityIcon = styled(ThumbsUp).attrs(({ theme }) => ({
  size: theme.sizes.medium,
  color: theme.colors.gray[100],
  weight: 'bold',
}))``;

export const StarIcon = styled(Star).attrs(({ theme }) => ({
  size: theme.sizes.medium,
  color: theme.colors.yellow,
  weight: 'fill',
}))``;

export const VotesText = styled.Text`
  text-align: justify;

  ${({ theme }) => css`
    color: ${theme.colors.gray[200]};
    font-size: ${theme.sizes.regular}px;
    margin-left: ${theme.sizes.smallest}px;
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
