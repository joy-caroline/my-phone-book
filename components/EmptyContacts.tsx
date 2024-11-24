import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";

export default function EmptyContacts() {
  return (
    <ThemedView>
      <IconSymbol size={64} name="person.2.circle.fill" color={"black"} />
      <ThemedText>
        Você ainda não tem contatos aqui. Que tal começar adicionando alguém
        especial?
      </ThemedText>
    </ThemedView>
  );
}
