import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { getSavedMovies } from "@/services/appwrite";
import { SavedMovie } from "@/types/movie";
import SavedMovieCard from "@/components/SavedMovieCard";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import '../global.css';
import { generateMockSavedMovies } from "@/utils/mockData";

// For demo purposes, using a hardcoded user ID
const DEMO_USER_ID = "user123";
// Set to true to use mock data instead of API calls
const USE_MOCK_DATA = true;

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<SavedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedMovies = async () => {
    try {
      setLoading(true);
      
      // Always try to use real data first if mock data is disabled
      if (!USE_MOCK_DATA) {
        try {
          const movies = await getSavedMovies(DEMO_USER_ID);
          setSavedMovies(movies);
          setLoading(false);
          return;
        } catch (err) {
          console.log("Falling back to mock data due to API error:", err);
          // Fall back to mock data silently if there's an API error
        }
      }
      
      // Use mock data (either by choice or as fallback)
      setTimeout(() => {
        const mockMovies = generateMockSavedMovies(6); // Get 6 mock movies
        setSavedMovies(mockMovies);
        setLoading(false);
        // Clear any existing error since we're showing data
        setError(null);
      }, 1000);
    } catch (err) {
      // This catch block should never execute since we're catching all errors above
      // But keeping it as an additional safety net
      console.error("Unexpected error in fetchSavedMovies:", err);
      // Always fall back to mock data
      const mockMovies = generateMockSavedMovies(6);
      setSavedMovies(mockMovies);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedMovies();
  }, []);

  const handleRemove = (movieId: string) => {
    // Just filter out the removed movie from state
    // This works for both mock and real data
    setSavedMovies(savedMovies.filter(movie => movie.id !== movieId));
  };

  if (loading) {
    return (
    <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <ActivityIndicator size="large" color="#ffffff" className="mt-10" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <Text className="text-lg text-white font-bold mb-4">Your Saved Movies</Text>
        
        {savedMovies.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-gray-300 text-lg">You haven't saved any movies yet</Text>
          </View>
        ) : (
          <FlatList
            data={savedMovies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SavedMovieCard movie={item} onRemove={() => handleRemove(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
}

export default Saved;