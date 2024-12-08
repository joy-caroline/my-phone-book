import React from "react";
import { Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedView } from "@/components/ThemedView"; // Certifique-se de importar o ThemedView
import { Colors } from "@/constants/Colors"; // Certifique-se de importar as cores
import { useColorScheme } from "react-native"; // Para pegar o esquema de cores do dispositivo

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const theme = useColorScheme() || 'light'; // Obtém o esquema de cores, 'light' por padrão
  const currentColors = Colors[theme]; // Obtemos as cores do tema atual

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
