import { ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { api } from '@services/api';
import { SelectedMovieDTO } from '@dtos/SelectedMovieDTO';

import { Container } from './styles';

type SelectedMovieParams = {
  id: number;
};

export function SelectedMovie() {
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState<SelectedMovieDTO>();

  const route = useRoute();
  const { id } = route.params as SelectedMovieParams;

  const getSelectedMovieDetails = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    setMovieInfo(undefined);
    getSelectedMovieDetails();
  }, [id]);

  return (
    <Container>
      {loading && !movieInfo ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>{movieInfo?.title}</Text>
          <Text>{movieInfo?.overview}</Text>
          <Text>{movieInfo?.genres[0].name}</Text>
          <Text>{movieInfo?.poster_path}</Text>
          <Text>{movieInfo?.release_date}</Text>
          <Text>{movieInfo?.revenue}</Text>
        </>
      )}
    </Container>
  );
}
