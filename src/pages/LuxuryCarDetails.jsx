import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLuxuryCarById } from "../api/luxuryCar";

export default function LuxuryCarDetails() {
  const { id } = useParams();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["luxuryCar", id],
    queryFn: () => getLuxuryCarById(id),
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading car details...</p>
    );
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load car details.
      </p>
    );
  if (!car) return <p className="text-center mt-10">Car not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <Link
        to="/luxuryCars"
        className="text-blue-600 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Cars
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {/* ✅ Render car image (from Base64) */}
          {car.image && (
            <img
              src={car.image}
              alt={car.name}
              className="w-full rounded-xl shadow-md object-cover"
            />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold">{car.name}</h2>
          <p className="text-gray-700 text-lg">{car.model}</p>
          <p className="text-gray-500">{car.brand}</p>

          <p className="text-xl font-semibold text-green-600">${car.price}</p>

          <p className="text-sm text-gray-400">
            Added on {new Date(car.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
