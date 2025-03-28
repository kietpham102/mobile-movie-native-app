import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SavedMovie } from "@/types/movie";
import { router } from "expo-router";
import { removeSavedMovie } from "@/services/appwrite";
import { icons } from "@/constants/icons";

interface SavedMovieCardProps {
  movie: SavedMovie;
  onRemove: () => void;
}

const SavedMovieCard = ({ movie, onRemove }: SavedMovieCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const handleRemove = async () => {
    try {
      // Try to remove from database, but don't worry if it fails (might be using mock data)
      try {
        await removeSavedMovie(movie.id);
      } catch (error) {
        console.log("Using mock data or database error:", error);
      }
      
      // Always call onRemove, which will handle mock data if needed
      onRemove();
    } catch (error) {
      console.error("Error removing saved movie:", error);
    }
  };

  const posterUrl = imageError 
    ? "https://placehold.co/240x360/1a1a1a/FFFFFF.png?text=No+Image" 
    : `https://image.tmdb.org/t/p/w500${movie.posterPath}`;

  return (
    <View className="mb-4 flex-row bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      <Pressable
        onPress={() => router.push(`/movies/${movie.movieId}`)}
        className="flex-row flex-1"
      >
        <Image
          source={{ uri: posterUrl }}
          className="w-24 h-36"
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
        <View className="p-3 flex-1 justify-between">
          <Text className="text-lg font-semibold text-white">{movie.title}</Text>
          <Text className="text-gray-400 text-xs">Saved on: {new Date(movie.createdAt).toLocaleDateString()}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={handleRemove}
        className="items-center justify-center p-4 bg-red-900"
      >
        <Image source={icons.save} className="w-6 h-6" tintColor="white" />
        <Text className="text-xs text-white mt-1">Unsave</Text>
      </Pressable>
    </View>
  );
};

export default SavedMovieCard; 