import { useQuery } from "@tanstack/react-query";
import { Contact } from "@/database/useContactsDatabase"; 
import { useContactsDatabase } from "@/database/useContactsDatabase";

export function useGetAllContacts({id} : Pick<Contact, "id">) {
  const { findById } = useContactsDatabase();

  const { data, isLoading, isError } = useQuery<Contact | null, Error>({
    queryKey: ["contact-by-id", id],
    queryFn: () => findById(id), 
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, isError };
}
