import { Star } from 'phosphor-react-native';

import styled from 'styled-components/native';

type StarIconProps = {
  favorited: boolean;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};

  align-items: center;
  justify-content: center;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};
`;

export const InfoContainer = styled.View``;

export const Header = styled.View`
  width: 100%;
  position: absolute;
  flex-direction: row;

  padding: 16px;
  align-items: center;
  justify-content: space-between;
`;
export const StarIcon = styled(Star).attrs<StarIconProps>(
  ({ favorited, theme }) => ({
    color: favorited ? 'yellow' : theme.colors.white,
    weight: favorited ? 'fill' : 'bold',
  }),
)``;

export const IconContainer = styled.TouchableOpacity`
  height: 100%;
`;

export const Image = styled.Image`
  width: '100%';
  height: 400px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  margin-bottom: 24px;
`;

export const MovieTitle = styled.Text`
  font-weight: bold;
  font-size: ${({ theme }) => theme.sizes.xMedium}px;

  color: ${({ theme }) => theme.colors.white};
`;

export const MovieSubtitle = styled.Text`
  font-weight: bold;
  font-size: ${({ theme }) => theme.sizes.regular}px;

  color: ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: 16px;
  margin-top: 8px;
`;

export const MovieInfoContainer = styled.View`
  flex: 1;

  padding: 0 16px;
`;

export const Overview = styled.Text`
  font-size: ${({ theme }) => theme.sizes.regular}px;
  text-align: justify;

  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 8px;
`;

export const GenresContainer = styled.View`
  flex: 1;
  flex-direction: row;

  flex-wrap: wrap;
  gap: 8px;
`;

export const Genres = styled.View`
  padding: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.red[400]};
  border-radius: 8px;
`;

export const GenresText = styled.Text`
  font-size: ${({ theme }) => theme.sizes.regular}px;
  text-align: justify;

  color: ${({ theme }) => theme.colors.white};
`;
