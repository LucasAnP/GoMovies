import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ThumbsUp } from 'phosphor-react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '@components/Loading';
import { useTheme } from 'styled-components/native';

import { MovieDTO } from '@dtos/MovieDTO';
import { AppNavigationRoutesProps } from '@routes/app.routes';
import Route from '@routes/enums';

import {
  Container,
  EmptyListContainer,
  EmptyListTitle,
  Image,
  MovieCard,
  MovieInfo,
  MovieTitle,
  MoviesFlatList,
  Overview,
  PictureAndInfo,
  Title,
  VotesContainer,
  VotesText,
} from './styles';

import { fetchFavorites } from '../../redux/slices/moviesSlice';

export function Favorites() {
  // const [favoritedMovies, setFavoritedMovies] = useState<MovieDTO[]>();

  const theme = useTheme();
  const { favoritedMovies, isLoading } = useSelector((state) => {
    return state.movies;
  });

  const dispatch = useDispatch();

  const navigation = useNavigation<AppNavigationRoutesProps>();

  const fetchFavoritesMovies = () => {
    dispatch(fetchFavorites());
  };

  const onPressMovie = (movieId: number) => {
    navigation.navigate(Route.SELECTED_MOVIE, { id: movieId });
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoritesMovies();
    }, []),
  );

  return (
    <Container>
      <Title>Favorite Movies</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <MoviesFlatList
          data={favoritedMovies}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            favoritedMovies?.length === 0 && {
              flex: 1,
              justifyContent: 'center',
            }
          }
          ListEmptyComponent={() => (
            <EmptyListContainer>
              <EmptyListTitle>
                There are no favorite movies.{'\n'}
                Shall we bookmark any?
              </EmptyListTitle>
            </EmptyListContainer>
          )}
          renderItem={({ item }) => (
            <SafeAreaView
              style={{ flex: 1, paddingBottom: 16 }}
              edges={['right', 'left']}
            >
              <MovieCard
                activeOpacity={0.9}
                onPress={() => onPressMovie(item.id)}
              >
                <PictureAndInfo>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                    }}
                    width={100}
                    resizeMode="cover"
                  />
                  <MovieInfo>
                    <MovieTitle>{item?.title}</MovieTitle>
                    <Overview numberOfLines={3}>{item?.overview}</Overview>
                    <VotesContainer>
                      <ThumbsUp
                        color={theme.colors.gray[100]}
                        size={16}
                        weight="bold"
                      />
                      <VotesText>{item?.popularity}</VotesText>
                    </VotesContainer>
                    <VotesContainer>
                      <Star color="yellow" size={16} weight="fill" />
                      <VotesText>
                        {item?.vote_average} ({item?.vote_count})
                      </VotesText>
                    </VotesContainer>
                  </MovieInfo>
                </PictureAndInfo>
              </MovieCard>
            </SafeAreaView>
          )}
        />
      )}
    </Container>
  );
}
