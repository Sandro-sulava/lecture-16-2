export async function handleResponse(res) {
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(text);
  }
  if (res.status === 204) return null;
  return res.json();
}
