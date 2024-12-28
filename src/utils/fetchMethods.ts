export async function postRequest(endpoint: string, values: any) {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating application:", error);
  }
}
