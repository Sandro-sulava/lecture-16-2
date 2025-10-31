import { useParams, Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLuxuryCarById } from "../api/luxuryCar";
import toast from "react-hot-toast";

export default function LuxuryCarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["luxuryCar", id],
    queryFn: () => getLuxuryCarById(id),
  });

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: deleteLuxuryCar,
    onSuccess: () => {
      toast.success("car deleted succesfully"), navigate("/luxuryCars");
    },
    onError: (error) => {
      toast.error(error?.message || "failed to delete car");
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-500">Loading car details...</p>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-center mt-10 text-red-500 bg-red-50 p-4 rounded-lg">
          Failed to load car details.
        </p>
        <Link
          to="/luxuryCars"
          className="text-blue-600 hover:underline text-sm mt-4 inline-block"
        >
          ← Back to Cars
        </Link>
      </div>
    );
  if (!car)
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-center mt-10 text-gray-500">Car not found.</p>
        <Link
          to="/luxuryCars"
          className="text-blue-600 hover:underline text-sm mt-4 inline-block"
        >
          ← Back to Cars
        </Link>
      </div>
    );
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
