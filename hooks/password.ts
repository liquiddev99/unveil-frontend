import { DetailPassword, PasswordItem } from "@/types/password";
import axios from "axios";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<PasswordItem[], string> = () =>
  axios
    .get("http://localhost:8080/passwords/users", { withCredentials: true })
    .then((res) => res.data);

const getPassword: Fetcher<DetailPassword, string> = (url: string) =>
  axios
    .get(`http://localhost:8080${url}`, { withCredentials: true })
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

export function usePassword(name: string | undefined) {
  const { data, error, isLoading, isValidating } = useSWR(
    name ? `/passwords/name/${name}` : null,
    getPassword
  );

  return {
    password: data,
    error,
    loading: isLoading,
    validating: isValidating,
  };
}
