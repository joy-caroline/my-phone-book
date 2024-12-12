import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { Contact } from "@/database/useContactsDatabase";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAddContact } from "@/hooks/useAddContact";

export default function CadastroScreen() {
  const theme = useColorScheme() || "light";
  const currentColors = Colors[theme];
  const router = useRouter();


  const { mutate: addContact } = useAddContact();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const handleSaveContact = async () => {
    addContact(
      { name: nome, phone: telefone, email },
      {
        onSuccess: () => {
          Alert.alert("Sucesso", `Contato ${nome} cadastrado com sucesso!`);
          setNome("");
          setTelefone("");
          setEmail("");
          router.back();
        },
        onError: (error) => {
          Alert.alert("Erro", error.message);
        },
      }
    );
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

        <TouchableOpacity
          style={themedStyles.customButton}
          onPress={handleSaveContact}
        >
          <Text style={themedStyles.customButtonText}>Salvar contato</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}
