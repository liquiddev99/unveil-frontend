import axios from "axios";
import useSWR from "swr";

const fetcher = () =>
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
