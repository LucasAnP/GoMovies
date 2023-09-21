import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'phosphor-react-native';

import { Loading } from '@components/Loading';
import { useTheme } from 'styled-components/native';

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
  Header,
  IconContainer,
  Image,
  MovieInfoContainer,
  MovieSubtitle,
  MovieTitle,
  Overview,
  ScrollView,
  StarIcon,
} from './styles';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addFavoriteMovie } from '../../redux/slices/moviesSlice';

type SelectedMovieParams = {
  selectedMovieId: number;
};

export function SelectedMovie() {
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState<SelectedMovieDTO>();
  const [favorited, setFavorited] = useState(false);
  const movieInfoToFavorite = {
    id: movieInfo?.id,
    title: movieInfo?.title,
    overview: movieInfo?.overview,
    poster_path: movieInfo?.poster_path,
    vote_average: movieInfo?.vote_average,
    vote_count: movieInfo?.vote_count,
    popularity: movieInfo?.popularity,
  } as MovieDTO;

  const theme = useTheme();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { selectedMovieId } = route.params as SelectedMovieParams;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppNavigationRoutesProps>();

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
  };

  const handleFavoriteMovie = () => {
    if (favorited) {
      Alert.alert('Unfavorite', 'Are you sure to unfavorite this movie?', [
        { text: 'no', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setFavorited((prevState) => !prevState);
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
            setFavorited((prevState) => !prevState);
            favoriteMovie();
          },
        },
      ]);
    }
  };

  //TODO: check if movie is on favorites and make the star active
  const checkIfMovieIsFavorited = () => {
    console.log('selectedMovieId', selectedMovieId);
    console.log('Favorited', favoritedMovies);

    const filteredEqualSelectedMovie = favoritedMovies.filter(
      (movieInside) => movieInside.id === selectedMovieId,
    );
    console.log('filteredEqualSelectedMovie', filteredEqualSelectedMovie);
    if (filteredEqualSelectedMovie.length > 0) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSelectedMovieDetails();
    }, [selectedMovieId]),
  );

  useFocusEffect(
    useCallback(() => {
      checkIfMovieIsFavorited();
    }, [favoritedMovies]),
  );

  return (
    <>
      {loading ? (
        <Container>
          <Loading />
        </Container>
      ) : (
        <ScrollView>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movieInfo?.poster_path}`,
            }}
            resizeMode="stretch"
          />
          <Header style={{ top: Math.max(insets.top, 16) }}>
            <IconContainer onPress={onGoBack} activeOpacity={0.7}>
              <ArrowLeft color={theme.colors.white} size={24} />
            </IconContainer>
            <IconContainer onPress={handleFavoriteMovie} activeOpacity={0.7}>
              <StarIcon favorited={favorited} size={32} />
            </IconContainer>
          </Header>

          <MovieInfoContainer>
            <MovieTitle>{movieInfo?.title}</MovieTitle>
            <MovieSubtitle>{movieInfo?.release_date}</MovieSubtitle>
            <Overview numberOfLines={3}>{movieInfo?.overview}</Overview>
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
