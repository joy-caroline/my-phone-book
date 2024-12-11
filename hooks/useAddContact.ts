import { useMutation } from "@tanstack/react-query";
import { Contact } from "@/database/useContactsDatabase"; 
import { useContactsDatabase } from "@/database/useContactsDatabase";

export function useAddContact() {
  const { create } = useContactsDatabase();

  const { mutate, isError, isSuccess, isPending } = useMutation<Pick<Contact, "id">, Error, Omit<Contact, "id">>({
    mutationKey: ["contacts"],
    mutationFn: (data: Omit<Contact, "id">) => create(data),
  });

  return { mutate, isError, isSuccess, isPending };
}
