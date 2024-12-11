import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Contact } from "@/database/useContactsDatabase";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useEditContact } from "@/hooks/useEditContact";
import { useGetContactById } from "@/hooks/useGetContactById";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const theme = useColorScheme() || "light";
  const currentColors = Colors[theme];

  // Hook para buscar o contato por ID
  const { data: contact, isLoading } = useGetContactById(Number(id));

  // Estados para os campos
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Atualiza os estados quando o contato é carregado
  useEffect(() => {
    if (contact) {
      setNome(contact.name);
      setTelefone(contact.phone);
      setEmail(contact.email);
    }
  }, [contact]);

  useEffect(() => {
    setIsButtonDisabled(true);
  }, [nome, telefone, email]);

  const handleSaveContact = async () => {
    Alert.alert("Sucesso", `Contato ${nome} editado com sucesso!`);
  };

  const themedStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: Colors[theme].background,
    },
    content: {
      flexGrow: 1,
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: Colors[theme].text,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: Colors[theme].text,
    },
    input: {
      height: 50,
      borderColor: Colors[theme].border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: Colors[theme].inputBackground,
      color: Colors[theme].text,
    },
    customButton: {
      backgroundColor: Colors[theme].buttonBackground,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 16,
    },
    customButtonText: {
      color: Colors[theme].buttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  if (isLoading) {
    return (
      <ThemedView style={themedStyles.container}>
        <Text style={themedStyles.title}>Carregando...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={themedStyles.container}>
      <ScrollView contentContainerStyle={themedStyles.content}>
        <Text style={themedStyles.label}>Nome</Text>
        <TextInput
          style={themedStyles.input}
          placeholder="Digite o nome da pessoa"
          placeholderTextColor={Colors[theme].border}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={themedStyles.label}>Número de telefone</Text>
        <TextInput
          style={themedStyles.input}
          placeholder="Digite o número de contato"
          placeholderTextColor={Colors[theme].border}
          keyboardType="numeric"
          value={telefone}
          onChangeText={setTelefone}
        />

        <Text style={themedStyles.label}>Endereço de e-mail</Text>
        <TextInput
          style={themedStyles.input}
          placeholder="Digite o endereço de e-mail"
          placeholderTextColor={Colors[theme].border}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <ThemedView>
          <TouchableOpacity
            style={themedStyles.customButton}
            onPress={handleSaveContact}
            >
            <Text style={themedStyles.customButtonText}>Excluir contato</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={themedStyles.customButton}
            onPress={handleSaveContact}
            disabled={isButtonDisabled}
          >
            <Text style={themedStyles.customButtonText}>Editar contato</Text>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
