import { SafeAreaView } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  padding: 16px 16px 0;
`;

export const MoviesFlatList = styled.FlatList``;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.gray[100]};
  font-weight: bold;

  margin-bottom: 16px;
`;

export const MovieCard = styled.TouchableOpacity`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.gray[500]};
  border-radius: 8px;
`;

export const PictureAndInfo = styled.View`
  flex: 1;

  flex-direction: row;
`;

export const MovieInfo = styled.View`
  flex: 1;

  padding: 16px;
`;

export const Image = styled.Image`
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const MovieTitle = styled.Text`
  font-weight: bold;
  font-size: ${({ theme }) => theme.sizes.medium}px;

  color: ${({ theme }) => theme.colors.white};
`;

export const Overview = styled.Text`
  font-size: ${({ theme }) => theme.sizes.regular}px;
  text-align: justify;

  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 8px;
`;

export const VotesContainer = styled.View`
  flex-direction: row;
`;

export const VotesText = styled.Text`
  font-size: ${({ theme }) => theme.sizes.regular}px;
  text-align: justify;

  color: ${({ theme }) => theme.colors.gray[200]};

  margin-left: 4px;
`;

export const PaginationLoading = styled.View`
  width: 50px;
  height: 50px;
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray[500]};
  align-self: center;
  align-items: center;
  justify-content: center;

  margin-bottom: 32px;
`;
