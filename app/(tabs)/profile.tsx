import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { getSavedMovies } from "@/services/appwrite";
import { SavedMovie } from "@/types/movie";
import { icons } from "@/constants/icons";
import { generateMockSavedMovies } from "@/utils/mockData";

// For demo purposes, using hardcoded user data
const DEMO_USER = {
  id: "kietpham102",
  name: "Kiet Pham",
  email: "anhkietpham.hcmus@gmail.com",
  avatarUrl: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/474471509_1260757671852455_6255869235214411418_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=qdHjguFAkBEQ7kNvgHJJyfY&_nc_oc=AdkDNdGdFpGj2edLfgSv3Z_dlrr7eo1CVZdYt4uFMceeYGlhGg8pIkJvnE1h_Y07bTE&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=uRRcBj2soxvhHSjEm0PQeg&oh=00_AYGwt03vO8-qLCmrBuT43sTng_4VTuVAvylq13sXC2yQvQ&oe=67EC004B",
  joinDate: "2025-03-12",
};

// Set to true to use mock data instead of API calls
const USE_MOCK_DATA = true;

const Profile = () => {
  const [savedMovies, setSavedMovies] = useState<SavedMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedMovies = async () => {
      try {
        setLoading(true);
        
        // First try real API call if mock data is disabled
        if (!USE_MOCK_DATA) {
          try {
            const movies = await getSavedMovies(DEMO_USER.id);
            setSavedMovies(movies);
            setLoading(false);
            return;
          } catch (error) {
            console.log("Falling back to mock data due to API error:", error);
            // Fall back to mock data silently if there's an error
          }
        }
        
        // Use mock data (either by choice or as fallback)
        setTimeout(() => {
          const mockMovies = generateMockSavedMovies(6); // Get 6 mock movies
          setSavedMovies(mockMovies);
          setLoading(false);
        }, 500);
      } catch (error) {
        // This catch should never execute since we're catching all errors above
        console.error("Unexpected error in fetchSavedMovies:", error);
        // Always fall back to mock data
        const mockMovies = generateMockSavedMovies(6);
        setSavedMovies(mockMovies);
        setLoading(false);
      }
    };

    fetchSavedMovies();
  }, []);

  // Calculate statistics
  const totalSaved = savedMovies.length;
  const joinedDate = new Date(DEMO_USER.joinDate);
  const daysSinceJoined = Math.floor(
    (new Date().getTime() - joinedDate.getTime()) / (1000 * 3600 * 24)
  );

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Profile Header */}
      <View className="bg-primary p-10 items-center">
        <Image
          source={{ uri: DEMO_USER.avatarUrl }}
          className="w-24 h-24 rounded-full border-2 border-white"
        />
        <Text className="text-white text-xl font-bold mt-2">{DEMO_USER.name}</Text>
        <Text className="text-gray-200">{DEMO_USER.email}</Text>
        <Text className="text-gray-200 mt-1">
          Member since {joinedDate.toLocaleDateString()}
        </Text>
      </View>

      {/* Stats Section */}
      <View className="p-6">
        <Text className="text-xl font-bold mb-4 text-primary">Your Stats</Text>
        <View className="flex-row justify-between bg-gray-50 p-4 rounded-lg">
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-primary">{totalSaved}</Text>
            <Text className="text-gray-500">Saved Movies</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-primary">{daysSinceJoined}</Text>
            <Text className="text-gray-500">Days Active</Text>
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <View className="p-6">
        <Text className="text-xl font-bold mb-4 text-primary">Account</Text>
        <View className="bg-gray-50 rounded-lg overflow-hidden">
          <Pressable
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => {}}
          >
            <Image source={icons.person} className="w-6 h-6 mr-3" />
            <Text className="text-gray-700">Edit Profile</Text>
          </Pressable>
          <Pressable
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => {}}
          >
            <Image source={icons.star} className="w-6 h-6 mr-3" />
            <Text className="text-gray-700">Preferences</Text>
          </Pressable>
          <Pressable
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => {}}
          >
            <Image source={icons.arrow} className="w-6 h-6 mr-3" />
            <Text className="text-gray-700">Sign Out</Text>
          </Pressable>
        </View>
      </View>

      {/* App Information */}
      <View className="p-6 mb-6">
        <Text className="text-xl font-bold mb-4 text-primary">About</Text>
        <View className="bg-gray-50 rounded-lg overflow-hidden">
          <Pressable
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => {}}
          >
            <Text className="text-gray-700">Privacy Policy</Text>
          </Pressable>
          <Pressable
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => {}}
          >
            <Text className="text-gray-700">Terms of Service</Text>
          </Pressable>
          <Pressable
            className="flex-row items-center p-4"
            onPress={() => {}}
          >
            <Text className="text-gray-700">App Version 1.0.0</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
