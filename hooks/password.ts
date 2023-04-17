import { DetailPassword, PasswordItem } from "@/types/password";
import axios from "axios";
import useSWR, { Fetcher } from "swr";

let apiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
if (process.env.NODE_ENV === "production") {
  apiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;
}

const fetcher: Fetcher<PasswordItem[], string> = () =>
  axios
    .get(`${apiUrl}/passwords/users`, { withCredentials: true })
    .then((res) => res.data);

const getPassword: Fetcher<DetailPassword, string> = (url: string) =>
  axios
    .get(`${apiUrl}${url}`, { withCredentials: true })
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

export function usePassword(id: string | undefined) {
  const { data, error, isLoading, isValidating } = useSWR(
    id ? `/passwords/${id}` : null,
    getPassword
  );

  return {
    password: data,
    error,
    loading: isLoading,
    validating: isValidating,
  };
}
