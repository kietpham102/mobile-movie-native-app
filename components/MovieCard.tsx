// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View, Pressable, ActivityIndicator } from "react-native";
import { icons } from "@/constants/icons";
import { isMovieSaved, saveMovie } from "@/services/appwrite";

// For demo purposes, using a hardcoded user ID
const DEMO_USER_ID = "user123";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  overview,
  backdrop_path,
  ...rest
}: Movie) => {
  const [isSaved, setIsSaved] = useState(false);
  const [savingMovie, setSavingMovie] = useState(false);

  useEffect(() => {
    // Check if the movie is already saved
    const checkIfSaved = async () => {
      try {
        const savedStatus = await isMovieSaved(Number(id), DEMO_USER_ID);
        setIsSaved(savedStatus);
      } catch (error) {
        console.error("Error checking if movie is saved:", error);
      }
    };

    checkIfSaved();
  }, [id]);

  const handleSaveMovie = async (event) => {
    event.stopPropagation();
    
    if (savingMovie) return;
    
    try {
      setSavingMovie(true);
      
      if (!isSaved) {
        const movieData = {
          id: Number(id),
          title,
          poster_path,
          backdrop_path,
          overview,
          vote_average,
          vote_count: 0,
          release_date,
          genre_ids: []
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
    <View className="w-[30%]">
      <Link href={`/movies/${String(id)}`} asChild>
        <TouchableOpacity className="relative">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />

          <Pressable 
            onPress={handleSaveMovie}
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
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

          <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
            {title}
          </Text>

          <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase">
              {Math.round(vote_average / 2)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-light-300 font-medium mt-1">
              {release_date?.split("-")[0]}
            </Text>
            <Text className="text-xs font-medium text-light-300 uppercase">
              Movie
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default MovieCard;
