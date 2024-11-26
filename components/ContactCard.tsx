import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ContactCardProps {
  contact: {
    name: string;
  };
}
export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <ThemedView style={styles.container}>
      <MaterialIcons size={32} name="person" color="#000" />
      <ThemedText style={styles.contact} type="title">
        {contact.name}{" "}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 350,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "2%",
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    padding: 16,
    height: 60,
    gap: 16,
  },
  contact: {
    color: "#000",
    fontSize: 16,
    fontWeight: 700,
  },
});
