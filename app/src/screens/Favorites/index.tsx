import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ThumbsUp, Trash } from 'phosphor-react-native';
import { Alert, TouchableOpacity, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Loading } from '@components/Loading';
import { useTheme } from 'styled-components/native';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import Route from '@routes/enums';
import { MovieDTO } from '@dtos/MovieDTO';

import {
  Container,
  EmptyListContainer,
  EmptyListTitle,
  Header,
  Image,
  MovieCard,
  MovieInfo,
  MovieTitle,
  Overview,
  PictureAndInfo,
  Title,
  TrashContainer,
  VotesContainer,
  VotesText,
} from './styles';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  fetchFavorites,
  removeAllFavoriteMovies,
  removeFavoriteMovie,
} from '../../redux/slices/moviesSlice';

export function Favorites() {
  const theme = useTheme();

  const { favoritedMovies, isLoading } = useAppSelector((state) => {
    return state.movies;
  });

  const dispatch = useAppDispatch();

  const navigation = useNavigation<AppNavigationRoutesProps>();

  const fetchFavoritesMovies = async () => {
    await dispatch(fetchFavorites());
  };

  const handleRemoveFavorite = (movieWillRemove: MovieDTO) => {
    Alert.alert(
      'Remove favorite',
      'Are you sure to remove this movie from your favorite list?',
      [
        { text: 'no', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(removeFavoriteMovie(movieWillRemove));
          },
        },
      ],
    );
  };

  const handleRemoveAllMovies = () => {
    Alert.alert(
      'Remove favorite',
      'Are you sure to remove all movies from your favorite list?',
      [
        { text: 'no', style: 'cancel' },
        { text: 'Yes', onPress: () => dispatch(removeAllFavoriteMovies()) },
      ],
    );
  };

  const onPressMovie = (movieId: number) => {
    navigation.navigate(Route.SELECTED_MOVIE, { selectedMovieId: movieId });
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoritesMovies();
    }, []),
  );

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Favorite Movies</Title>
        <TouchableOpacity
          onPress={() => handleRemoveAllMovies()}
          activeOpacity={0.7}
        >
          {favoritedMovies.length > 0 && (
            <Trash color={theme.colors.red[400]} size={RFValue(22)} />
          )}
        </TouchableOpacity>
      </Header>
      {/* TODO: Put loading here */}

      <FlatList
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
          <MovieCard activeOpacity={0.9} onPress={() => onPressMovie(item.id)}>
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
              <TrashContainer onPress={() => handleRemoveFavorite(item)}>
                <Trash color={theme.colors.red[400]} size={RFValue(16)} />
              </TrashContainer>
            </PictureAndInfo>
          </MovieCard>
        )}
      />
    </Container>
  );
}
