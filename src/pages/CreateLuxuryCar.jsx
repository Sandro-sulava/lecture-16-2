import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { brands, luxuryCarSchema } from "../schemas/luxuryCarSchema";

import toast from "react-hot-toast";
import { createLuxuryCar } from "../api/luxuryCar";

const CreateLuxuryCar = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(luxuryCarSchema),
    defaultValues: { brand: "", name: "", model: "", price: "", image: "" },
  });

  // ✅ Upload image -> convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      setValue("image", base64); // push into form
    };
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createLuxuryCar,
    onSuccess: () => {
      toast.success("Luxury car created successfully!");
      reset();
      setPreview(null);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create car");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="max-w-lg mx-auto bg-white/5 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Luxury Car</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* BRAND SELECT */}
        <div>
          <label className="block text-sm mb-1">Brand</label>
          <select
            {...register("brand")}
            className="w-full p-2 rounded-md border border-slate-600"
            defaultValue=""
          >
            <option value="" disabled>
              Select brand
            </option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.brand && (
            <p className="text-red-400 text-sm mt-1">{errors.brand.message}</p>
          )}
        </div>

        {/* NAME */}
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 rounded-md border border-slate-600"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* MODEL */}
        <div>
          <label className="block text-sm mb-1">Model</label>
          <input
            type="text"
            {...register("model")}
            className="w-full p-2 rounded-md border border-slate-600"
          />
          {errors.model && (
            <p className="text-red-400 text-sm mt-1">{errors.model.message}</p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-sm mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full p-2 rounded-md border border-slate-600"
          />
          {errors.price && (
            <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <div
            className="border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 transition"
            onClick={() => fileInputRef.current.click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-40 rounded-md object-cover"
              />
            ) : (
              <p className="text-slate-400 text-sm">Click to select image</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
          {errors.image && (
            <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-60"
          >
            {isPending ? "Creating..." : "Create"}
          </button>

          <button
            type="button"
            onClick={() => {
              reset();
              setPreview(null);
              toast.success("Form cleared");
            }}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLuxuryCar;
