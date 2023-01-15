import { createClient } from "pexels";
import { PEXELS_API_KEY } from "@env";

export const client = createClient(PEXELS_API_KEY);
