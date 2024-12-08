import ContactCard from "@/components/ContactCard";
import EmptyContacts from "@/components/EmptyContacts";
import { ThemedView } from "@/components/ThemedView";

import { StyleSheet, Text, Dimensions, ScrollView } from "react-native";

export default function HomeScreen() {

  const hasContact = [
    { id: "1", name: "John" },
    { id: "2", name: "Luisa" },
    { id: "3", name: "Doe" },
    { id: "4", name: "Sophia" },
    { id: "5", name: "Sophia Paião" },
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
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderContacts()}
      </ScrollView>
    </ThemedView>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  scrollView: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    paddingBottom: 16,
    color: "inherit",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: screenWidth * 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
