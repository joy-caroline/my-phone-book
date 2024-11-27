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
      {hasContact && (
        <Text style={styles.title}>Meus Contatos</Text>
      )}
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
    padding: 16,
    maxWidth: screenWidth,
    width: "100%",
    paddingTop: 32,
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#000', 
    marginBottom: 8, 
    paddingBottom: 16, 
    textAlign: "center"
  },
  button: {
    backgroundColor: "#BBB",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    width: screenWidth * 0.4,
    height: "auto"
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
