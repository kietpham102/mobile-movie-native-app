// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { View, Text, TouchableOpacity, Image, Pressable, ActivityIndicator } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { isMovieSaved, saveMovie } from "@/services/appwrite";
import { fetchMovieDetails } from "@/services/api";

// For demo purposes, using a hardcoded user ID
const DEMO_USER_ID = "user123";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [savingMovie, setSavingMovie] = useState(false);

  useEffect(() => {
    // Check if the movie is already saved
    const checkIfSaved = async () => {
      try {
        const savedStatus = await isMovieSaved(Number(movie_id), DEMO_USER_ID);
        setIsSaved(savedStatus);
      } catch (error) {
        console.error("Error checking if movie is saved:", error);
      }
    };

    checkIfSaved();
  }, [movie_id]);

  const handleSaveMovie = async (event) => {
    event.stopPropagation();
    
    if (savingMovie) return;
    
    try {
      setSavingMovie(true);
      
      if (!isSaved) {
        // For trending movies, we need to fetch full details before saving
        const movieDetails = await fetchMovieDetails(movie_id);
        
        const movieData = {
          id: Number(movie_id),
          title,
          poster_path: poster_url.replace('https://image.tmdb.org/t/p/w500', ''),
          backdrop_path: movieDetails.backdrop_path || '',
          overview: movieDetails.overview || '',
          vote_average: movieDetails.vote_average || 0,
          vote_count: movieDetails.vote_count || 0,
          release_date: movieDetails.release_date || '',
          genre_ids: movieDetails.genres?.map(genre => genre.id) || []
        };
        
        await saveMovie(movieData, DEMO_USER_ID);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving movie:", error);
    } finally {
      setSavingMovie(false);
    }
  };

  return (
    <View className="w-32 relative pl-5">
      <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity className="relative">
          <Image
            source={{ uri: poster_url }}
            className="w-32 h-48 rounded-lg"
            resizeMode="cover"
          />

          <Pressable 
            onPress={handleSaveMovie}
            className="absolute top-2 -right-2 bg-black bg-opacity-60 rounded-full p-1"
          >
            {savingMovie ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Image 
                source={icons.save} 
                className={`w-5 h-5 ${isSaved ? "opacity-100" : "opacity-50"}`} 
              />
            )}
          </Pressable>

          <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
            <MaskedView
              maskElement={
                <Text className="font-bold text-white text-6xl">{index + 1}</Text>
              }
            >
              <Image
                source={images.rankingGradient}
                className="size-14"
                resizeMode="cover"
              />
            </MaskedView>
          </View>

          <Text
            className="text-sm font-bold mt-2 text-light-200"
            numberOfLines={2}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TrendingCard;
