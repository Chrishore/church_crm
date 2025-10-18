"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddMemberPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        homePhone: "",
        cellPhone: "",
        dateOfBirth: "",
        gender: "",
        classification: "",
        role: "",
        address: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("/api/members", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        toast.success("Member added successfully!");
        router.push("/members");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Add Member</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow">
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 rounded" />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 rounded" />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
                <input name="homePhone" placeholder="Home Phone" value={formData.homePhone} onChange={handleChange} className="border p-2 rounded" />
                <input name="cellPhone" placeholder="Cell Phone" value={formData.cellPhone} onChange={handleChange} className="border p-2 rounded" />
                <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} className="border p-2 rounded" />
                <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded">
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <input name="classification" placeholder="Classification" value={formData.classification} onChange={handleChange} className="border p-2 rounded" />
                <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="border p-2 rounded" />
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 rounded col-span-2" />
                <div className="col-span-2 flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Save Member
                    </button>
                </div>
            </form>
        </div>
    );
}
