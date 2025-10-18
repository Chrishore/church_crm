"use client"
import { useRouter } from "next/navigation";

export default async function BackButton() {
    const router = useRouter();
    return (
        <button 
            onClick={() => router.back()}
            className="mt-6 text-blue-600 hover:text-blue-800 font-medium"
        >
            &larr; Back to Calendar
        </button>
    )
}