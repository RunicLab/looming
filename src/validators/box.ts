import { z } from "zod"

export const BOX_NAME_VALIDATOR = z
    .string()
    .min(1, "Box name is required.")
    .regex(
        /^[a-zA-Z0-9-]+$/,
        "Box name can only contain letters, numbers or hypens."
    )
