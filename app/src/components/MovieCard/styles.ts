import { Star, ThumbsUp, Trash } from 'phosphor-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const MovieCardContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
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

export const Image = styled.Image.attrs(() => ({
  width: RFValue(80),
  resizeMode: 'contain',
}))`
  height: 100%;
  border-top-left-radius: ${({ theme }) => theme.sizes.small}px;
  border-bottom-left-radius: ${({ theme }) => theme.sizes.small}px;
`;

export const MovieInfo = styled.View`
  flex: 1;

  padding: ${({ theme }) => theme.sizes.regular}px
    ${({ theme }) => theme.sizes.medium}px;
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

export const PopularityIcon = styled(ThumbsUp).attrs(({ theme }) => ({
  size: theme.sizes.medium,
  color: theme.colors.gray[100],
  weight: 'bold',
}))``;

export const VotesText = styled.Text`
  text-align: justify;

  ${({ theme }) => css`
    color: ${theme.colors.gray[200]};
    font-size: ${theme.sizes.regular}px;
    margin-left: ${theme.sizes.smallest}px;
  `}
`;

export const VotesContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin-left: ${({ theme }) => theme.sizes.medium}px;
`;

export const StarIcon = styled(Star).attrs(({ theme }) => ({
  size: theme.sizes.medium,
  color: theme.colors.yellow,
  weight: 'fill',
}))``;

export const TrashContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.2,
}))`
  position: absolute;
  right: ${({ theme }) => theme.sizes.smallest}px;
  top: ${({ theme }) => theme.sizes.smallest}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 4px;
  border-radius: 999px;

  background-color: ${({ theme }) => theme.colors.gray[400]};
`;

export const RemoveIcon = styled(Trash).attrs(({ theme }) => ({
  size: theme.sizes.medium,
  color: theme.colors.red[400],
  weight: 'fill',
}))``;
