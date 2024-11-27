import ContactCard from "@/components/ContactCard";
import EmptyContacts from "@/components/EmptyContacts";
import { ThemedView } from "@/components/ThemedView";

import { StyleSheet, Pressable, Text, Dimensions } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const hasContact = [
    { name: "John" },
    { name: "Luisa" },
    { name: "Doe" },
    { name: "Sophia" },
  ];

  //Descomente para ver o estado de vazio
  // const hasContact = [];

  const renderContacts = () => {
    return hasContact.length > 0 ? (
      hasContact.map((contact) => (
        <ContactCard key={contact.name} contact={contact} />
      ))
    ) : (
      <EmptyContacts />
    );
  };

  return (
    <ThemedView style={styles.container}>
      {renderContacts()}{" "}
      {hasContact.length > 0 && (
        <Pressable
          style={styles.button}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.buttonText}>Adicionar Contato</Text>
        </Pressable>
      )}
    </ThemedView>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    padding: 16,
    maxWidth: screenWidth * 0.95,
    width: "100%",
  },
  button: {
    backgroundColor: "#BBB",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
