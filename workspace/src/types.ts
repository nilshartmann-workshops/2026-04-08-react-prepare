import { z } from "zod/v4";

export const PlantSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  wateringInterval: z.number().min(1),
  lastWatered: z.string().optional(),
});

export type Plant = z.infer<typeof PlantSchema>;
