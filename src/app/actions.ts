"use server";

import { revalidatePath } from "next/cache";

export default async function revalidatePaths(path: string) {
  revalidatePath(path);
}
