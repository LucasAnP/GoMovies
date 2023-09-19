import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

import { api } from '@services/api';
import { MovieDTO } from '@dtos/MovieDTO';

import { Container, Movie } from './styles';

export function Movies() {
  const [movies, setMovies] = useState<MovieDTO[]>([]);

  async function getMovies() {
    try {
      const response = await api.get(`/top_rated?language=en-US$page=${1}`);
      setMovies(response.data?.results);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container>
      <Text>Top Rated Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
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
