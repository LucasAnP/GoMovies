import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Star, ThumbsUp } from 'phosphor-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native';

import { useTheme } from 'styled-components/native';
import { Loading } from '@components/Loading';

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
  PaginationLoading,
  PictureAndInfo,
  Title,
  VotesContainer,
  VotesText,
} from './styles';

export function Movies() {
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [pagination, setPagination] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const theme = useTheme();

  const getMovies = async (currentPagination: number) => {
    setPagination(currentPagination);
    try {
      setIsLoading(true);
      const response = await api.get(
        `/top_rated?language=en-US&page=${currentPagination}`,
      );

      if (currentPagination == 1) {
        setMovies(response.data?.results);
      } else {
        setMovies((prevState) => prevState.concat(response.data?.results));
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
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
      {/* TODO: Make the list with best performance can usecallback */}
      {isLoading && movies.length === 0 ? (
        <Loading />
      ) : (
        <MoviesFlatList
          data={movies}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={onEndReached}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.red[700]}
              titleColor={theme.colors.red[700]}
              colors={[
                theme.colors.red[700],
                theme.colors.red[400],
                theme.colors.gray[700],
              ]}
            />
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            movies.length > 0 ? (
              <PaginationLoading>
                <Loading />
              </PaginationLoading>
            ) : (
              <></>
            )
          }
          renderItem={({ item }) => (
            <SafeAreaView
              style={{ flex: 1, paddingBottom: 16 }}
              edges={['right', 'left']}
            >
              <MovieCard onPress={() => onPressMovie(item.id)}>
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
