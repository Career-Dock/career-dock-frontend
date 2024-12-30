import revalidatePaths from "@/app/actions";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";

export function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { getToken } = useAuth();

  const fetchData = async (
    endpoint: string,
    method: string,
    values: any,
    revalPath?: string
  ) => {
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
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      if (revalPath) {
        await revalidatePaths(revalPath);
      }
      toast.success(result.message);
      setIsLoading(false);
      return result;
    } catch (error: any) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
}
