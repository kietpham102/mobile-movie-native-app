import { SavedMovie, MovieDetails } from "@/types/movie";

/**
 * Generates fake saved movie data for testing purposes
 */
export const generateMockSavedMovies = (count = 5): SavedMovie[] => {
  const movies: SavedMovie[] = [
    {
      id: "1",
      movieId: 447365,
      title: "Guardians of the Galaxy Vol. 3",
      posterPath: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
      userId: "user123",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    },
    {
      id: "2",
      movieId: 667538,
      title: "Transformers: Rise of the Beasts",
      posterPath: "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
      userId: "user123",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
      id: "3",
      movieId: 569094,
      title: "Spider-Man: Across the Spider-Verse",
      posterPath: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      userId: "user123",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
    },
    {
      id: "4",
      movieId: 298618,
      title: "The Flash",
      posterPath: "/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
      userId: "user123",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days ago
    },
    {
      id: "5",
      movieId: 385687,
      title: "Fast X",
      posterPath: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      userId: "user123",
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString() // 21 days ago
    },
    {
      id: "6",
      movieId: 882569,
      title: "Guy Ritchie's The Covenant",
      posterPath: "/kVG8zFFYrpyYLoHChuEeOGAd6Ru.jpg",
      userId: "user123",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
    }
  ];
  
  return movies.slice(0, Math.min(count, movies.length));
};

/**
 * Get mock movie details by ID or default mock if ID not found
 */
export const getMockMovieDetails = (id?: string | number): MovieDetails => {
  // Define mock movies
  const mockMovies: Record<string, MovieDetails> = {
    "447365": {
      id: 447365,
      title: "Guardians of the Galaxy Vol. 3",
      overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
      poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
      backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
      release_date: "2023-05-03",
      vote_average: 8.1,
      vote_count: 4255,
      genre_ids: [878, 12, 28],
      genres: [
        { id: 878, name: "Science Fiction" },
        { id: 12, name: "Adventure" },
        { id: 28, name: "Action" }
      ],
      runtime: 150,
      status: "Released",
      tagline: "Once more with feeling.",
      budget: 250000000,
      revenue: 845555777,
      production_companies: [
        { id: 420, name: "Marvel Studios", logo_path: "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png" }
      ]
    },
    "569094": {
      id: 569094,
      title: "Spider-Man: Across the Spider-Verse",
      overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
      poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
      release_date: "2023-05-31",
      vote_average: 8.4,
      vote_count: 5121,
      genre_ids: [16, 28, 12],
      genres: [
        { id: 16, name: "Animation" },
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" }
      ],
      runtime: 140,
      status: "Released",
      tagline: "It's how you wear the mask that matters",
      budget: 100000000,
      revenue: 690516673,
      production_companies: [
        { id: 5, name: "Columbia Pictures", logo_path: "/71BqEFAF4V3qjjMPCpLuyJFB9A.png" },
        { id: 7505, name: "Sony Pictures Animation", logo_path: "/c8VtxGbEJqSWvuRGm5eLeFFEOWI.png" }
      ]
    }
  };

  // If ID exists and matches a mock movie, return it
  if (id && mockMovies[id.toString()]) {
    return mockMovies[id.toString()];
  }

  // Otherwise return default mock
  return {
    id: 1234567,
    title: "Example Movie Title",
    overview: "This is a placeholder movie generated when the actual movie details couldn't be loaded. It contains sample data for demonstration purposes only.",
    poster_path: "/kVG8zFFYrpyYLoHChuEeOGAd6Ru.jpg",
    backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    release_date: "2023-01-01",
    vote_average: 7.5,
    vote_count: 1000,
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" }
    ],
    runtime: 120,
    status: "Released",
    tagline: "Example tagline for this movie",
    budget: 100000000,
    revenue: 350000000,
    production_companies: [
      { id: 1, name: "Example Studios", logo_path: null }
    ]
  };
}; 