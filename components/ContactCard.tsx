import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

interface ContactCardProps {
  contact: string;
}
export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <ThemedView style={styles.container}>
      <p>{contact}</p>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
