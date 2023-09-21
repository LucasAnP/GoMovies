import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ThumbsUp, Trash } from 'phosphor-react-native';
import { Alert, TouchableOpacity } from 'react-native';

import { Loading } from '@components/Loading';
import { useTheme } from 'styled-components/native';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import Route from '@routes/enums';
import { MovieDTO } from '@dtos/MovieDTO';
import { removeStoragedMovie } from '@storage/favorites/removeStoragedFavoriteMovies';

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

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchFavorites } from '../../redux/slices/moviesSlice';

export function Favorites() {
  const theme = useTheme();

  const { favoritedMovies, isLoading } = useAppSelector((state) => {
    return state.movies;
  });

  const dispatch = useAppDispatch();

  const navigation = useNavigation<AppNavigationRoutesProps>();

  const fetchFavoritesMovies = () => {
    dispatch(fetchFavorites());
  };

  const handleRemoveFavorite = (movieWillRemove: MovieDTO) => {
    // TODO: active loading when removing
    Alert.alert(
      'Remove favorite',
      'Are you sure to remove this movie from your favorite list?',
      [
        { text: 'no', style: 'cancel' },
        { text: 'Yes', onPress: () => removeStoragedMovie(movieWillRemove) },
      ],
    );
  };

  const onPressMovie = (movieId: number) => {
    navigation.navigate(Route.SELECTED_MOVIE, { id: movieId });
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoritesMovies();
    }, [favoritedMovies]),
  );

  return (
    <Container>
      <Title>Favorite Movies</Title>
      {isLoading && !favoritedMovies ? (
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
                  <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
                    <Trash size={16} color="white" />
                  </TouchableOpacity>
                </PictureAndInfo>
              </MovieCard>
            </SafeAreaView>
          )}
        />
      )}
    </Container>
  );
}
