import React from "react";
import { Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedView } from "@/components/ThemedView"; 
import { Colors } from "@/constants/Colors"; 
import { useColorScheme } from "react-native"; 
import { ContactForm } from "@/components/ContactForm";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const theme = useColorScheme() || 'light'; 
  const currentColors = Colors[theme]; 

  return (
    <ThemedView style={[styles.container, { backgroundColor: currentColors.background }]}>
      <Text style={[styles.title, { color: currentColors.text }]}>
        Página de detalhes: {id}
      </Text>
      <MaterialIcons name="person" size={24} color={currentColors.text} />
      {/* <ContactForm /> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
