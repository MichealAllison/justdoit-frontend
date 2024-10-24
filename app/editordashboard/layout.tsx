import ProtectedRoute from '@/components/ProtectedRoute'
import Sidebar from '@/components/SideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className='flex-1 p-6'>
        <ProtectedRoute>{children}</ProtectedRoute>
      </main>
    </div>
  )
}
