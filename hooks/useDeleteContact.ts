import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContactsDatabase } from "@/database/useContactsDatabase";

export function useDeleteContact(id: number) {
  const { deleteOne } = useContactsDatabase();
  const queryClient = useQueryClient();

  const { mutate: deleteContact, isError, isSuccess, isPending, error } = useMutation<
    boolean | Error,
    Error
  >({
    mutationKey: ["delete-contact-by-id", id], 
    mutationFn: () => deleteOne(id),
    onError: (error) => {
      console.error(error);
    },
  });

  return { deleteContact, isError, isSuccess, isPending, error};
}