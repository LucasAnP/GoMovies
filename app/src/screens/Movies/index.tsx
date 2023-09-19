import { useEffect } from 'react';
import { Text } from 'react-native';
import axios from 'axios';

import { api } from '@services/api';
import { SelectedMovie } from '@screens/SelectedMovie';

import { Container } from './styles';

export function Movies() {
  async function getMovies() {
    const response = await api.get(`/top_rated?language=en-US$page=${1}`);
    console.log(response);
    axios;
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container>
      <SelectedMovie></SelectedMovie>
      <Text>Movies</Text>
    </Container>
  );
}
