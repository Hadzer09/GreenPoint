// layout.tsx jadi sangat pendek dan bersih
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar /> {/* <--- Semua urusan saldo pindah ke sini */}
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}