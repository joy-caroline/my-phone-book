import { useQuery } from "@tanstack/react-query";
import { Contact } from "@/database/useContactsDatabase"; 
import { useContactsDatabase } from "@/database/useContactsDatabase";

export function useGetAllContacts() {
  const { findAll } = useContactsDatabase();

  const { data, isLoading, isError } = useQuery<Contact[], Error>({
    queryKey: ["contacts"],
    queryFn: (): Promise<Contact[]> => findAll(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });

  return { data, isLoading, isError };
}
