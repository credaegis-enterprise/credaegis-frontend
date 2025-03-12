"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RefreshOnNav() {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    return null;
}
