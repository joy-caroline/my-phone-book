import ContactCard from "@/components/ContactCard";
import EmptyContacts from "@/components/EmptyContacts";
import { ThemedView } from "@/components/ThemedView";

import { StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { useGetAllContacts } from "@/hooks/useGetAllContacts";
export default function HomeScreen() {
  const { data: hasContacts } = useGetAllContacts();

  const renderContacts = () => {
    return hasContacts && hasContacts.length > 0 ? (
      hasContacts.map((contact) => (
        <ContactCard key={contact.id} contact={{ id: contact.id, name: contact.name }} />
      ))
    ) : (
      <EmptyContacts />
    );
  };

  return (
    <ThemedView style={styles.container}>
      {hasContacts && <Text style={styles.title}>Meus Contatos</Text>}
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
