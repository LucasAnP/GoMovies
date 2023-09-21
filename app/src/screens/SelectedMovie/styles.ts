import { Star, ArrowLeft } from 'phosphor-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

type StarIconProps = {
  favorited: boolean;
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.gray[700]};
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};
`;

export const GoBackIcon = styled(ArrowLeft).attrs(({ theme }) => ({
  size: theme.sizes.large,
  color: theme.colors.white,
  weight: 'bold',
}))``;

export const StarIcon = styled(Star).attrs<StarIconProps>(
  ({ favorited, theme }) => ({
    color: favorited ? theme.colors.yellow : theme.colors.gray[100],
    weight: favorited ? 'fill' : 'duotone',
    size: theme.sizes.large,
  }),
)``;

export const Header = styled.View`
  width: 100%;
  position: absolute;
  flex-direction: row;

  padding: 0 ${({ theme }) => theme.sizes.medium}px;
  align-items: center;
  justify-content: space-between;
`;

export const IconContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image.attrs(() => ({
  resizeMode: 'stretch',
}))`
  width: '100%';
  height: ${RFValue(350)}px;
  border-bottom-left-radius: ${({ theme }) => theme.sizes.small}px;
  border-bottom-right-radius: ${({ theme }) => theme.sizes.small}px;

  margin-bottom: ${({ theme }) => theme.sizes.large}px;
`;

export const TitleContainer = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MovieTitle = styled.Text`
  font-weight: bold;
  font-size: ${({ theme }) => theme.sizes.xMedium}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const MovieSubtitle = styled.Text`
  font-weight: bold;

  ${({ theme }) => css`
    font-size: ${theme.sizes.regular}px;
    color: ${theme.colors.gray[200]};
    margin-bottom: ${theme.sizes.medium}px;
    margin-top: ${theme.sizes.small}px;
  `}
`;

export const MovieInfoContainer = styled.View`
  flex: 1;

  padding: 0 ${({ theme }) => theme.sizes.medium}px;
`;

export const Overview = styled.Text`
  text-align: justify;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.sizes.regular}px;
  margin-bottom: ${({ theme }) => theme.sizes.small}px;
`;

export const GenresContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;

  gap: ${({ theme }) => theme.sizes.small}px;
`;

export const Genres = styled.View`
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    padding: ${theme.sizes.small}px;
    background-color: ${theme.colors.red[400]};
    border-radius: ${theme.sizes.small}px;
  `}
`;

export const GenresText = styled.Text`
  text-align: justify;

  font-size: ${({ theme }) => theme.sizes.regular}px;
  color: ${({ theme }) => theme.colors.white};
`;
