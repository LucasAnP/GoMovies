import { SafeAreaView } from 'react-native-safe-area-context';

import { MovieDTO } from '@dtos/MovieDTO';

import {
  Image,
  MovieCardContainer,
  MovieInfo,
  MovieTitle,
  Overview,
  PictureAndInfo,
  PopularityContainer,
  PopularityIcon,
  RemoveIcon,
  StarIcon,
  StarRemoveIcon,
  TrashContainer,
  VotesContainer,
  VotesText,
} from './styles';

interface MovieCardProps {
  onPress: () => void;
  item: MovieDTO;
  removeFunction?: () => void;
}

export function MovieCard({ onPress, item, removeFunction }: MovieCardProps) {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingBottom: 16 }}
      edges={['right', 'left']}
    >
      <MovieCardContainer onPress={onPress}>
        <PictureAndInfo>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            }}
          />
          <MovieInfo>
            <MovieTitle>{item?.title}</MovieTitle>
            <Overview numberOfLines={3}>{item?.overview}</Overview>
            <PopularityContainer>
              <PopularityIcon />
              <VotesText>{item?.popularity}</VotesText>
              <VotesContainer>
                <StarIcon />
                <VotesText>
                  {item?.vote_average.toFixed(1)} ({item?.vote_count})
                </VotesText>
              </VotesContainer>
            </PopularityContainer>
          </MovieInfo>
        </PictureAndInfo>
      </MovieCardContainer>
      {removeFunction && (
        <TrashContainer onPress={removeFunction}>
          <RemoveIcon />
        </TrashContainer>
      )}
    </SafeAreaView>
  );
}
