import { PasswordItem } from "@/types/password";
import axios from "axios";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<PasswordItem[], string> = () =>
  axios
    .get("http://localhost:8080/passwords/users", { withCredentials: true })
    .then((res) => res.data);

export function usePasswords() {
  const { data, error, isLoading, isValidating } = useSWR(
    "/api/passwords",
    fetcher
  );

  return {
    passwords: data,
    error,
    loading: isLoading,
    validating: isValidating,
  };
}
