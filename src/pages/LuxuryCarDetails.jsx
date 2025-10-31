import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Trash2, ArrowLeft } from "lucide-react";
import { deleteLuxuryCar, getLuxuryCarById } from "../api/luxuryCar";
import DeleteConfirmModal from "../component/DeleteConfirmModal";

export default function LuxuryCarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["luxuryCar", id],
    queryFn: () => getLuxuryCarById(id),
  });

  // ✅ Delete mutation
  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: deleteLuxuryCar,
    onSuccess: () => {
      toast.success("Car deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["luxuryCars"] });
      navigate("/luxuryCars");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete car");
      setShowDeleteModal(false);
    },
  });

  const confirmDelete = () => {
    handleDelete(id);
  };

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
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with Back Button and Delete */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
            <Link
              to="/luxuryCars"
              className="text-white hover:text-indigo-200 transition flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              <span>Back to Cars</span>
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <Trash2 size={18} />
              Delete Car
            </button>
          </div>

          {/* Car Content */}
          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Image Section */}
            <div className="flex-1">
              {car.image ? (
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full rounded-xl shadow-md object-cover max-h-96"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-gray-400 text-lg">
                    No Image Available
                  </span>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{car.name}</h2>
                <p className="text-xl text-gray-600 mt-1">{car.model}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {car.brand}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Price</p>
                <p className="text-4xl font-bold text-green-600">
                  ${Number(car.price).toLocaleString()}
                </p>
              </div>

              {car.createdAt && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Added on</p>
                  <p className="text-gray-700 mt-1">
                    {new Date(car.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        carName={car.name}
        isDeleting={isDeleting}
      />
    </>
  );
}
