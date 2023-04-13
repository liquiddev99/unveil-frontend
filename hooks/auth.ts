import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export function useAuth() {
  const { data, error, isLoading, isValidating } = useSWR("/api/auth", fetcher);

  if (error) {
    return { authenticated: false, user: null };
  }

  return {
    authenticated: Boolean(data),
    user: data,
    loading: isLoading,
    validating: isValidating,
  };
}
