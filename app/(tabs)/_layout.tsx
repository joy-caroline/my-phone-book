import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Header from "../header";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const currentColors = Colors[colorScheme ?? "light"];

  return (
    <ThemedView>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: currentColors.tabIconSelected,
          tabBarInactiveTintColor: currentColors.tabIconDefault,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: currentColors.background, 
            borderTopColor: currentColors.icon,
            position: Platform.OS === "ios" ? "absolute" : "relative",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            title: "Register",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person-add" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="details/[id]"
          options={{
            tabBarButton: () => null,
            headerShown: false,
            title: "Details",
          }}
        />
      </Tabs>
    </ThemedView>
  );
}
