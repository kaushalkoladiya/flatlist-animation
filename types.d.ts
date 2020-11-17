export interface DBMovie {
  id: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
}

export interface Movie {
  key: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  description: string;
  releaseDate: string;
  genres: Array<string>;
}

export interface Genre {
  id: number;
  name: string;
}
