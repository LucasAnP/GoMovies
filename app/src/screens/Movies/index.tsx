import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

import { useTheme } from 'styled-components/native';
import { Loading } from '@components/Loading';
import { MovieCard } from '@components/MovieCard';

import { MovieDTO } from '@dtos/MovieDTO';
import { api } from '@services/api';
import { AppNavigationRoutesProps } from '@routes/app.routes';
import Route from '@routes/enums';

import { Container, MoviesFlatList, PaginationLoading, Title } from './styles';

export function Movies() {
  const { colors } = useTheme();

  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [pagination, setPagination] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigationRoutesProps>();

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
    navigation.navigate(Route.SELECTED_MOVIE, { selectedMovieId: movieId });
  };

  useEffect(() => {
    getMovies(1);
  }, []);

  return (
    <Container>
      <Title>Top Rated Movies</Title>
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
              tintColor={colors.red[700]}
              titleColor={colors.red[700]}
              colors={[colors.gray[700], colors.red[400], colors.gray[700]]}
            />
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            movies.length > 0 ? (
              // TODO: Create Component
              <PaginationLoading>
                <Loading />
              </PaginationLoading>
            ) : (
              <></>
            )
          }
          renderItem={({ item }) => (
            <MovieCard item={item} onPress={() => onPressMovie(item.id)} />
          )}
        />
      )}
    </Container>
  );
}
