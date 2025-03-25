import ProtectedRoute from '@/components/layout/ProtectedRoute'
import Sidebar from '@/components/layout/SideBar'

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
