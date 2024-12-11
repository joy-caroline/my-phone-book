import { useMutation } from "@tanstack/react-query";
import { Contact } from "@/database/useContactsDatabase"; 
import { useContactsDatabase } from "@/database/useContactsDatabase";

export function useAddContact() {
  const { create } = useContactsDatabase();

  const { mutate, isError, isPending, error } = useMutation<
    Pick<Contact, "id">, 
    Error, 
    Omit<Contact, "id">
  >({
    mutationKey: ["contacts"],
    mutationFn: (data: Omit<Contact, "id">) => create(data),
    onError: (error) => {
      console.error("Erro ao criar contato:", error.message);
    },
  });

  return { mutate, isError, isPending, error };
}
