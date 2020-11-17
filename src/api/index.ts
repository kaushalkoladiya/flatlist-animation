import { DBMovie, Genre, Movie } from "../../types";

const API: string = "d1f867f141558abd4dfcd4f09b45f4fc";

const URL: string = `https://api.themoviedb.org/3/discover/movie?api_key=${API}&sort_by=popularity.desc`;

const genres: Array<Genre> = [
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 36, name: "History" },
  { id: 37, name: "Western" },
  { id: 53, name: "Thriller" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 878, name: "Science Fiction" },
  { id: 9648, name: "Mystery" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 10751, name: "Family" },
  { id: 10752, name: "War" },
  { id: 10770, name: "TV Movie" },
];

const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getMovies = async () => {
  try {
    const { results } = await fetch(URL).then((x) => x.json());
    const movies: Array<Movie> = results.map(
      ({
        id,
        original_title,
        poster_path,
        backdrop_path,
        vote_average,
        overview,
        release_date,
        genre_ids,
      }: DBMovie) => ({
        key: String(id),
        title: original_title,
        poster: getImagePath(poster_path),
        backdrop: getBackdropPath(backdrop_path),
        rating: vote_average,
        description: overview,
        releaseDate: release_date,
        genres: genre_ids.map((genreId: number): string => {
          const index: number = genres.findIndex(
            (item: Genre) => item.id === genreId
          );
          return genres[index].name;
        }),
      })
    );

    return movies;
  } catch (error) {
    console.log(error);
  }
};
