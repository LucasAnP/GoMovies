import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { Loading } from '@components/Loading';
import { useAppDispatch, useAppSelector } from '@redux/store';
import {
  fetchFavorites,
  removeAllFavoriteMovies,
  removeFavoriteMovie,
} from '@redux/slices/moviesSlice';
import { MovieCard } from '@components/MovieCard';

import { AppNavigationRoutesProps } from '@routes/app.routes';
import Route from '@routes/enums';
import { MovieDTO } from '@dtos/MovieDTO';

import {
  Container,
  EmptyListContainer,
  EmptyListTitle,
  Header,
  RemoveButton,
  SwipeableRemove,
  Title,
  TrashIcon,
} from './styles';

export function Favorites() {
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
        <Title>Favorited Movies</Title>
        <RemoveButton
          onPress={() => handleRemoveAllMovies()}
          activeOpacity={0.7}
        >
          {favoritedMovies.length > 0 && <TrashIcon />}
        </RemoveButton>
      </Header>

      <FlatList
        data={favoritedMovies}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          favoritedMovies?.length === 0 && {
            flex: 1,
            justifyContent: 'center',
          },
        ]}
        ListEmptyComponent={() => (
          <EmptyListContainer>
            <EmptyListTitle>
              There are no favorite movies.{'\n'}
              Shall we bookmark any?
            </EmptyListTitle>
          </EmptyListContainer>
        )}
        //
        renderItem={({ item }) => (
          <Swipeable
            key={item.id}
            leftThreshold={10}
            onSwipeableOpen={() => {
              handleRemoveFavorite(item);
            }}
            renderLeftActions={() => (
              <SwipeableRemove>
                <TrashIcon />
              </SwipeableRemove>
            )}
          >
            <MovieCard
              item={item}
              onPress={() => onPressMovie(item.id)}
              removeFunction={() => handleRemoveFavorite(item)}
            />
          </Swipeable>
        )}
      />
    </Container>
  );
}
