import { auth } from "@clerk/nextjs/server";

export async function fetchFromServer(endpoint: string) {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await fetch(`http://localhost:5000/api/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // In a real application, this would be an API call or database query
  return response.json();
}
