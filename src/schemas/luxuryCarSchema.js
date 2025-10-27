import { z } from "zod";

export const brands = ["BMW", "Mercedes-Benz", "Audi", "Lexus"];

export const luxuryCarSchema = z.object({
  brand: z.enum(brands, { message: "Please select a valid brand" }),
  name: z.string().min(1, "Name is required"),
  model: z.string().min(1, "model is required"),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be positive"),
  image: z.string().min(1, "Image is required (upload one)"),
});
