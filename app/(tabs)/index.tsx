import ContactCard from "@/components/ContactCard";
import EmptyContacts from "@/components/EmptyContacts";
import { ThemedView } from "@/components/ThemedView";

import { StyleSheet, Pressable, Text, Dimensions, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const hasContact = [
    { id: "1", name: "John" },
    { id: "2", name: "Luisa" },
    { id: '3', name: "Doe" },
    { id: "4", name: "Sophia" },
    { id: "4", name: "Sophia" },
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
    <View style={styles.container}>
      {hasContact && (
        <Text style={styles.title}>Meus Contatos</Text>
      )}
       <ScrollView contentContainerStyle={styles.scrollView}>
        {renderContacts()}
      </ScrollView>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16,
    backgroundColor: "#fff", 
  },
  scrollView: {
    paddingBottom: 16, 
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
    // marginTop: 16,
    alignItems: "center",
    width: screenWidth * 0.6,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
