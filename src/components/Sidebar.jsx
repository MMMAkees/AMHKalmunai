import { NavLink } from 'react-router-dom';
import { FaHospital, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ menuItems, title = 'Dashboard' }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, session } = useAuth();

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} gradient-sidebar text-white flex flex-col transition-all duration-300 shrink-0 min-h-screen sticky top-0`}>
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <FaHospital className="text-teal-300" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm leading-tight">AMH System</p>
              <p className="text-xs text-blue-200 truncate">{title}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon className="text-lg shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        {!collapsed && session?.user && (
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-medium truncate">{session.user.name}</p>
            <p className="text-xs text-blue-300 truncate capitalize">{session.role}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-blue-200 hover:bg-red-500/20 hover:text-red-200 transition-all"
        >
          <FaSignOutAlt className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full mt-2 py-2 text-blue-300 hover:text-white transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </aside>
  );
}
