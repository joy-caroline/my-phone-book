import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useEditContact } from "@/hooks/useEditContact";
import { useGetContactById } from "@/hooks/useGetContactById";
import { useDeleteContact } from "@/hooks/useDeleteContact";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useColorScheme() || "light";

  const { data: contact, isLoading } = useGetContactById(Number(id));
  const { editContact } = useEditContact();
  const { deleteContact } = useDeleteContact(Number(id));

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (contact) {
      setNome(contact.name);
      setTelefone(contact.phone);
      setEmail(contact.email);
    }
  }, [contact]);

  useEffect(() => {
    setIsButtonDisabled(true);
    const hasChanges =
      nome !== contact?.name ||
      telefone !== contact?.phone ||
      email !== contact?.email;
    const isValid = nome.trim() && telefone.trim() && email.trim();
    setIsButtonDisabled(!hasChanges || !isValid);
  }, [nome, telefone, email]);

  const handleEditContact = async () => {
    editContact(
      { id: Number(id), name: nome, phone: telefone, email },
      {
        onSuccess: () => {
          Alert.alert("Sucesso", `Contato ${nome} editado com sucesso!`);
          router.back();
        },
        onError: (error) => {
          Alert.alert("Erro", error?.message);
        },
      }
    );
  };

  function handleDeleteContact() {
    Alert.alert("Confirmação", "Deseja mesmo excluir o contato?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            await deleteContact();
            Alert.alert("Sucesso", "Contato excluído com sucesso!");
            router.back();
          } catch (error) {
            Alert.alert("Erro ao excluir contato.");
          }
        },
      },
    ]);
  }

  const screenWidth = Dimensions.get("window").width;

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
    containerButtons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    customButton: {
      backgroundColor: Colors[theme].buttonBackground,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 16,
      width: screenWidth * 0.4,
    },
    customButtonDisabled: {
      backgroundColor: Colors[theme].disabledButtonBackground || "#d3d3d3",
      opacity: 0.6,
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
      <Text style={themedStyles.title}>Detalhes</Text>
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

        <ThemedView style={themedStyles.containerButtons}>
          <TouchableOpacity
            style={themedStyles.customButton}
            onPress={handleDeleteContact}
          >
            <Text style={themedStyles.customButtonText}>Excluir contato</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              themedStyles.customButton,
              isButtonDisabled && themedStyles.customButtonDisabled,
            ]}
            onPress={handleEditContact}
            disabled={isButtonDisabled}
          >
            <Text style={themedStyles.customButtonText}>Editar contato</Text>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
