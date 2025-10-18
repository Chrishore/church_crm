import Sidebar from "./dashboard/components/Sidebar";
import Navbar from "./dashboard/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-100">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                    <Toaster position="top-right" />
                </main>
            </div>
        </div>
    );
}
