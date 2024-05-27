import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, {
    message: "Name must contain at least 3 character(s)",
  }),
  description: z.string().max(500, {
    message: "Description must contain at most 500 character(s)",
  }),
  images: z
    .object({
      fileKey: z.string(),
      fileName: z.string(),
      fileSize: z.number(),
      fileUrl: z.string(),
      key: z.string(),
      name: z.string(),
      size: z.number(),
      url: z.string(),
    })
    .array(),
  stock: z.coerce.number({
    required_error: "Quantity of available stock must be filled",
  }),
  categoryId: z.string().min(1),
  elementId: z.string().min(1),
  weightInGrams: z.coerce
    .number({
      required_error: "Weight of the product must be filled",
    })
    .optional(),
  xPercentageMetalAmount: z.coerce
    .number({
      required_error: "X Percentage of metal amount must be filled",
    })
    .optional(),
  discount: z.coerce
    .number({
      required_error: "Price must be filled",
    })
    .optional(),
  price: z.coerce
    .number({
      required_error: "Price must be filled",
    })
    .min(10, {
      message: "Price must be greater than or equal to Rp 1.000",
    })
    .max(100000000, {
      message: "Price must be lower than or equal to Rp 100.000.000",
    })
    .optional(),
});

export type productPayload = z.infer<typeof productSchema>;
