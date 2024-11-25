// Additional part for a base component
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

export default function Header() {
  return (
    <ThemedView style={styles.header}>
      <ThemedText>My Phone Book</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7A7A7A",
    maxHeight: 79,
    height: "100%",
  },
  title: {
    color: "#FFFFFF",
  },
});
