import { useAuth } from "@clerk/nextjs";
import { useState, useCallback } from "react";

export function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { getToken } = useAuth();

  const fetchData = async (endpoint: string, method: string, values: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/${endpoint}`, {
        method: method || "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setIsLoading(false);
      return result;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
}
