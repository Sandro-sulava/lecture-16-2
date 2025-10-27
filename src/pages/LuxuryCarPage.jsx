import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getLuxuryCars } from "../api/luxuryCar";

export default function LuxuryCarsPage() {
  const [brand, setBrand] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["luxuryCars", brand],
    queryFn: () => getLuxuryCars(brand),
  });

  const brands = ["BMW", "Mercedes-Benz", "Audi", "Lexus"];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex gap-3 justify-center mb-6">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setBrand(brand === b ? null : b)}
            className={`px-4 py-2 rounded-lg border transition cursor-pointer ${
              brand === b ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="min-h-[200px] flex justify-center items-center">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading cars...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load cars.</p>
        ) : data && data.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {data.map((car) => (
              <Link
                key={car.id}
                to={`/luxuryCars/${car.id}`}
                className="block p-4 border rounded-xl shadow hover:shadow-lg transition bg-white"
              >
                <h3 className="text-xl font-semibold">{car.brand}</h3>
                <p className="text-gray-600">{car.model}</p>
                <p className="text-gray-500 text-sm">{car.price}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No cars found.</p>
        )}
      </div>
    </div>
  );
}
