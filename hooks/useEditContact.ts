import { useMutation } from "@tanstack/react-query";
import { Contact } from "@/database/useContactsDatabase"; 
import { useContactsDatabase } from "@/database/useContactsDatabase";

export function useEditContact(contact: Contact) {
  const { updateOne } = useContactsDatabase();

  const { mutate, isError, isSuccess, isPending } = useMutation<boolean | Error, Error>({
    mutationKey: ["edit-contact"],
    mutationFn: () => updateOne(contact),
  });

  return { mutate, isError, isSuccess, isPending };
}
