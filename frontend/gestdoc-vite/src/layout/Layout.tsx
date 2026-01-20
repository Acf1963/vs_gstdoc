import Sidebar from './Sidebar'
import Header from './Header'
import Breadcrumbs from './Breadcrumbs'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="px-6 py-4">
          <Breadcrumbs />
          <main className="mt-4">{children}</main>
        </div>
      </div>
    </div>
  )
}
