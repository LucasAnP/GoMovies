import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'phosphor-react-native';

import { api } from '@services/api';
import { SelectedMovieDTO } from '@dtos/SelectedMovieDTO';
import { AppNavigationRoutesProps } from '@routes/app.routes';

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
} from './styles';

type SelectedMovieParams = {
  id: number;
};

export function SelectedMovie() {
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState<SelectedMovieDTO>();

  const route = useRoute();
  const { id } = route.params as SelectedMovieParams;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const getSelectedMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get<SelectedMovieDTO>(
        `/${id}?language=en-US&`,
      );
      console.log('response', response.data);
      setMovieInfo(response.data);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const onGoBack = () => {
    navigation.navigate('Movies');
    setMovieInfo(undefined);
  };

  useEffect(() => {
    setMovieInfo(undefined);
    getSelectedMovieDetails();
  }, [id]);

  return (
    <>
      {loading ? (
        <Container>
          <ActivityIndicator />
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
            <IconContainer onPress={onGoBack}>
              <ArrowLeft color="white" size={20} />
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
