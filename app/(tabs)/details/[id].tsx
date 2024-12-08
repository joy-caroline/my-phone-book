import React from "react";
import { Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ContactForm } from "@/components/ContactForm";


export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Pagina de detalhes : {id}</Text>
      <MaterialIcons name="person" size={24} color="black" />
      {/* <ContactForm /> */}
    </View>
  )
}