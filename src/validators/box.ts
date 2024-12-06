import { z } from "zod"

export const BOX_NAME_VALIDATOR = z
    .string()
    .min(3, "Box name is required.")

