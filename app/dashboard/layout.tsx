import ProtectedRoute from '@/components/layout/ProtectedRoute'
import Sidebar from '@/components/layout/SideBar'
import Providers from '@/providers'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className='flex-1 overflow-x-hidden p-6'>
        <Providers>{children}</Providers>
      </main>
    </div>
  )
}
