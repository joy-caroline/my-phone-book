import { ThemedText } from "./ThemedText";
import { StyleSheet, Pressable, useColorScheme } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function EmptyContacts() {
  const router = useRouter();
  const theme = useColorScheme() || "light";
  const currentColors = Colors[theme];

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: 79,
      height: "100%",
      marginTop: 200,
      gap: 16
    },
    title: {
      color: currentColors.text,
      fontSize: 16,
      textAlign: "center",
    },
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/register")}
    >
      <MaterialIcons name="person-add-alt-1" size={64} color={currentColors.icon} />
      <ThemedText style={styles.title}>
        Você ainda não tem contatos aqui. Que tal começar adicionando alguém
        especial?
      </ThemedText>
    </Pressable>
  );
}


