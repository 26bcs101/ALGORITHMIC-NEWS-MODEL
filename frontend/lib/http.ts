export async function readJsonResponse<T>(response: Response): Promise<T> {
  try {
    const text = await response.text();
    if (!text) {
      return {} as T;
    }
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    return {} as T;
  }
}
