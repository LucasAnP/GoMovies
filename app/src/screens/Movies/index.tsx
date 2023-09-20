import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CaretDown } from 'phosphor-react-native';

import { useTheme } from 'styled-components/native';

import { MovieDTO } from '@dtos/MovieDTO';
import { api } from '@services/api';
import { AppNavigationRoutesProps } from '@routes/app.routes';
import Route from '@routes/enums';

import {
  Container,
  Image,
  Movie,
  MovieTitle,
  MovieTitleContainer,
  Title,
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
      <FlatList
        data={movies}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Movie activeOpacity={0.9} onPress={() => onPressMovie(item.id)}>
            {/* TODO: Make a animation do drop infos (show only image) */}
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
              resizeMode="cover"
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                alignSelf: 'center',
              }}
            />
            <MovieTitleContainer activeOpacity={0.9}>
              <MovieTitle>{item?.title}</MovieTitle>
              <CaretDown
                size={RFValue(theme.sizes.medium)}
                color={theme.colors.white}
              />
            </MovieTitleContainer>
            {/* <Text>{item.overview}</Text>
          <Text>{item.popularity}</Text>
          <Text>{item.vote_average}</Text>
          <Text>{item.vote_count}</Text> */}
          </Movie>
        )}
      />
    </Container>
  );
}
