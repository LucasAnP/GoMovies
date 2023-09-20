import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

import { api } from '@services/api';
import { MovieDTO } from '@dtos/MovieDTO';

import { Container, Movie } from './styles';

export function Movies() {
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [pagination, setPagination] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    getMovies(1);
  }, []);

  return (
    <Container>
      <Text>Top Rated Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <Movie>
            {/* TODO: Make a animation do drop infos (show only image) */}
            <Text>{item.title}</Text>
            <Text>{item.overview}</Text>
            <Text>{item.popularity}</Text>
            <Text>{item.vote_average}</Text>
            <Text>{item.vote_count}</Text>
          </Movie>
        )}
      />
    </Container>
  );
}
