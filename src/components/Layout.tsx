import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Settings, 
  Menu, 
  Bell,
  User,
  Search,
  ChevronDown,
  LogOut
} from 'lucide-react'
import { cn } from '../lib/utils'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'داشبورد', exact: true },
    { path: '/menus', icon: Menu, label: 'منوها' },
    { path: '/settings', icon: Settings, label: 'تنظیمات' },
  ]

  const pageTitles: Record<string, string> = {
    '/': 'داشبورد',
    '/menus': 'منوها',
    '/settings': 'تنظیمات',
  }

  const currentPageTitle = pageTitles[location.pathname] || 'داشبورد'

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-l border-gray-200 flex flex-col shadow-sm z-50 flex-shrink-0">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between min-h-[72px] flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <LayoutDashboard className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">NovaCore</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0, 0, 0, 0.1) transparent' }}>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = item.exact 
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path)
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all relative group",
                      "hover:bg-gray-50 hover:text-gray-900",
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-600"
                    )}
                  >
                    {isActive && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
                    )}
                    <Icon 
                      className={cn(
                        "w-5 h-5 flex-shrink-0 transition-colors",
                        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                      )} 
                    />
                    <span className="flex-1 min-w-0 text-right">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500 text-center">
            نسخه 1.0.0
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-50 flex-shrink-0" dir="rtl">
          <div className="flex items-center justify-between px-6 lg:px-8 h-16">
            {/* Left Section - Page Title & Breadcrumb */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="h-1 w-1 rounded-full bg-blue-600"></div>
                <div>
                  <h1 className="text-lg lg:text-xl font-bold text-gray-900 tracking-tight">
                    {currentPageTitle}
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block mt-0.5">
                    مدیریت و کنترل سیستم
                  </p>
                </div>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-full pr-10 pl-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Right Section - Actions & User */}
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center border-2 border-gray-200 group-hover:border-blue-300 transition-colors">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden lg:flex flex-col items-end gap-0.5">
                    <span className="text-sm font-semibold text-gray-900 leading-tight">
                      کاربر سیستم
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[120px]">
                      admin@novacore.com
                    </span>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 transition-transform hidden lg:block",
                    showUserMenu && "rotate-180"
                  )} />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          کاربر سیستم
                        </p>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          admin@novacore.com
                        </p>
                      </div>
                      <div className="py-1">
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <User className="w-4 h-4" />
                          <span>پروفایل کاربری</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>تنظیمات</span>
                        </button>
                      </div>
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={() => setShowUserMenu(false)}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>خروج از سیستم</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-8">
          <div className="h-full w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
