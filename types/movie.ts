export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
  }[];
}

export interface TrendingMovie {
  $id: string;
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

export interface SavedMovie {
  id: string;
  movieId: number;
  title: string;
  posterPath: string;
  userId: string;
  createdAt: string;
} 