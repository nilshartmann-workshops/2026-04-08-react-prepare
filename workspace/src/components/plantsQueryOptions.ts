import { queryOptions } from "@tanstack/react-query";
import ky from "ky";
import { z } from "zod/v4";

import { PlantSchema } from "../types.ts";

export const plantsQueryOptions = () =>
  queryOptions({
    queryKey: ["plants"],
    queryFn: async () => {
      const data = await ky
        .get("http://localhost:7200/api/plants", { retry: 0 })
        .json();
      return z.array(PlantSchema).parse(data);
    },
  });
