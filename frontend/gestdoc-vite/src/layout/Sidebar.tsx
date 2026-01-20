import { NavLink } from 'react-router-dom'
import { DocumentIcon, HomeIcon } from '@heroicons/react/24/outline'

const links = [
  { to: '/', label: 'Dashboard', icon: HomeIcon },
  { to: '/documentos', label: 'Documentos', icon: DocumentIcon },
  { to: '/nova', label: 'Nova Solicitação', icon: DocumentIcon }
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-6 font-bold text-lg">Gestdoc</div>
      <nav className="space-y-2 px-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
