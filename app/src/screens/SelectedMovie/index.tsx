import { useState, useCallback, useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading } from '@components/Loading';
import { addFavoriteMovie, fetchFavorites } from '@redux/slices/moviesSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';

import { api } from '@services/api';
import { SelectedMovieDTO } from '@dtos/SelectedMovieDTO';
import { AppNavigationRoutesProps } from '@routes/app.routes';
import { MovieDTO } from '@dtos/MovieDTO';
import { removeStoragedMovie } from '@storage/favorites/removeStoragedFavoriteMovies';

import {
  Container,
  Genres,
  GenresContainer,
  GenresText,
  GoBackIcon,
  Header,
  IconContainer,
  Image,
  MovieInfoContainer,
  MovieSubtitle,
  MovieTitle,
  Overview,
  ScrollView,
  StarIcon,
  TitleContainer,
} from './styles';

type SelectedMovieParams = {
  selectedMovieId: number;
};

export function SelectedMovie() {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { selectedMovieId } = route.params as SelectedMovieParams;
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState<SelectedMovieDTO>();
  const [favorited, setFavorited] = useState(false);

  const finalUri = `https://image.tmdb.org/t/p/w500/${movieInfo?.poster_path}`;
  const movieInfoToFavorite = {
    id: movieInfo?.id,
    title: movieInfo?.title,
    overview: movieInfo?.overview,
    poster_path: movieInfo?.poster_path,
    vote_average: movieInfo?.vote_average,
    vote_count: movieInfo?.vote_count,
    popularity: movieInfo?.popularity,
  } as MovieDTO;

  const favoritedMovies = useAppSelector((state) => {
    return state.movies.favoritedMovies;
  });

  const getSelectedMovieDetails = async () => {
    try {
      setLoading(true);
      const id = selectedMovieId;
      const response = await api.get<SelectedMovieDTO>(
        `/${id}?language=en-US&`,
      );
      setMovieInfo(response.data);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const onGoBack = () => {
    setMovieInfo(undefined);
    navigation.goBack();
  };

  const favoriteMovie = () => {
    try {
      dispatch(addFavoriteMovie(movieInfoToFavorite));
      setFavorited((prevState) => !prevState);
    } catch (error) {
      let errorMessage = 'Failed to favorite movie';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Unable to favorite', errorMessage);
    }
  };

  const unfavoriteMovie = () => {
    removeStoragedMovie(movieInfoToFavorite);
    setFavorited((prevState) => !prevState);
  };

  const handleFavoriteMovie = () => {
    if (favorited) {
      Alert.alert('Unfavorite', 'Are you sure to unfavorite this movie?', [
        { text: 'no', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            unfavoriteMovie();
          },
        },
      ]);
    } else {
      Alert.alert('Favorite', 'Are you sure to favorite this movie?', [
        { text: 'no', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            favoriteMovie();
          },
        },
      ]);
    }
  };

  const checkIfMovieIsFavorited = () => {
    setFavorited(false);
    const filteredEqualSelectedMovie = favoritedMovies.filter(
      (movieInside) => movieInside.id === selectedMovieId,
    );
    if (filteredEqualSelectedMovie.length > 0) {
      setFavorited(true);
    }
  };

  useLayoutEffect(() => {
    checkIfMovieIsFavorited();
  }, [favoritedMovies, selectedMovieId]);

  useFocusEffect(
    useCallback(() => {
      getSelectedMovieDetails();
    }, [selectedMovieId]),
  );

  return (
    <>
      {loading ? (
        <Container>
          <Loading />
        </Container>
      ) : (
        <ScrollView>
          <Image source={{ uri: finalUri }} />
          <Header style={{ top: Math.max(insets.top, 16) }}>
            <IconContainer onPress={onGoBack}>
              <GoBackIcon />
            </IconContainer>
          </Header>

          <MovieInfoContainer>
            <TitleContainer>
              <MovieTitle>{movieInfo?.title}</MovieTitle>
              <IconContainer onPress={handleFavoriteMovie}>
                <StarIcon favorited={favorited} />
              </IconContainer>
            </TitleContainer>
            <MovieSubtitle>{movieInfo?.release_date}</MovieSubtitle>
            <Overview>{movieInfo?.overview}</Overview>
            <GenresContainer>
              {movieInfo?.genres.map((item) => (
                <Genres key={item.id}>
                  <GenresText>{item.name}</GenresText>
                </Genres>
              ))}
            </GenresContainer>
            <MovieSubtitle>
              Revenue: {movieInfo?.revenue.toLocaleString('en-US')}
            </MovieSubtitle>
          </MovieInfoContainer>
        </ScrollView>
      )}
    </>
  );
}
