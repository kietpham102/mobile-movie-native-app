import { Client, Databases, ID, Query } from "react-native-appwrite";
import { Movie, SavedMovie, TrendingMovie } from "@/types/movie";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_MOVIES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// Save a movie to the user's saved list
export const saveMovie = async (movie: Movie, userId: string): Promise<SavedMovie> => {
  try {
    // Check if movie is already saved
    const existingMovies = await database.listDocuments(
      DATABASE_ID, 
      SAVED_MOVIES_COLLECTION_ID,
      [
        Query.equal("movieId", movie.id),
        Query.equal("userId", userId)
      ]
    );

    if (existingMovies.documents.length > 0) {
      return existingMovies.documents[0] as unknown as SavedMovie;
    }

    const savedMovie = await database.createDocument(
      DATABASE_ID,
      SAVED_MOVIES_COLLECTION_ID,
      ID.unique(),
      {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        userId: userId,
        createdAt: new Date().toISOString(),
      }
    );

    return savedMovie as unknown as SavedMovie;
  } catch (error) {
    console.error("Error saving movie:", error);
    throw error;
  }
};

// Remove a movie from saved list
export const removeSavedMovie = async (movieId: string): Promise<void> => {
  try {
    await database.deleteDocument(
      DATABASE_ID,
      SAVED_MOVIES_COLLECTION_ID,
      movieId
    );
  } catch (error) {
    console.error("Error removing saved movie:", error);
    throw error;
  }
};

// Get user's saved movies
export const getSavedMovies = async (userId: string): Promise<SavedMovie[]> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_MOVIES_COLLECTION_ID,
      [Query.equal("userId", userId), Query.orderDesc("createdAt")]
    );

    return result.documents as unknown as SavedMovie[];
  } catch (error) {
    console.error("Error getting saved movies:", error);
    throw error;
  }
};

// Check if a movie is saved by the user
export const isMovieSaved = async (movieId: number, userId: string): Promise<boolean> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_MOVIES_COLLECTION_ID,
      [
        Query.equal("movieId", movieId),
        Query.equal("userId", userId)
      ]
    );

    return result.documents.length > 0;
  } catch (error) {
    console.error("Error checking if movie is saved:", error);
    return false;
  }
};
