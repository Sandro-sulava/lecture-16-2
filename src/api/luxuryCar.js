import { API_BASE } from "../lib/constants";
import { handleResponse } from "../lib/handleReponse";

// ✅ Get all luxury cars (optionally filter by brand)
export async function getLuxuryCars(brand) {
  let url = brand
    ? `${API_BASE}/luxuryCar?brand=${brand}`
    : `${API_BASE}/luxuryCar`;

  const res = await fetch(url);

  return handleResponse(res);
}

// ✅ Get luxury car by ID
export async function getLuxuryCarById(id) {
  const res = await fetch(`${API_BASE}/luxuryCar/${id}`);

  return handleResponse(res);
}

// ✅ Create a new luxury car
//https://el-car-server-test.onrender.com/api/luxuryCar/createLuxuryCar
export async function createLuxuryCar(data) {
  const res = await fetch(`${API_BASE}/luxuryCar/createLuxuryCar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}
