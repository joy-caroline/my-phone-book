import { ThemedText } from "./ThemedText";
import { StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function EmptyContacts() {
  const router = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/register")}
    >
      <MaterialIcons size={64} name="person" color={"white"} />
      <ThemedText style={styles.title}>
        Você ainda não tem contatos aqui. Que tal começar adicionando alguém
        especial?
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 79,
    height: "100%",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});
