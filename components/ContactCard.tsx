import { Dimensions, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

interface ContactCardProps {
  contact: {
    id: number;
    name: string;
  };
}
export default function ContactCard({ contact }: ContactCardProps) {
  const router = useRouter();

  const redirectDetails = () => {
    router.push(`/details/${contact.id}`);
  };
  return (
    <Pressable style={styles.container} onPress={redirectDetails}>
      <MaterialIcons size={32} name="person" color="#000" />
      <ThemedText style={styles.contact} type="title">
        {contact.name}{" "}
      </ThemedText>
    </Pressable>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    maxWidth: screenWidth * 0.8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: screenWidth * 0.02,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    padding: 16,
    height: 60,
    gap: 16,
    marginHorizontal: 16,
  },
  contact: {
    color: "#000",
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 1,
  },
});
