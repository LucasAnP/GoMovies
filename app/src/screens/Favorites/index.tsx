import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ThumbsUp } from 'phosphor-react-native';

import { Loading } from '@components/Loading';
import { useTheme } from 'styled-components/native';

import { getFavoritedMovies } from '@storage/favorites/getFavoritedMovies';
import { MovieDTO } from '@dtos/MovieDTO';
import { AppNavigationRoutesProps } from '@routes/app.routes';
import Route from '@routes/enums';

import {
  Container,
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

export function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [favoritedMovies, setFavoritedMovies] = useState<MovieDTO[]>();

  const theme = useTheme();

  const navigation = useNavigation<AppNavigationRoutesProps>();

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);

      const favoritedMovies = await getFavoritedMovies();
      setFavoritedMovies(favoritedMovies);
    } catch (error) {
      console.warn(error);
      Alert.alert('Movies', 'Unable to load favorites.');
    } finally {
      setIsLoading(false);
    }
  };

  const onPressMovie = (movieId: number) => {
    navigation.navigate(Route.SELECTED_MOVIE, { id: movieId });
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
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
          // TODO: useCallback
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
