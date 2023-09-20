export type SelectedMovieDTO = {
  title: string;
  poster_path: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
  release_date: string;
  revenue: number;
};
