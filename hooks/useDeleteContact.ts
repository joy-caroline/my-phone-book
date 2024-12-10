import { useMutation } from "@tanstack/react-query";
import { useContactsDatabase } from "@/database/useContactsDatabase";

export function useDeleteContact(id: number) {
  const { deleteOne } = useContactsDatabase();

  const { mutate, isError, isSuccess, isPending } = useMutation<boolean | Error, Error>({
    mutationKey: ["delete-contact-by-id"],
    mutationFn: () => deleteOne(id),
  });

  return { mutate, isError, isSuccess, isPending };
}
