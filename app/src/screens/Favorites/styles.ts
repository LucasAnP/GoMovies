import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

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

  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => RFValue(theme.fontSizes.xl)}px;
  color: ${({ theme }) => theme.colors.gray[100]};
  font-weight: bold;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyListTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.gray[300]};

  text-align: center;
`;

export const MovieCard = styled.TouchableOpacity`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.gray[500]};
  border-radius: 8px;

  margin-bottom: 16px;
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

export const TrashContainer = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  right: ${RFValue(6)}px;
  top: ${RFValue(6)}px;
`;
