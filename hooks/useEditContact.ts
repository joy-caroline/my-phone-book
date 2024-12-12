import { useMutation } from "@tanstack/react-query";
import { Contact } from "@/database/useContactsDatabase"; 
import { useContactsDatabase } from "@/database/useContactsDatabase";

export function useEditContact() {
  const { updateOne } = useContactsDatabase();

  const { mutate: editContact, isError, isPending, error } = useMutation<boolean | Error, Error, Contact>({
    mutationKey: ["edit-contact"],
    mutationFn: (contact: Contact) => updateOne(contact),
  });

  return { editContact, isError, error, isPending };
}
