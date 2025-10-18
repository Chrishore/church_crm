export default function Navbar() {
    return (
        <div className="flex justify-between items-center bg-white shadow px-6 py-3">
            <h1 className="text-lg font-semibold">Welcome to ChurchCRM</h1>
            <div className="flex items-center gap-4">
                <span>Church Admin</span>
                <img src="/icons/user.svg" alt="user" className="w-8 h-8 rounded-full" />
            </div>
        </div>
    );
}
