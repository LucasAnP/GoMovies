import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Star, ThumbsUp } from 'phosphor-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from 'styled-components/native';

import { MovieDTO } from '@dtos/MovieDTO';
import { api } from '@services/api';
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

export function Movies() {
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [pagination, setPagination] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const theme = useTheme();

  const getMovies = async (currentPagination: number) => {
    setPagination(currentPagination);
    try {
      const response = await api.get(
        `/top_rated?language=en-US$page=${pagination}`,
      );

      if (currentPagination == 1) {
        setMovies(response.data?.results);
      } else {
        setMovies((prevState) => prevState.concat(response.data?.results));
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getMovies(1);
  };

  const onEndReached = () => {
    getMovies(pagination + 1);
  };

  const onPressMovie = (movieId: number) => {
    navigation.navigate(Route.SELECTED_MOVIE, { id: movieId });
  };

  useEffect(() => {
    getMovies(1);
  }, []);

  return (
    <Container>
      <Title>Top Rated Movies</Title>
      {/* TODO: Make the list with best performance */}
      <MoviesFlatList
        data={movies}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
    </Container>
  );
}
{
  /*
            <MovieTitleContainer activeOpacity={0.9}>

              <CaretDown
                size={RFValue(theme.sizes.medium)}
                color={theme.colors.white}
              />
            </MovieTitleContainer> */
}
{
  /*  */
}
