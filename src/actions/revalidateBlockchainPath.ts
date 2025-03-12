"use server";
import { revalidatePath } from "next/cache";

export async function refreshPage() {
    revalidatePath("/your-page-route");
}
